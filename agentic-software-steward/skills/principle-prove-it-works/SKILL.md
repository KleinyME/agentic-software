---
name: principle-prove-it-works
description: Verify against the real artifact, never a proxy or a self-report.
disable-model-invocation: true
---

# Prove It Works

Check the real thing directly before declaring anything done. Make claims no broader than the evidence.

**Why:** Unverified work has unknown correctness, and indirect verification always feels cheaper than direct observation. An agent reports what it intended, not always what happened, so a summary is a lead rather than proof. Acting on a wrong inference costs more than the check would have.

**Pattern:**

- Run the feature, read the actual value, inspect the diff. Not "it compiles", not a cached representation, not a passing unrelated test.
- Where the project has a generated verify skill, running it is the proof.
- For delegated work, inspect the artifact rather than the delegate's report, and verify the integrated result after a merge, not only each branch.
- Prefer a deterministic script a reviewer can re-run over a one-time eyeball.
- When verification fails, suspect the observation method before suspecting the system.
- If safe verification is unavailable, report the work as unverified or blocked instead of narrowing the truth.

The full gate, with its evidence-to-risk ladder and completion statuses, is the `evidence-before-completion` skill.
