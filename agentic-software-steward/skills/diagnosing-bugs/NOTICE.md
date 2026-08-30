# Attribution

This skill adapts:

- `diagnosing-bugs` by Matt Pocock
  - Source: https://github.com/mattpocock/skills
  - Pinned ref: `6654f6b60cd9d5be8b54c6fafe44346dabeb3b76` (v1.2.3)
  - Upstream license: MIT
  - Files used as reference: `skills/engineering/diagnosing-bugs/SKILL.md, scripts/hitl-loop.template.sh`

Replaces this suite's `root-cause-debugging` skill and carries three of its rules across: routing live incidents, private data, credentials, and destructive diagnostics through `live-environment-steward` and `security-data-safety` first; a circuit breaker after three rejected fix attempts; and the rule that a test, timeout, retry, swallowed error, or default value changes only when evidence shows it is the correct root-level treatment. `CONTEXT.md` and ADR references now point at the `domain-modeling` skill.
