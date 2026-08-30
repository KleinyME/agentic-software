# Attribution

This skill adapts:

- `show-me-your-work` from the pstack plugin by Lauren Tan
  - Source: https://github.com/cursor/plugins/tree/main/pstack
  - Pinned ref: `68836ddaf5697224520f1847d90cdb90ca8babaa` (pstack v0.14.5)
  - Upstream license: MIT
  - Files used as reference: `skills/show-me-your-work/SKILL.md`, `skills/show-me-your-work/scripts/log.sh`, `skills/show-me-your-work/references/decision-log-template.tsv`

This adaptation keeps upstream's mechanism intact: one append-only TSV with `ts/phase/decision/why/evidence/result`, evidence as a pointer rather than a paste, local by default and committed only for ambitious work, and the end-of-run audit of the log against what actually happened ("Fix the log, not the story"). `scripts/log.sh` is copied with its spreadsheet formula-injection guard for cells beginning `=`, `+`, `-`, or `@`. The changes are host-neutrality and suite routing: upstream's Cursor transcript paths become the host's own session record with the same prohibition on reading unrelated sessions, the mandatory cross-model subagent becomes an independent fresh-context reviewer producing the same "Attention" section, the `unslop` and `encode-lessons-in-structure` pointers become `ai-writing-audit` and one inline sentence, and the skill is made model-invoked so `site-scorecard` and the Hermes `client-website-delivery` skill can route their run trail here instead of maintaining bespoke status prose.
