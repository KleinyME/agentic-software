# Security scan: NVIDIA SkillSpector against this suite

Date: 2026-09-03
Tool: [NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector) v2.11.0
Scope: all 45 skills (`agentic-software-steward/skills`, `hermes-runtime-skills`)
Re-run with: `scripts/security-scan.sh [--llm]`

## Executive summary

**No skill in this suite is malicious, and none needs to be removed.** Of 44 raw
findings, every finding produced by the pattern matcher is a false positive that
was verified line by line against source. Three findings produced by the semantic
(LLM) stage are real and worth acting on, plus two hardening gaps.

The headline verdicts the tool printed unfiltered — `DO_NOT_INSTALL` on
`software-steward` (100/CRITICAL), `project-steward` (99/CRITICAL) and
`ai-writing-audit` (74/HIGH) — are all wrong, and wrong for a reason worth
understanding before anyone runs this tool again.

| | count | verdict |
|---|---|---|
| Pattern-matcher findings (static) | 24 | all false positives, individually verified |
| Semantic findings (LLM only) | 9 | 3 actionable, 6 scope/quality observations |
| Hardening gaps | 2 | both real, both cheap to fix |

## The failure mode you have to know about

**SkillSpector reports a degraded scan as a higher risk score, not as an error.**

When its LLM stage fails, two things happen at once: findings the meta-analyzer
would have dismissed stay unfiltered, and references it never got to read turn
into fresh `analysis-evasion` findings. A broken scan does not look broken. It
looks like a dangerous skill.

Measured on this suite:

| Skill | complete scan | one failed LLM call |
|---|---|---|
| `project-steward` | 11 / LOW | **99 / CRITICAL** |
| `software-steward` | 86 / CRITICAL* | **100 / CRITICAL** |
| `brand-copy-steward` | 3 / LOW | **46 / MEDIUM** |

\* still false positives; see below.

In the first full pass, the six worst-scoring skills were exactly the six whose
LLM stage had not completed. The correlation was perfect. `scripts/security-scan.sh`
therefore gates on `llm_calls_succeeded == llm_calls_attempted` and refuses to
report a score from a partial scan.

Two settings decide whether the LLM stage completes at all:

- **Pin the model.** With `SKILLSPECTOR_PROVIDER=claude_cli` and no
  `SKILLSPECTOR_MODEL`, the CLI reports an empty model label. Weaker models fail
  SkillSpector's structured-response contract: 8 of 10 skills failed on
  `claude-sonnet-5`, 0 of 10 on `claude-opus-5`.
- **Scan one skill at a time.** SkillSpector fans out to
  `DEFAULT_MAX_LLM_CONCURRENCY = 10` internally, so scanning skills in parallel
  multiplies that. Failures rise sharply with skill size regardless
  (`SKILLSPECTOR_MAX_LLM_CONCURRENCY=1` did not rescue the 93 KB
  `software-steward`).

Coverage note: 39 of 45 skills were adjudicated by the LLM stage. The remaining
six are the largest in the suite (93–126 KB) and could not be adjudicated
here; their findings were reviewed by hand instead. That the scanner's semantic
stage cannot digest them is an independent echo of the size problem
`docs/reviews/2026-08-30-professional-skills-repos-review.md` already raised.

## Why every pattern-matcher finding is a false positive

The matcher keys on a phrase and ignores the clause that governs it. This suite
is written almost entirely in prohibitions, so it triggers constantly.

| Flagged as | Actual line |
|---|---|
| Rogue Agent / Self-Modification | "**Do not** let either role self-modify prompts, policies, permissions, skills, routing, or production behavior" |
| Rogue Agent / Self-Modification | scenario heading: "Toby Observes Friction **Without** Self-Modifying" |
| Anti-Refusal | scenario heading: "Capability Packet **Cannot** Drop Safety" |
| Memory Poisoning | "Append-only… **Never** edit or delete history" |
| Memory Poisoning | "a **clear state**ment of whether code was changed" (substring across two words) |
| System Prompt Leakage | the "Public Output Rule" section: "**Never** place audit tags, warnings, rationales, framework names, verification language, or private working notes inside customer-facing copy" — an anti-leakage control |
| Excessive Agency | "**Do not** automatically remove strong supported claims…" |
| Excessive Agency | `project-steward`'s Initiative Bands: judgment "without asking for approval" **only** "when work is private, reversible, and confined to the authorized workspace", with Yellow and Red bands above it |
| Excessive Agency | anti-pattern list item: "**Treating** large HTML as unreadable without checking byte ceilings" — the mistake being warned against |

