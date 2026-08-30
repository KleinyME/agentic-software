---
name: live-environment-steward
description: Separate client-review previews, sandboxes, production candidates, and real production, including noindex policy and client-owned credentials. Not for the promotion decision; use release-steward.
---

# Live Environment Steward

Enable ambitious previews while keeping production resources and irreversible actions deliberate.

## Environment Names

Record what each environment means for the project:

- `local-development`
- `client-review-preview`
- `sandbox-preview`
- `production-candidate`
- `official-production`

A shareable `vercel.app` or similar URL is review infrastructure unless the project explicitly designates it as official production. Do not use "live" as shorthand for any deployed URL.

## Preview Default

Client-review previews may include bold claims, realistic synthetic data, generated imagery, and simulated workflows.

Containment should not weaken the design. Use the smallest useful controls:

- No production secrets unless explicitly required and safe.
- No irreversible production writes.
- No private customer data.
- Separate environment variables.
- For a public prospect or client demo, deindex without blocking machine-readable review. Follow `references/demo-crawlability.md`.
- For a genuinely private preview, use authentication or deployment protection instead of relying on crawler directives.
- Put review status in the surrounding review workflow, not inside the designed page. Exception: an unaffiliated public prospect concept needs a concise visible unofficial/not-affiliated disclosure.

## Safety Ladder

Use the lowest level safe for the change:

- Level 0: docs, copy, or tiny reversible production edits.
- Level 1: branch plus local checks.
- Level 2: client-review preview for UI, routes, copy, and workflows.
- Level 3: preview plus sandbox/test credentials for auth, payments, webhooks, email, orders, inventory, and external writes.
- Level 4: separate staging for real users, important data, money, repeated release pain, or teams.

## New Project Default

- Official production deploys from the designated production branch.
- Feature branches create review previews.
- When a stable review branch exists, treat it as a movable pointer to the exact proposed feature-branch commit, never as an editable work branch.
- Unapproved work may appear only in a non-production review environment. Production promotion is limited to the exact commit covered by explicit approval; a changed commit requires renewed approval.
- Production and preview secrets are separate.
- External writes use sandbox credentials until promotion.
- Client-owned accounts are preferred for client production resources.
- Project memory records environment URLs, ownership, credential location, mutation policy, and rollback.

## Production Resource Handoff

Before promotion, move from developer-owned or simulated resources to the intended client production model:

- Client-owned hosting, database, storage, auth, payment, email, and API accounts when appropriate.
- Client OAuth applications and redirect URLs.
- Production environment variables and secret ownership.
- Data migrations and backup/recovery.
- Domains, DNS, analytics, and monitoring.

Track these in `DEPLOYMENT_READINESS.md`.

For public production, remove every custom preview `noindex` control from the canonical production target and verify the intended robots policy. A canonical production site that remains de-indexed is blocked from promotion; platform-managed preview and outdated-deployment URLs may remain de-indexed.

## Live Mutation Guardrails

For production writes:

- Prefer sandbox proof first.
- Show target, current state, requested change, and expected after-state.
- Require explicit confirmation for consequential live mutations.
- Provide undo or rollback when possible.
- Record identity and outcome when the platform supports it.

Examples include charges/refunds, inventory changes, customer messages, destructive database operations, and public releases of sensitive behavior.

## Handoff

Report environment name, connected resources, crawl/index policy, checks, simulated or sandbox dependencies remaining, promotion blockers, and the next safe step.

