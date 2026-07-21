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

## Preview Release

A preview release is for client or owner review. It may contain documented simulations, fixtures, proposed claims, and provisional imagery.

Before sharing:

- Build successfully.
- Verify the intended routes.
- Check desktop and mobile screenshots.
- Confirm the rendered page has no internal notes or review annotations.
- For a public concept or prospect demo, verify the meta robots tag and `X-Robots-Tag` deindexing policy without blocking unauthenticated machine-readable review.
- Deliver `CLIENT_REVIEW.md` separately.
- State that approval covers direction and intended behavior, not production connection.

## Production Promotion

Use `live-environment-steward` for environment safety details. Before promotion:

- Resolve all blocking rows in `DEPLOYMENT_READINESS.md`.
- Verify claims, content, links, images, and legal/customer proof.
- Connect production auth, data, forms, payments, APIs, workers, and client-owned credentials as required.
- Exercise critical success, denial, error, retry, and recovery paths.
- Run build, tests, accessibility, browser, and deployment checks proportionate to risk.
- For public production, confirm the canonical target carries no custom preview `noindex`, deployment protection, or blocking robots rule. Platform-managed preview and outdated-deployment URLs may remain de-indexed.
- Verify link-preview metadata against the LIVE domain on every public route: canonical and `og:url` point at the production domain (not a preview URL), `og:image` resolves 200 at its absolute production URL, titles/descriptions/alt text name only current offers (no retired product names), and `twitter:card` renders. Bootstrap set these in iteration one; go-live is when they get re-checked and updated.
- Confirm the exact official production target and rollback path.

After promotion, verify the official domain or application, not merely push or deployment success.

## Preserve The Live Baseline

When merging older or parallel work:

- Inspect actual touched files rather than trusting labels.
- Preserve the current production design and behavior first.
- Carry forward additive, non-regressive work.
- Remove replaced code only after reference and behavior checks.

## Handoff

Report:

- Preview or production.
- Branch and target.
- What changed.
- Checks and visual/behavioral proof.
- Simulations or provisional content remaining.
- Rollback and unresolved risk.
- What actually shipped.