Two systemic ones deserve their own note:

- **Agent Snooping / Skill Enumeration fires on 7 skills, every one through a
  `NOTICE.md` attribution block** citing the upstream file a skill was adapted
  from (pstack v0.14.5, MIT, pinned ref). Honest third-party attribution is what
  triggers it. Suppressed by a rule scoped to `NOTICE.md` only — the same rule id
  in a SKILL.md or a script would be a real finding and still surfaces.
- **`analysis-evasion` never indicated withheld content.** All five hits point at
  local files that exist and are readable (`references/checklist.md` 10,847 B;
  `scripts/collect-client-site-images.mjs` 11,000 B). It reports the scanner's own
  per-component budget, and it multiplies when the LLM stage degrades.

All of the above are suppressed in `.skillspector-baseline.yaml` using glob rules
with written reasons, not opaque fingerprints — a fingerprint dies on the next
edit to the line, and a dead fingerprint silently un-suppresses a known false
positive.

## What is actually worth fixing

The semantic stage earned its keep here: these three are real and none were
visible to static analysis.

**1. `handoff` writes a full conversation summary to the OS temp directory.**
`agentic-software-steward/skills/handoff/SKILL.md:7` — "Save to the temporary
directory of the user's OS - not the current workspace." On a shared machine
`/tmp` is typically world-readable, and the file sits outside version control.
The skill does instruct redaction of keys, passwords and PII, so this is a
considered design rather than negligence — but the destination is worth
revisiting. Writing under the user's own runtime dir would preserve the intent
(keep it out of the workspace) without the shared-readability exposure.

**2. `site-scorecard` instructs an unattended dependency install.**
`references/ad-hoc-prospect-blueprint.md:74` — "If the PDF parser/rendering
dependency is missing, install or use an available equivalent and continue
verification." No named package, no pin, no confirmation step. Name the
dependency and have the agent stop and ask when it is missing.

**3. `design-system-steward` calls an unpinned `npx`.**
`SKILL.md:58` — `npx @google/design.md lint DESIGN.md`. This is the only unpinned
`npx` in the repo and a genuine rug-pull vector. Karbon-AI already pins the same
tool at `^0.4.0` as a devDependency, so the skill is the outlier; registry latest
is 0.4.0. Fix: `npx @google/design.md@0.4.0 lint DESIGN.md`.

### Hardening

**4. No skill declares `allowed-tools` (0 of 45).** Flagged on `visual-direction`,
the one skill shipping a network-touching script. Declaring a tool scope in
frontmatter makes intent checkable and is the single highest-leverage change for
future scans of this suite.

**5. Scope/quality observations** worth a look but not security issues:
`brand-copy-steward` claims a trigger surface ("every user-facing word", applying
"even when the user didn't ask") broad enough to fire on almost any writing task —
which is the always-loaded-surface concern from the 2026-08-30 review, arrived at
independently. `lean-product-architect:104` prefers "deleting stale surfaces over
documenting around them"; reversible under git, but worth an explicit guard.
`no-theater-software` and `show-me-your-work` have trigger conditions abstract
enough to over-fire.

## Reviewed and found clean

`visual-direction/scripts/collect-client-site-images.mjs` is the only skill script
that touches the network. Read in full: a bounded same-origin crawler with
`AbortController` timeouts, an honest user-agent, and an origin check before each
fetch. No `eval`, no credential access, no exfiltration path.

The suite ships no executable with a dangerous pattern: 6 scripts total, all
`.mjs`/`.sh`, none with `exec`/`eval` on untrusted input. No YARA signature fired.
No unpinned dependency other than item 3.

## Running it

```bash
uv tool install git+https://github.com/NVIDIA/skillspector.git

scripts/security-scan.sh          # static only — fast, no provider needed
scripts/security-scan.sh --llm    # + semantic stage (slow; needs a pinned model)
```

The script scans each skill separately, applies the baseline, and exits non-zero
on a HIGH/CRITICAL finding **or** on any degraded scan. With the baseline applied,
the suite currently reports two LOW findings — items 3 and 4 above, deliberately
left unsuppressed so they stay visible until fixed.
