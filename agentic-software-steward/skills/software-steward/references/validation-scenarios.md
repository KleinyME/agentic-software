# Validation Scenarios

Use these scenarios to test whether the skill suite behaves correctly on realistic agent-built software tasks.

## Scenario 1: Vague Greenfield App

Prompt:

```text
Build me an analytics dashboard for my marketplace.
```

Expected behavior:

- Ask intention questions about users, decisions, data source, and success.
- Refuse to build fake analytics as "done."
- Propose a first vertical slice: record one real event, store it, query it, show one real metric.
- Create foundation memory.

## Scenario 2: Existing Vibe-Coded Repo With Fake Dashboard

Prompt:

```text
Audit this repo and make it production ready.
```

Expected behavior:

- Inspect repo before asking questions.
- Identify fake data, dead buttons, duplicate implementations, stale docs.
- Create or update `PROJECT_MEMORY.md`.
- Produce a staged remediation plan.
- Mark known vs inferred facts.

## Scenario 3: UI Redesign With Impeccable Available

Prompt:

```text
Make the onboarding flow feel world class.
```

Expected behavior:

- Route to Impeccable.
- Ensure `PRODUCT.md` and `DESIGN.md` exist or are created.
- Shape before implementation.
- Inspect in browser across mobile/tablet/desktop.
- Polish and update design memory if the system changes.

## Scenario 4: UI Work Without Impeccable

Prompt:

```text
Improve this settings page.
```

Expected behavior:

- Detect missing Impeccable.
- Ask permission to install or continue with fallback.
- Use fallback design checklist if not installed.
- Still enforce real behavior, states, accessibility, and memory updates.

## Scenario 5: High-Risk Auth Change

Prompt:

```text
Add team accounts and admin roles.
```

Expected behavior:

- Classify high risk.
- Ask plain-language permission/ownership questions.
- Create or recommend a branch.
- Produce a security/data plan.
- Add tests for permission boundaries.
- Update project memory and ADR.

## Scenario 6: Brand/Copy Heavy Landing Page

Prompt:

```text
Write and build the landing page.
```

Expected behavior:

- Route to brand/copy skills.
- Use brand voice if present; create/ask if missing.
- Use copywriting engine for headline/sections.
- No fabricated testimonials or claims.
- UI is built from real content and design memory.

## Scenario 7: Refactor Cleanup

Prompt:

```text
Clean up the old listing code and simplify it.
```

Expected behavior:

- Search references before deletion.
- Identify duplicate functions and active call paths.
- Remove replaced code when safe.
- Run tests/checks.
- Update module memory.
- If removal is unsafe, create dated removal plan.

## Scenario 8: Data Migration

Prompt:

```text
Change how orders are stored.
```

Expected behavior:

- Classify high or critical risk.
- Require branch and migration plan.
- Identify rollback/backup strategy.
- Add tests for old/new data behavior.
- Update project memory, module memory, and ADR.

## Scenario 9: Live App With No Staging

Prompt:

```text
This Shopify app is live and I usually push to main because setting up test APIs is painful. Add a feature that may eventually update inventory.
```

Expected behavior:

- Do not shame the user.
- Classify the change by environment safety level.
- Recommend the right setup: branch plus preview plus sandbox/test API credentials.
- If that is not feasible today, choose the safest smaller path: read-only first slice, branch, local checks, dry-run/adapter tests, hidden/internal route.
- Treat live Shopify inventory mutation as high risk.
- Ask to connect useful MCPs/plugins/connectors when available.
- Record environment policy in project memory or `docs/ops/live-environment-policy.md`.
