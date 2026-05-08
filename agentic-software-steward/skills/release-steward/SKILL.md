---
name: release-steward
description: Manage branch discipline, main/master cleanliness, live-app change safety, cleanup after refactors, release readiness, rollback notes, and final verification. Use when preparing changes for merge, deciding whether to branch, pushing to main, removing dead code, cleaning duplicates, or ensuring main remains shippable.
---

# Release Steward

Keep main/master clean, shippable, and understandable.

## Branching Rules

Check current branch and status before edits.

Branch for:

- Features.
- Refactors.
- Auth/security/data changes.
- Migrations.
- Dependency changes.
- Cleanup that removes code.
- Anything touching multiple modules.

Small isolated docs/copy/style edits may be direct if repo policy allows.

## Small-Project Live App Safety

When the app is already live and there is no staging environment, use a safety ladder instead of pretending there are only two options: enterprise staging or YOLO main pushes.

- Level 0: direct-to-main only for docs, copy, tiny styling, and reversible edits.
- Level 1: branch plus local checks for most small changes.
- Level 2: branch plus preview deploy for UI/routes/workflows.
- Level 3: preview plus sandbox/test API credentials for auth, payments, orders, inventory, webhooks, email, and external writes.
- Level 4: full staging for real users, money, important data, repeated release pain, or teams.

Default to the lowest level that is safe for the change, then recommend the next safety upgrade.

## New Project Environment Rule

For new software, recommend setting up production and live-dev/preview from the beginning when feasible:

- `main` deploys production.
- Feature branches deploy preview/live-dev.
- Production and dev secrets are separate.
- External writes use sandbox/test credentials until promoted.
- Project memory records environment URLs, secret locations, mutation policy, and rollback notes.

When a connector or MCP can set up or inspect this safely, ask the user to connect it instead of making them manually thread everything together.

## Cleanup Rules

After refactoring:

- Remove replaced code when safe.
- Remove stale imports, duplicate helpers, old routes, obsolete docs, and unused files.
- Verify deletion with search, tests, type checks, or references.
- If removal is unsafe, record why and create a dated removal plan.

## Release Handoff

Before merge or final response:

- Summarize what changed.
- Report checks/tests run.
- Identify any fake/demo/stub behavior.
- Note risks and rollback if relevant.
- State the environment level used and any live-only risk remaining.
- Confirm memory/docs updated where needed.
