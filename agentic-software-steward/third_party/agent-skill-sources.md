# Imported Agent-Skill Sources

Skills in this suite adapted from external, MIT-licensed skill repositories.
Each adapted skill also carries its own `NOTICE.md`.

## mattpocock/skills

- Source: https://github.com/mattpocock/skills
- Pinned ref: `6654f6b60cd9d5be8b54c6fafe44346dabeb3b76` (v1.2.3)
- License: MIT, Copyright (c) 2026 Matt Pocock (`licenses/mattpocock-skills-MIT.txt`)
- Adapted here as: `writing-for-agents` (with `SKILL-MECHANICS.md`), `grilling`, `handoff`,
  `domain-modeling` (with `ADR-FORMAT.md` and `CONTEXT-FORMAT.md`), and `diagnosing-bugs`
  (with `scripts/hitl-loop.template.sh`), which replaces the suite's former `root-cause-debugging`.
- `grill-me` is this suite's own user-invoked alias for `grilling`, following the upstream
  alias pattern but containing no upstream text.

## cursor/plugins (pstack)

- Source: https://github.com/cursor/plugins/tree/main/pstack
- Pinned ref: `68836ddaf5697224520f1847d90cdb90ca8babaa` (pstack v0.14.5)
- License: MIT, Copyright (c) 2026 Lauren Tan (`licenses/pstack-MIT.txt`)
- Planned adaptations are recorded in `docs/reviews/2026-08-30-import-and-replacement-plan.md`.
  No pstack-derived skill has landed yet.
