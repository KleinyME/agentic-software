---
name: live-environment-steward
description: Plan and enforce live/dev environment safety for small and growing live apps. Use for staging, preview deploys, direct-to-main risk, external APIs, Shopify/Supabase/Vercel/GitHub integrations, environment variables, sandbox credentials, live data mutations, branch-to-preview workflows, rollback planning, and asking the user to connect MCPs or plugins that can set up environments safely.
---

# Live Environment Steward

Make live software safer without pretending every small project can afford enterprise staging on day one.

## Principle

Do it right when feasible. If the right setup is too much friction today, choose the safest smaller step and make the remaining risk explicit.

For new software, prefer setting up production and live-dev/preview environments at the beginning. When two environments exist from day one, they feel normal instead of painful retrofits.

## Environment Safety Ladder

Use the lowest level that is safe for the change. Move up when the change touches real users, real money, real private data, or live external mutations.

### Level 0: Direct-To-Main Live Edits

Allowed only for docs, copy, tiny styling, and clearly reversible changes.

Requirements:

- Confirm current branch.
- Run cheap checks.
- Have a rollback command or revert plan.

### Level 1: Branch Plus Local Checks

Default for most small app work.

Requirements:

- Work on a branch.
- Run build/lint/tests that exist.
- Keep feature hidden if unfinished.
- Do not introduce fake shipped behavior.

### Level 2: Branch Plus Preview Deploy

Use for user-visible UI, routes, onboarding, settings, dashboards, and workflow changes.

Requirements:

- Use a preview deployment if the hosting platform supports it.
- Verify the core flow in the preview.
- Keep external writes disabled unless using sandbox credentials.

### Level 3: Preview Plus Sandbox/Test API Credentials

Use for auth, payments, orders, inventory, webhooks, emails, and any external write.

Requirements:

- Separate test/sandbox app or credentials.
- Separate environment variables.
- Dry-run mode where useful.
- Adapter/service tests for write payloads.
- Explicit confirmation before any live mutation.

### Level 4: Full Staging Environment

Use when the app has real users, repeated release pain, important data, money movement, irreversible workflows, or a team.

Requirements:

- Separate app/project/database/API credentials.
- Seed or anonymized test data.
- Deployment path mirrors production.
- Release and rollback notes.

## New Project Default

When planning new software, ask:

- Where will production run?
- Can we create preview deploys automatically from branches?
- Which APIs need sandbox/test credentials?
- What data store will production use?
- Can dev use a separate database/project from day one?
- Which MCPs/plugins/connectors can set this up or manage it?

Recommended default:

- `main` deploys production.
- Feature branches deploy preview/live-dev.
- Production secrets and dev secrets are separate.
- External writes use sandbox credentials until explicitly promoted.
- The project memory records environment names, URLs, credentials location, and mutation policy.

## Existing Live App Default

If a live app has no staging/dev environment:

1. Do not shame the user or block harmless work.
2. Classify the change by risk.
3. Prefer read-only first slices.
4. Branch before changes unless the edit is Level 0.
5. Use hidden/internal routes or feature flags for unfinished features.
6. Add dry-run mode or payload tests before live external writes.
7. Recommend the smallest next safety upgrade.

## MCP And Connector Protocol

When setup can be handled by a connector or plugin, offer that path first.

Examples:

- GitHub: create branches, inspect PRs/checks, review CI.
- Vercel: inspect projects, preview deploys, deployments, logs.
- Supabase: separate projects/databases, migrations, environment config.
- Shopify or other commerce/admin APIs: prefer sandbox/dev stores or test credentials when available.

If a needed connector is unavailable:

- Ask the user whether they want to connect/install it when the platform is supported.
- Continue with manual instructions or local fallback if they decline.
- Record the limitation in project memory.

Do not silently create live resources or connect accounts.

## Live Mutation Guardrails

For writes to live systems:

- Prefer sandbox/test credentials.
- If live credentials are the only option, use read-only first.
- Require explicit user confirmation before the live mutation path is used.
- Show exact target, current state, requested change, and expected after-state.
- Provide undo or rollback when possible.
- Log/audit who/when/what if the platform exposes identity.

Examples:

- Receiving Shopify inventory is a live mutation.
- Sending customer email is a live mutation.
- Charging/refunding payment is a live mutation.
- Deleting records is a live mutation.

## Handoff

Report:

- Current environment level.
- What safety layer was used.
- What checks ran.
- What still uses live-only credentials.
- Recommended next safety upgrade.

