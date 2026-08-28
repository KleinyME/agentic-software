---
name: root-cause-debugging
description: Diagnose bugs, test failures, build failures, integration problems, performance regressions, flaky behavior, unexpected output, and production incidents before implementing fixes. Use whenever software is broken, unreliable, slow, or behaving differently across environments, especially after failed fix attempts or when a quick workaround seems tempting. Reproduce the symptom, trace evidence across boundaries, test one falsifiable hypothesis at a time, fix the source, and prove the original failure is resolved.
---

# Root-Cause Debugging

Find the cause before changing behavior. A plausible explanation is not evidence, and a disappearing symptom is not yet a verified fix.

## Establish The Failure

1. State the observed symptom, expected behavior, impact, and first known occurrence.
2. Capture exact errors, exit codes, failing inputs, environment, and reproduction steps.
3. Reproduce consistently when safe. If reproduction is unsafe or intermittent, improve observation instead of guessing.
4. Check relevant recent changes, configuration, dependencies, data shape, and environment differences.
5. Separate observations, inferences, and unknowns.

For live incidents, private data, credentials, or destructive diagnostics, use `live-environment-steward` and `security-data-safety` before intrusive investigation.

## Localize The Cause

Read [references/diagnostic-playbook.md](references/diagnostic-playbook.md) for multi-component, intermittent, environment, data, and performance failures.

- Trace bad state backward to where it first becomes wrong.
- Inspect inputs and outputs at component boundaries.
- Compare with the nearest working example in the same repository.
- List meaningful differences without dismissing small ones prematurely.
- Verify configuration and state propagation rather than assuming it.
- Prefer temporary, redacted diagnostic evidence over broad code changes.

Do not expose secrets or raw private data in logs. Remove temporary instrumentation after the investigation unless it is useful, safe observability.

## Run A Hypothesis Loop

Keep one active hypothesis:

```text
Hypothesis: [specific cause]
Evidence supporting it: [observed facts]
Prediction: [what a focused check will show]
Test: [smallest safe experiment]
Result: confirmed | rejected | inconclusive
```

Change one variable at a time. If rejected, restore the test change when appropriate, record what was learned, and form a new hypothesis. Do not stack speculative fixes.

After three rejected fix attempts or when each attempt reveals new coupling elsewhere, stop patching symptoms. Reassess the reproduction, system boundary, ownership, and architecture with the user before making a larger change.

## Implement The Smallest Root Fix

1. Create the smallest automated regression test or deterministic reproduction that fails for the original reason when practical.
2. Make one focused change that addresses the confirmed cause.
3. Re-run the original reproduction.
4. Run focused regression checks and the smallest relevant broader suite.
5. Inspect the diff for accidental fixes, debugging residue, weakened assertions, or unrelated refactors.
6. Use `evidence-before-completion` before claiming the issue is fixed.

Do not weaken a test, increase a timeout, add a retry, swallow an error, or add a null/default value unless evidence shows that behavior is the correct root-level treatment.

## Investigation Output

Report:

- Symptom and reproduction status.
- Confirmed observations and remaining unknowns.
- Hypotheses tested and their outcomes.
- Root cause, or the narrowest proven failing boundary.
- Fix and why it addresses the source.
- Regression evidence and broader checks.
- Residual risk, monitoring, or next diagnostic step.

If the cause remains unproven, say so. A precise unresolved diagnosis is better than a confident guess.

## Hard Rules

- Do not propose a fix before gathering enough evidence to name a testable cause.
- Do not batch multiple speculative fixes.
- Do not confuse correlation with cause.
- Do not treat an agent report, changed diff, or passing unrelated test as proof.
- Do not hide intermittent, environment-specific, or unresolved behavior.
- Do not turn a narrow bug fix into an opportunistic refactor.
