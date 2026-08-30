# Attribution

This skill adapts:

- `maintain-verification-skill` from the pstack plugin by Lauren Tan
  - Source: https://github.com/cursor/plugins/tree/main/pstack
  - Pinned ref: `68836ddaf5697224520f1847d90cdb90ca8babaa` (pstack v0.14.5)
  - Upstream license: MIT
  - Files used as reference: `skills/maintain-verification-skill/SKILL.md`

This adaptation keeps upstream's loop as written: the three exact outcomes `clean`, `changed`, and `blocked`; one read-only source reader per feature file running in parallel; a live pass required even when source looks clean; the three run-long invariants (doctor before drive, evidence survives cleanup, no residue outlives its drive); and the strict edit scope that forbids touching product code and requires reporting a product regression instead of papering over it in the docs. The changes are host-neutrality: Cursor task-tool parameters become plain instructions to dispatch independent read-only readers, `.cursor/skills/verify-*/` becomes the project's own `skills/verify-*/`, slash-command references become skill names, and upstream's uncommitted scratch run notes route through this suite's `show-me-your-work` instead.
