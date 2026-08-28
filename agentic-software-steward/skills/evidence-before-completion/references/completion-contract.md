# Completion Evidence Contract

## Evidence Ledger

```yaml
status: "verified_complete | verified_with_limits | not_complete | blocked_unverified"
claims:
  - claim: "<observable statement>"
    evidence:
      type: "command | inspection | user_journey | source_check"
      value: "<command, path, URL, or procedure>"
      result: "<exit status and concise observed result>"
      observed_at: "<current task timestamp>"
      environment: "<local, test, preview, production-read-only>"
    limits: []
unverified_claims: []
fake_demo_stub_remaining: []
memory_updated: []
risks: []
```

## Claim Examples

| Claim | Sufficient evidence | Insufficient evidence |
|---|---|---|
| Tests pass | Current command reports zero relevant failures | Previous run or agent statement |
| Build succeeds | Current build exits successfully | Lint or type check only |
| Bug fixed | Original symptom no longer reproduces and regression check passes | Code changed |
| UI works | Real browser journey reaches expected persisted result | Component renders |
| Integration works | Sandbox/contract result with real adapter behavior | Mock response only |
| Requirements met | Intent/acceptance checklist plus behavioral evidence | Green test suite alone |
| Safe to release | Required checks, review, environment, and rollback evidence | "Low risk" judgment alone |

## Final Handoff

```text
Status: [precise completion status]
Verified outcome: [what now works]
Evidence: [commands/inspections and results]
Not verified: [anything missing]
Remaining fake/demo/stub behavior: [items or none found]
Memory/docs: [updated files or no durable change]
Risks/next action: [concrete items]
```
