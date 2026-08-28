# Situation-Aware Test Strategy

Choose the smallest evidence set that can disprove the important claims.

| Change | Primary evidence | Additional evidence when risk rises |
|---|---|---|
| Documentation | Link/path check, parser/lint, rendered inspection | Consumer or generated-doc check |
| Configuration | Parse/schema validation, dry run | Preview environment and rollback |
| Pure logic | Focused unit/property tests | Integration contract |
| Bug fix | Original reproduction and regression test | Relevant surrounding suite |
| API/schema | Contract tests and representative requests | Compatibility and consumer tests |
| Database migration | Dry run on representative copy | Backup, rollback/forward repair, invariants |
| External integration | Adapter/contract test with sandbox | Idempotency, timeout, retry, failure path |
| UI behavior | Browser user journey and real state inspection | Accessibility, responsive, permission/error states |
| Auth/permissions | Allow and deny tests at server boundary | Role matrix, session expiry, audit evidence |
| Background workflow | State transition and retry tests | Resume, duplicate event, cancellation, observability |
| Performance | Representative benchmark against baseline | Profiling and resource limits |

## Test Selection Rules

- Tie each important test to a user outcome, invariant, failure mode, or compatibility promise.
- Prefer fast focused checks during iteration and the relevant broader checks before handoff.
- Use deterministic fixtures and sandbox systems for external effects.
- Test negative and permission paths when harm comes from an action that should not occur.
- Verify real wiring for dashboards and integrations; snapshots alone are insufficient.
- Do not add tests that merely restate implementation details without protecting behavior.

## When Test-First Is Most Valuable

Prefer a failing test or reproduction before code when:

- Fixing a regression.
- Defining pure domain behavior.
- Changing an API or data contract.
- Repairing a boundary condition.
- The test can cheaply demonstrate the intended difference.

Do not force a ceremonial red-green cycle when the artifact is exploratory visual design, a one-time documentation correction, or a dangerous live behavior that must be proven in a safer surrogate environment. Still define and gather appropriate evidence.
