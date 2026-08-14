---
name: evidence-before-completion
description: Select and run fresh, proportionate verification before claiming software work is complete, fixed, passing, production-ready, or safe to merge, deploy, commit, or hand off. Use after implementation, bug fixes, refactors, migrations, UI work, agent or subagent contributions, documentation/config changes, and before final status claims. Match tests to user intent and risk, inspect actual artifacts and diffs, distinguish verified from unverified claims, and report exact evidence and remaining gaps.
---

# Evidence Before Completion

Make claims no broader than the evidence. Completion is a statement about observable outcomes, not effort, confidence, or agent reports.

## Build A Claim-Evidence Map

Before final verification, list the claims the handoff must support:

- Intent: the requested user outcome is present.
- Behavior: the primary workflow and important failure paths work.
- Engineering: tests, build, types, lint, or static checks pass as relevant.
- Safety: permissions, data, live effects, migration, and rollback are handled.
- Truth: UI, dashboards, integrations, and status reflect real sources.
- Memory: durable intent, architecture, and operational facts are current.

Read [references/test-strategy.md](references/test-strategy.md) to select proportionate checks. Read [references/completion-contract.md](references/completion-contract.md) for the evidence ledger and handoff format.

## Run Fresh Verification

For each material claim:

1. Name the artifact, command, inspection, or user journey that could prove it.
2. Run or inspect it after the final relevant change.
3. Read the complete result, exit status, failures, skipped coverage, and environment.
4. Compare the evidence directly with the claim.
5. Narrow the claim or report the gap when evidence is incomplete.

Use the repository's documented commands when trustworthy. Inspect the diff and working tree in addition to running tests. A test suite does not reveal unexpected files, debug residue, fake data, or scope drift.

## Verify Agent Work Independently

Treat producer, tool, subagent, CI summary, or generated report statements as leads. Inspect the actual artifact and run the relevant check yourself or through an authorized independent verifier.

For parallel work, verify the integrated result after merge, not only each branch in isolation.

## Match Evidence To Risk

- Low: focused check, parse/lint, diff inspection, or direct artifact inspection.
- Medium: focused tests plus build/type/lint or an end-to-end slice as relevant.
- High: success and failure paths, permission/data boundaries, preview or sandbox, rollback/recovery evidence.
- Critical: explicit approval, safe environment, backups where relevant, independent review, and evidence of rollback or stop behavior.

Do not run dangerous production verification merely to strengthen a completion claim. If safe verification is unavailable, report the work as unverified or blocked.

## Regression Proof

For a bug fix, prove the original symptom rather than only running unrelated tests. When practical:

1. Capture a regression test or deterministic reproduction.
2. Confirm it fails against the broken behavior or otherwise demonstrate that it detects the defect.
3. Confirm it passes with the fix.
4. Run the relevant surrounding suite.

Do not weaken assertions or change expected output merely to make a failure disappear.

## Completion Decision

Use one status:

- `verified_complete`: all material claims have current evidence.
- `verified_with_limits`: the requested outcome is verified but named non-critical checks were unavailable or out of scope.
- `not_complete`: behavior, safety, or requirements remain unmet.
- `blocked_unverified`: verification cannot be performed safely or without missing access/input.

Report the exact commands and inspections used. State remaining fake/demo/stub behavior and whether project memory changed.

## Hard Rules

- Do not say complete, fixed, passing, ready, safe, or production-ready without fresh supporting evidence.
- Do not substitute confidence, code inspection, or an agent report for execution evidence when execution is available.
- Do not claim the entire suite passes after running only a subset.
- Do not claim a requirement is met merely because tests pass.
- Do not conceal skipped tests, warnings, environment differences, or unavailable checks.
- Do not perform destructive or live verification without authority.
