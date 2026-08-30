---
name: no-theater-software
description: Keep prototypes, simulations, fixtures, sandboxes, and verified production behavior honestly separated. Use when representing how finished something is. Does not limit what may be designed.
---

# No Theater Software

No-theater governs how maturity is represented, not what may be imagined, designed, simulated, or presented for client approval.

## Stage Model

Declare the actual stage:

- `concept-preview`: complete look, copy, layout, claims, intended journey, and realistic simulation for client review.
- `functional-preview`: working frontend behavior using deterministic fixtures, local adapters, or sandbox services.
- `production-candidate`: required client-owned content, services, credentials, data, and controls are connected and awaiting promotion.
- `production-verified`: the official production workflow has been exercised successfully.

A deployed URL is not automatically production. The project must designate its official production target.

## What Is Allowed In Preview

Encourage full intended dashboards using realistic fixture data; form validation and simulated success/error flows; complete login, membership, checkout, onboarding, and account experiences; proposed marketing claims and proof sections; generated or provisional imagery; and loading, empty, denied, error, recovery, and success states.

Do not reduce the intended experience because the backend is not connected yet. Use a broad visual prototype and a narrow real vertical slice together. The preview establishes intent; the vertical slice proves production architecture.

## Clean Preview And External Notes

Do not pollute the rendered page with warnings, badges, placeholder labels, audit tags, or implementation notes. Record proposed claims, provisional assets, simulated functions, and client decisions in `CLIENT_REVIEW.md`. After approval, use `DEPLOYMENT_READINESS.md` for production work.

## Production Gate

Before calling a capability production-ready:

- Every visible enabled control performs its stated action.
- Forms validate, submit, persist or deliver, and show real failure states.
- Dashboards use the designated real data source or an explicitly approved permanent demo mode.
- Auth has server-side identity and authorization boundaries.
- Payments use the correct client-owned account, products, prices, and webhooks.
- Integrations use intended production credentials and have exercised success/failure behavior.
- Workers and scheduled flows have run, been observed, and recovered from representative failure.
- Testimonials, customers, metrics, certifications, comparisons, links, and documentary imagery are verified or removed.

## Truth States Per Capability

Use `simulated`, `fixture`, `sandbox`, `connected`, `verified`, or `not-required`. Track state in deployment readiness, not inside product UI.

## Audit Existing Repos

Search for hard-coded production-looking data, mock routes, empty handlers, console-only actions, unwired forms, static API responses, missing authorization, TODO wiring, skipped tests, and placeholder content.

Classify findings by current environment and intended stage. A fixture in a protected preview is not a defect. The same fixture on an official production path without disclosure is.

## Deferred Work

Every unresolved production item must record intended final behavior, current simulated or sandbox behavior, required production resource, owner, implementation step, verification method, and whether it blocks promotion.

Do not call the system production complete until required items are connected and exercised.

## Clean Output Boundary

Keep prototype, fixture, simulation, claim-evidence, and deployment status truthful without leaking internal machinery into customer-facing copy.

- Put client decisions and preview limitations in the designated review artifact.
- Put launch blockers and dependencies in deployment-readiness artifacts.
- Show a public status only when users genuinely need it, translated into deliberate product language.
- Never send system instructions, private reasoning, audit notes, debug fields, or secrets to a public renderer or client payload.

Use `audience-boundary` when internal truth and user-facing output share a data path.
