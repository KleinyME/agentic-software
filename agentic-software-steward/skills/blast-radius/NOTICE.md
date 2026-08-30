# Attribution

This skill adapts:

- `blast-radius` from the pstack plugin by Lauren Tan
  - Source: https://github.com/cursor/plugins/tree/main/pstack
  - Pinned ref: `68836ddaf5697224520f1847d90cdb90ca8babaa` (pstack v0.14.5)
  - Upstream license: MIT
  - Files used as reference: `skills/blast-radius/SKILL.md`

This adaptation keeps upstream's five-rung evidence ladder, its self-skepticism about convincing-sounding writeups, and its central move of finding the one fact a change is safe because of and proving it by running code. It replaces upstream's companion routing (`how`, `why`, `unslop`) and its multi-model `arena` step with skills this suite actually has: `intent-aligned-review`, `diagnosing-bugs`, `ai-writing-audit`, and a harness-neutral instruction to dispatch an independent reviewer in a fresh read-only context on a different model where the host offers a choice. Framework-specific examples are generalized, and the run's decision trail is routed to `show-me-your-work` rather than narrated inline.
