# Diagnostic Playbook

## Multi-Component Failures

For each relevant boundary, inspect a redacted representation of:

1. Input received.
2. Configuration and identity in effect.
3. State before execution.
4. Output or error produced.
5. State after execution.

Start where the symptom appears and trace backward until the data or state first becomes wrong. Add the least intrusive observation needed to distinguish components.

## Environment Differences

Compare only relevant dimensions:

- Runtime and dependency versions.
- Environment variables by name and presence, never secret value.
- Feature flags and configuration sources.
- Database schema and migration status.
- Filesystem, permissions, locale, timezone, and clock assumptions.
- Network endpoints, credentials scope, sandbox versus production.
- Build flags, caches, generated artifacts, and deployment revision.

Do not fix an environment mismatch by silently making production match a developer machine. Identify the intended source of truth first.

## Intermittent And Timing Failures

- Replace arbitrary sleeps with observation of the actual condition when possible.
- Capture frequency, concurrency, event ordering, and resource pressure.
- Check shared mutable state, missing awaits, retry overlap, idempotency, and clock boundaries.
- Use repeated focused runs to estimate whether a change truly affects the failure rate.
- Preserve a bounded timeout and a useful failure message even after condition-based waiting is added.

## Data Failures

- Find the first invalid record or transformation.
- Preserve a minimized, sanitized failing fixture.
- Check schema version, nullability, encoding, precision, ordering, and identity mapping.
- Verify whether corrupt data must be repaired, quarantined, or tolerated.
- Treat migrations and repair scripts as data-sensitive changes with backup and rollback requirements.

## Performance Regressions

- Define the measured regression and representative workload.
- Profile before optimizing.
- Separate compute, I/O, network, lock contention, allocation, and query behavior.
- Compare against a known baseline using the same environment and inputs.
- Verify that the optimization preserves behavior and improves the target metric materially.

## External Dependency Failures

- Distinguish caller defect, contract mismatch, authentication, rate limit, timeout, provider outage, and bad upstream data.
- Capture provider request IDs and sanitized response metadata.
- Retry only documented transient failures with bounded backoff and idempotency.
- Preserve an actionable error when the dependency remains unavailable.

## Evidence Ledger

```text
Observed:
- [direct evidence]

Inferred:
- [interpretation and why]

Unknown:
- [missing information]

Next discriminating check:
- [smallest check that separates hypotheses]
```
