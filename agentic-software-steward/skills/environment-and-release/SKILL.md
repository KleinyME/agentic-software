---
name: environment-and-release
description: Run deployment environments and releases: preview versus production separation, deindex policy, branch and approval discipline, promotion, rollback, and live verification. Not for judging whether the change itself is correct; use intent-aligned-review.
---

# Environment And Release

Enable ambitious previews while keeping production resources and irreversible actions deliberate. Distinguish deploying a preview from promoting to production.

## Environment Names

Record what each environment means for the project:

- `local-development`
- `client-review-preview`
- `sandbox-preview`
- `production-candidate`
- `official-production`

A shareable `vercel.app` or similar URL is review infrastructure unless the project explicitly designates it as official production. Do not use "live" as shorthand for any deployed URL.

## Safety Ladder

Use the lowest level safe for the change:

- Level 0: docs, copy, or tiny reversible edits, direct to the production branch only where policy allows.
- Level 1: branch plus local checks. This is the default for most small changes.
- Level 2: branch plus a client-review preview for UI, routes, copy, and workflows.
- Level 3: preview plus sandbox or test credentials for auth, payments, webhooks, email, orders, inventory, and any external write.
- Level 4: separate staging for real users, money, important data, repeated release pain, or teams.

## Preview Default

Client-review previews may include bold claims, realistic synthetic data, generated imagery, and simulated workflows. Containment should not weaken the design. Use the smallest useful controls:

- No production secrets unless explicitly required and safe.
- No irreversible production writes.
- No private customer data.
- Separate environment variables for preview and production.
- External writes use sandbox credentials until promotion.
- For a genuinely private preview, use authentication or deployment protection rather than crawler directives.
- Keep review status in the surrounding review workflow, not inside the designed page. Exception: an unaffiliated public prospect concept needs a concise visible unofficial or not-affiliated disclosure.

## Deindex And Crawlability

For a public prospect or client demo, deindex without blocking machine-readable review: crawlers must be able to fetch the page to observe `noindex`, and blocking also locks out the AI and QA readers the demo exists to serve. Follow [references/demo-crawlability.md](references/demo-crawlability.md) for the headers, meta tags, framework configuration, verification steps, and the two prospect preview modes.

Reverse the policy at production. Remove every custom preview `noindex` control from the canonical production target and verify the intended robots policy on the canonical domain itself. A canonical public production site that remains de-indexed is a release blocker. Platform-managed preview and outdated-deployment URLs may correctly stay de-indexed.

## Branch Model And Approval Authority

Inspect and record the repository's actual production branch and review branch before acting; do not assume their names. Check current branch, status, remote, and worktrees first, and preserve unrelated user changes. Branch for features, refactors, dependency changes, integrations, data or auth changes, and multi-file client-experience work.

In the common production-plus-review model:

- The production branch is the production authority and receives only the exact approved commit.
- A feature branch is the editable source of proposed work.
- The review branch is a movable pointer to one exact candidate commit. It is not a workspace and not a second development history.

Rules that follow from that:

- Never edit, commit, or merge directly on the review branch. To update a stable review URL, validate and commit the work on its feature branch, then move the review pointer to that exact commit.
- Keep every unapproved change off the production branch. Unapproved work may appear only in a non-production review environment.
- Approval binds to the exact commit and the review evidence the human approved. Any code or content change after approval creates a new candidate and requires renewed approval.
- Production promotion must contain the exact approved commit, with no opportunistic extra changes.
- After promotion, align the review pointer with the production commit unless the project is deliberately starting a new review cycle.

Use a separate worktree or equivalent isolation when parallel tasks need disjoint branches, unrelated user changes could be disturbed, a risky experiment should not block the primary workspace, or policy requires it. Do not create a worktree for every sequential change, and never move, discard, or overwrite user changes to obtain isolation.

## New Project Default

- Official production deploys from the designated production branch, usually `main`.
- Feature branches create review previews.
- Production and preview secrets are separate.
- Project memory records environment URLs, ownership, credential location, mutation policy, and rollback.

## Preview Release

A preview release is for client or owner review. It may contain documented simulations, fixtures, proposed claims, and provisional imagery.

Before sharing: build successfully; verify the intended routes; inspect desktop and mobile; confirm no internal notes appear in the page; verify public-preview deindexing without blocking unauthenticated machine-readable review; deliver `CLIENT_REVIEW.md` separately; and state that approval covers direction and intended behavior, not production connection.

## Production Resource Handoff

Before promotion, move from developer-owned or simulated resources to the intended client production model. Client-owned accounts are preferred for client production resources.

- Client-owned hosting, database, storage, auth, payment, email, and API accounts where appropriate.
- Client OAuth applications and redirect URLs.
- Production environment variables and secret ownership.
- Data migrations and backup or recovery.
- Domains, DNS, analytics, and monitoring.

Track these in `DEPLOYMENT_READINESS.md` and resolve blocking rows before promotion.

## Production Promotion

Before promoting:

- Verify claims, content, links, images, and legal or customer proof.
- Connect production auth, data, forms, payments, APIs, workers, and client-owned credentials as required.
- Exercise the critical success, denial, error, retry, and recovery paths.
- Run proportionate build, test, accessibility, browser, and deployment checks.
- Confirm the canonical production target carries no custom preview `noindex`, deployment protection, or blocking robots rule.
- Confirm the exact official production target and the rollback path.

## Live Verification

After promotion, verify the official domain or application itself, not merely that a push or deployment succeeded.

Check link-preview metadata against the live domain on every public route:

- `canonical` and `og:url` use the production domain rather than a preview URL.
- The absolute production `og:image` returns 200.
- Titles, descriptions, and alt text contain no retired product or offer names.
- The Twitter card renders.

These ship in the first complete iteration and are rechecked at go-live.

## Live Mutation Guardrails

For production writes, including charges and refunds, inventory changes, customer messages, destructive database operations, and public releases of sensitive behavior:

- Prefer sandbox proof first.
- Show the target, current state, requested change, and expected after-state.
- Require explicit confirmation for consequential live mutations.
- Provide undo or rollback where possible.
- Record identity and outcome when the platform supports it.

## Preserve The Live Baseline

When merging older or parallel work, inspect the actual touched files, preserve current production behavior, carry forward additive non-regressive work, and remove replaced code only after reference and behavior checks.

## Cleanup

After refactoring, remove safely replaced code, stale imports, duplicate helpers, obsolete docs, and unused files. Verify each deletion with search, tests, type checks, or references. If removal is unsafe, record why and create a dated removal plan.

## Handoff

For meaningful changes, use `intent-aligned-review` before release and `evidence-before-completion` for current proof.

Report: environment name and stage; branch and target; connected resources; crawl and index policy; what changed; checks and visual or behavioral evidence; simulations, sandbox dependencies, or provisional content remaining; promotion blockers; rollback and unresolved risk; what actually shipped; and the next safe step.

Do not commit, push, merge, delete a branch, discard changes, or remove an unmerged worktree without the authority required by the user and repository policy.
