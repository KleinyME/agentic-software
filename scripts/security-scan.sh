#!/usr/bin/env bash
# Scan every skill in the suite with NVIDIA SkillSpector.
#
#   https://github.com/NVIDIA/SkillSpector
#   uv tool install git+https://github.com/NVIDIA/skillspector.git
#
# Usage:
#   scripts/security-scan.sh              # static analysis only (fast, no LLM)
#   scripts/security-scan.sh --llm        # + semantic analysis (slow, needs a provider)
#
# WHY THIS WRAPPER EXISTS
#
# SkillSpector reports a degraded scan as a HIGHER RISK SCORE, not as an error.
# When its LLM stage fails, findings that the meta-analyzer would have dismissed
# stay unfiltered, and references it never read become fresh "analysis-evasion"
# findings. A partial scan therefore looks like a dangerous skill.
#
# Measured on this suite (2026-09-03): project-steward scored 11 with a complete
# scan and 99 with one failed LLM call out of four. software-steward scored 86
# complete and 100 degraded. Both are false-positive noise either way.
#
# So this script gates on llm_calls_succeeded == llm_calls_attempted and fails
# loudly on a partial scan rather than letting anyone read its score.

set -uo pipefail
cd "$(dirname "$0")/.."

BASELINE=".skillspector-baseline.yaml"
OUTDIR="${SKILLSPECTOR_OUTDIR:-logs/skillspector}"
USE_LLM=0
[ "${1:-}" = "--llm" ] && USE_LLM=1

command -v skillspector >/dev/null 2>&1 || {
  echo "skillspector not found. Install it with:" >&2
  echo "  uv tool install git+https://github.com/NVIDIA/skillspector.git" >&2
  exit 2
}

mkdir -p "$OUTDIR"

if [ "$USE_LLM" = "1" ]; then
  # claude_cli needs an explicitly pinned model: with none pinned the CLI reports
  # an empty model label, and weaker models fail SkillSpector's structured-response
  # contract (measured: 8 of 10 skills failed on sonnet, 0 of 10 on opus).
  export SKILLSPECTOR_PROVIDER="${SKILLSPECTOR_PROVIDER:-claude_cli}"
  export SKILLSPECTOR_MODEL="${SKILLSPECTOR_MODEL:-claude-opus-5}"
  LLM_FLAG=""
else
  LLM_FLAG="--no-llm"
fi

skills=$(find agentic-software-steward/skills hermes-runtime-skills \
           -name SKILL.md -not -path './.git/*' 2>/dev/null | sed 's|/SKILL.md$||' | sort)

fail=0; degraded=0; scanned=0
while read -r d; do
  [ -n "$d" ] || continue
  n=$(echo "$d" | sed 's|/|__|g')
  skillspector scan "$d" $LLM_FLAG --baseline "$BASELINE" \
      --format json -o "$OUTDIR/$n.json" >"$OUTDIR/$n.log" 2>&1
  scanned=$((scanned+1))
  read -r status score sev <<<"$(python3 - "$OUTDIR/$n.json" <<'PY'
import json,sys
try: d=json.load(open(sys.argv[1]))
except Exception: print("UNREADABLE - -"); raise SystemExit
m=d.get("metadata",{}); r=d.get("risk_assessment",{})
s,a=m.get("llm_calls_succeeded"),m.get("llm_calls_attempted")
ok = (not m.get("llm_requested")) or (s is not None and s==a)
print(("OK" if ok else "DEGRADED"), r.get("score"), r.get("severity"))
PY
)"
  case "$status" in
    DEGRADED) echo "DEGRADED  $(basename "$d") (score $score unreliable - rescan)"; degraded=$((degraded+1));;
    UNREADABLE) echo "ERROR     $(basename "$d")"; fail=$((fail+1));;
    *) if [ "${score:-0}" -gt 0 ] 2>/dev/null; then
         echo "$sev  $(basename "$d")  score=$score"
         [ "$sev" = "HIGH" ] || [ "$sev" = "CRITICAL" ] && fail=$((fail+1))
       fi;;
  esac
done <<<"$skills"

echo
echo "scanned=$scanned degraded=$degraded failing=$fail  reports in $OUTDIR/"
[ "$degraded" -gt 0 ] && { echo "Re-run the degraded skills before trusting any score."; exit 1; }
[ "$fail" -gt 0 ] && exit 1
exit 0
