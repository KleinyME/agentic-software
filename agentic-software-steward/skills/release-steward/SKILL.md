---
name: release-steward
description: Manage branch discipline, main/master cleanliness, cleanup after refactors, release readiness, rollback notes, and final verification. Use when preparing changes for merge, deciding whether to branch, removing dead code, cleaning duplicates, or ensuring main remains shippable.
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
- Confirm memory/docs updated where needed.

