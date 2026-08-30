---
name: intent-aligned-review
description: Review changes in two passes: user intent and requirements first, then correctness, security, tests, and release risk. Use before merging meaningful work. Not for diagnosing a failure; use diagnosing-bugs.
---

# Intent-Aligned Review

Review whether the right thing was built before reviewing how elegantly it was built. Passing tests cannot rescue a change that solves the wrong problem.

## Establish The Review Contract

Read [references/review-contract.md](references/review-contract.md) for the finding format and coverage checklist.

Identify:

- The user's intent and observable outcome.
- Requirements, acceptance criteria, prohibited outcomes, and explicit non-goals.
- Review range: files, diff, commits, artifact, or workflow.
- Risk level and affected users, data, environments, integrations, and compatibility promises.
- Evidence available and checks not yet run.

If intent is missing and different interpretations would change whether the work is correct, ask the user before approving or requesting major changes.

## Pass One: Intent And Requirement Compliance

Check:

- Does the change enable the promised user outcome end to end?
- Is required behavior missing, only simulated, or wired to fake data?
- Does it add behavior or scope the user did not authorize?
- Are permissions, approval boundaries, sources of truth, and external effects consistent with intent?
- Were relevant existing behaviors accidentally removed or changed?
- Do tests assert the requirement, not merely the implementation shape?
- Are unresolved assumptions presented honestly?

Classify Pass One as `pass`, `fail`, or `needs_intent`. Do not approve the change when Pass One is `fail` or `needs_intent`, even if engineering quality is high.

## Pass Two: Engineering Quality

Review proportionally for:

- Correctness and edge cases.
- Security, privacy, permissions, secrets, and unsafe external writes.
- Data integrity, migrations, idempotency, concurrency, and failure recovery.
- API, schema, environment, and backward-compatibility effects.
- Test relevance and verification gaps.
- Module boundaries, duplication, clarity, dependency cost, and dead code.
- Accessibility and real UI states when user-facing.
- Observability, rollback, and operational impact when live.

Use repository evidence. Do not invent defects from style preference, demand speculative abstractions, or treat optional polish as blocking.

## Review Agent And External Feedback

When another agent or reviewer supplies findings:

1. Read all feedback.
2. Restate the technical requirement internally.
3. Verify it against the current code, requirements, and supported environments.
4. Accept, refine, reject, or ask about each item based on evidence.
5. Implement accepted items one at a time and verify each.

Do not perform agreement. A reviewer can be wrong, stale, or unaware of product intent. Push back with code, tests, requirements, or compatibility evidence.

## Independent Review Procedure

For material or high-risk work, do not rely on the producer's own read of the work. Run this procedure.

1. **State the intent.** Write the intent as one explicit paragraph before dispatching anything: the actor, the observable outcome, and the requirement it serves. Reviewers challenge whether the work achieves the intent, not whether the intent is right. If the intent is unclear enough that different readings change what "correct" means, ask the user first.
2. **Dispatch.** Fill [references/reviewer-prompt.md](references/reviewer-prompt.md) with the stated intent, the bounded diff or artifact, and the rubric drawn from [references/review-contract.md](references/review-contract.md). Send the identical filled template to every reviewer. Each reviewer runs in an independent fresh context, on a different model from the producer's where the host offers a choice, with no access to the producer's reasoning history. Independence and model diversity are the adversarial signal; do not assign personas.
3. **Synthesize.** Identify consensus first: a finding raised independently by two or more reviewers is the highest-signal item in the set. Deduplicate findings that describe the same defect in different words, recording which reviewers raised each. Keep lone findings, weighted lower, except for correctness, security, and Pass One gaps. Note explicit disagreements between reviewers; the disagreement itself is evidence.
4. **Judge.** Read [references/lead-judgment.md](references/lead-judgment.md). You are the lead with full context, not an aggregator. Categorize every finding as **Act on**, **Consider**, **Noted**, or **Dismissed**, each with the reviewer that raised it and a one-line rationale. Publishing **Dismissed** is mandatory: it is what lets the user overrule the filtering.

Where the host cannot dispatch parallel reviewers, run one review in an independent fresh context and say so in the output. Where `graph-engineering` is available and security, data, API, UI, or operational reviews are genuinely separate concerns, it can carry the dispatch; one accountable owner still synthesizes.

Never treat an agent's review of its own work as independent evidence.

## Review Output

Lead with actionable findings ordered by severity. Include file and line evidence when available. When independent reviewers were dispatched, present the findings under **Act on**, **Consider**, **Noted**, and **Dismissed** instead of one flat list.

Then report:

- Pass One result: `pass | fail | needs_intent`.
- Pass Two result: `pass | fail` with verification gaps.
- Open questions and assumptions.
- Checks performed and checks still required.
- Agreement Map, when independent reviewers were used: where they agreed, where they diverged, and what that pattern says about confidence. Name the reviewers used, or say that only one independent context was available.
- Overall disposition: `ready`, `ready_after_fixes`, or `not_ready`.

If no actionable findings exist, say so and name the remaining verification or coverage limits.

## Hard Rules

- Do not approve technically polished work that misses intent.
- Do not trust an agent's self-review as independent evidence.
- Do not apply review feedback before checking it against repository reality.
- Do not hide requirement gaps beneath style feedback.
- Do not make scope-expanding improvements without user agreement.
- Do not claim readiness before `evidence-before-completion` confirms the relevant checks.
