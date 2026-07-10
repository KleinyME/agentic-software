---
name: live-environment-steward
description: Separate client-review previews, sandbox-connected previews, production candidates, and official production environments. Use for Vercel or other preview deployments, staging, branch deploys, environment variables, client-owned accounts, API/OAuth credentials, sandbox services, production promotion, live external writes, rollback planning, and deployment readiness.
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
- Protect or exclude sensitive previews from indexing when appropriate.
- Put review status in the surrounding review workflow, not inside the designed page.

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

## Live Mutation Guardrails

For production writes:

- Prefer sandbox proof first.
- Show target, current state, requested change, and expected after-state.
- Require explicit confirmation for consequential live mutations.
- Provide undo or rollback when possible.
- Record identity and outcome when the platform supports it.

Examples include charges/refunds, inventory changes, customer messages, destructive database operations, and public releases of sensitive behavior.

## Handoff

Report environment name, connected resources, checks, simulated or sandbox dependencies remaining, promotion blockers, and the next safe step.

