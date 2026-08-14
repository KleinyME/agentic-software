---
name: release-steward
description: Manage branch discipline, preview-to-production promotion, main/master cleanliness, release readiness, cleanup, rollback, and final verification. Use when preparing changes for client review or production, deciding whether to branch, merging, pushing, preserving a live baseline, removing dead code, resolving deployment scope, or proving what actually shipped.
---

# Release Steward

Keep the designated production branch shippable and distinguish preview deployment from production promotion.

## Before Work

- Check current branch, status, remote, default/production branch, and worktrees.
- Branch for features, refactors, dependency changes, integrations, data/auth changes, or multi-file client-experience work.
- Preserve unrelated user changes.

## Isolation And Worktrees

Use a separate worktree or equivalent isolation when parallel coding tasks need disjoint branches, unrelated user changes could be disturbed, a risky experiment should not block the primary workspace, or policy requires it. Do not create worktrees for every sequential change. Never move, discard, or overwrite user changes to obtain isolation.

## Small-Project Safety Ladder

Choose the lowest safe level:

- Level 0: direct-to-main only for tiny reversible docs/copy/style changes when policy allows.
- Level 1: branch plus local checks for most small changes.
- Level 2: branch plus preview deployment for UI, routes, and workflows.
- Level 3: preview plus sandbox/test credentials for auth, payments, orders, inventory, webhooks, email, and external writes.
- Level 4: full staging for real users, money, important data, repeated release pain, or teams.

For new software, prefer `main` as production, feature branches as preview/live-dev, separate production/dev secrets, sandbox writes until promotion, and recorded environment/rollback truth.

## Preview Release

A preview release is for client or owner review. It may contain documented simulations, fixtures, proposed claims, and provisional imagery.

Before sharing, build successfully; verify intended routes; inspect desktop and mobile; confirm no internal notes appear in the page; verify public-preview deindexing without blocking unauthenticated machine-readable review; deliver `CLIENT_REVIEW.md` separately; and state that approval covers direction and intended behavior, not production connection.

## Production Promotion

Use `live-environment-steward` for environment safety. Before promotion:

- Resolve blocking rows in `DEPLOYMENT_READINESS.md`.
- Verify claims, content, links, images, and legal/customer proof.
- Connect production auth, data, forms, payments, APIs, workers, and client-owned credentials as required.
- Exercise critical success, denial, error, retry, and recovery paths.
- Run proportionate build, test, accessibility, browser, and deployment checks.
- For public production, confirm the canonical target carries no custom preview `noindex`, deployment protection, or blocking robots rule. Platform-managed preview and outdated-deployment URLs may remain de-indexed.
- Verify link-preview metadata against the live domain on every public route: `canonical` and `og:url` use the production domain rather than a preview URL; the absolute production `og:image` returns 200; titles, descriptions, and alt text contain no retired product or offer names; and the Twitter card renders. These ship in the first complete iteration and are rechecked at go-live.
- Confirm the exact official production target and rollback path.

After promotion, verify the official domain or application, not merely push or deployment success.

## Preserve The Live Baseline

When merging older or parallel work, inspect actual touched files, preserve current production behavior, carry forward additive non-regressive work, and remove replaced code only after reference and behavior checks.

## Cleanup

After refactoring, remove safely replaced code, stale imports, duplicate helpers, obsolete docs, and unused files. Verify deletion with search, tests, type checks, or references. If removal is unsafe, record why and create a dated removal plan.

## Handoff

For meaningful changes, use `intent-aligned-review` before release and `evidence-before-completion` for current proof.

Report preview or production stage; branch and target; what changed; checks and visual/behavioral evidence; simulations or provisional content; rollback and unresolved risk; environment level; and what actually shipped.

Do not commit, push, merge, delete a branch, discard changes, or remove an unmerged worktree without the authority required by the user and repository policy.
