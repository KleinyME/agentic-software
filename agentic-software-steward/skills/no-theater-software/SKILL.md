---
name: no-theater-software
description: Keep prototypes, simulations, fixtures, sandbox integrations, production candidates, and verified production behavior honestly separated without limiting the intended design. Use for client-review previews, dashboards, charts, settings, buttons, forms, auth, payments, integrations, generated UI, analytics, deployment readiness, or any surface that may look complete before its production dependencies are connected.
---

# No Theater Software

No-theater governs how maturity is represented, not what may be imagined, designed, simulated, or presented for client approval.

## Stage Model

Declare the actual stage instead of defaulting to `real`:

- `concept-preview`: complete look, copy, layout, claims, intended journey, and realistic simulation for client review.
- `functional-preview`: working frontend behavior using deterministic fixtures, local adapters, or sandbox services.
- `production-candidate`: required client-owned content, services, credentials, data, and controls are connected and awaiting promotion.
- `production-verified`: the official production workflow has been exercised successfully.

A deployed URL is not automatically production. The project must designate its official production target.

## What Is Allowed In Preview

Encourage:

- Full intended dashboards using realistic fixture data.
- Form validation and simulated success/error flows.
- Complete login, membership, checkout, onboarding, and account experiences.
- Buttons that navigate through simulated workflows.
- Proposed marketing claims and proof sections.
- Generated or provisional imagery.
- Loading, empty, denied, error, recovery, and success states.

Do not reduce the intended experience because the backend is not connected yet.

Use a broad visual prototype and a narrow real vertical slice together. The preview establishes intent; the vertical slice proves the production architecture.

## Clean Preview And External Notes

Do not pollute the rendered page with warnings, badges, placeholder labels, audit tags, or implementation notes.

Document outside the page:

- Proposed claims and missing proof.
- Provisional images and source decisions.
- Simulated functions and intended production behavior.
- Client decisions and requested refinements.

Use `CLIENT_REVIEW.md` during concept approval. After approval, use `DEPLOYMENT_READINESS.md` for production work.

## Production Gate

Before calling a capability production-ready:

- Every visible enabled control performs its stated action.
- Forms validate, submit, persist or deliver, and show real failure states.
- Dashboards use the designated real data source or an explicitly approved permanent demo mode.
- Auth has server-side identity and authorization boundaries.
- Payments use the correct client-owned account, products, prices, and webhooks.
- Integrations use intended production credentials and have exercised success/failure behavior.
- Workers and scheduled flows have been run, observed, and recovered from representative failure.
- Testimonials, customers, metrics, certifications, comparisons, links, and documentary imagery are verified or removed.

## Truth States Per Capability

Use:

- `simulated`
- `fixture`
- `sandbox`
- `connected`
- `verified`
- `not-required`

Track state in deployment readiness, not inside the product UI.

## Audit Existing Repos

Search for hard-coded production-looking data, mock routes, empty handlers, console-only actions, unwired forms, static API responses, missing authorization, TODO wiring, skipped tests, and placeholder content.

Classify findings by current environment and intended stage. A fixture in a protected preview is not a defect. The same fixture on an official production path without disclosure is.

## Deferred Work

Every unresolved production item must record:

- Intended final behavior.
- Current simulated or sandbox behavior.
- Required production resource.
- Owner.
- Implementation step.
- Verification method.
- Whether it blocks promotion.

Do not call the system production complete until required items are connected and exercised.
