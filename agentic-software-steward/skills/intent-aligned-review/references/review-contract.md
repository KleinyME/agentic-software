# Review Contract

## Review Inputs

```yaml
intent: "<user outcome>"
requirements: []
prohibited_outcomes: []
non_goals: []
review_range: "<diff, commits, paths, or artifact>"
risk: "low | medium | high | critical"
supported_environments: []
verification_available: []
```

## Finding Format

```text
[P0 | P1 | P2 | P3] Short title
Evidence: path:line, command output, or requirement
Impact: concrete user, data, security, compatibility, or operational consequence
Recommendation: smallest appropriate correction
```

- `P0`: active or imminent catastrophic harm; release must stop.
- `P1`: serious correctness, security, data, or requirement failure; fix before merge.
- `P2`: material defect or maintainability risk; normally fix before release.
- `P3`: minor improvement; non-blocking unless project policy says otherwise.

Do not use severity to express personal taste.

## Pass One Checklist

- Intended actor and outcome are clear.
- Primary workflow works end to end.
- Acceptance criteria are implemented.
- Non-goals remain out of scope.
- UI and status claims reflect real behavior.
- Permissions and human authority match intent.
- External side effects are authorized.
- Compatibility and removed behavior are intentional.
- Relevant automation opportunities did not silently expand scope.

## Pass Two Checklist

- Logic and edge cases are correct.
- Failure modes are explicit and recoverable where needed.
- Sensitive data and permissions are protected.
- Writes are idempotent or safely repeatable where relevant.
- Tests cover meaningful behavior and regression risk.
- Module ownership and dependencies remain clear.
- No dead, duplicate, debug, fake, or stale behavior remains unintentionally.
- Release, migration, rollback, and observability needs are addressed.

## Disposition

```yaml
intent_pass: "pass | fail | needs_intent"
quality_pass: "pass | fail"
blocking_findings: []
verification_gaps: []
disposition: "ready | ready_after_fixes | not_ready"
```

`ready` requires both passes and fresh completion evidence.
