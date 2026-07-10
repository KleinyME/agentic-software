# Client Experience Workflow

Use this workflow for client-facing sites, pages, portals, dashboards, and apps.

## North-Star Loop

```text
Client intent and evidence
-> direction
-> clean review preview
-> client refinement and approval
-> production connection
-> promotion and live verification
-> memory
```

## Stage 1: Discover

Inspect before interviewing:

- Existing client site and repo.
- Real products, services, customers, proof, and workflows.
- Reference sites and desired differences.
- Current assets and working integrations.
- Hosting, deployment, and ownership context.

Ask only for missing intent that changes the direction:

- Who should this speak to?
- What should that person believe, feel, or do?
- What specifically works about the references?
- What must be different?
- What is non-negotiable?

Do not ask all of these automatically. Answer them from existing evidence where possible. If the available input already establishes the audience, outcome, references, desired feeling, meaningful difference, and non-negotiables, proceed without an interview. Otherwise ask the smallest question that unlocks useful work, state a default for reversible choices, and defer production-only inputs until the Connect stage.

## Stage 2: Direct

Use `brand-direction` and `visual-direction` to establish:

- Audience and desired perception.
- Central promise and positioning.
- Bold primary direction and optional stretch.
- Message hierarchy and customer journey.
- Visual register and imagery plan.
- Anti-references and category cliches to avoid.

For redesigns, extract facts from the old site and create from a blank page. Do not preserve old wording or sections merely because they exist.

## Stage 3: Create

Use the 100-year copywriting engine when available for strong promises, headlines, offers, and persuasive structure. Then use `brand-copy-steward` for brand alignment and `ai-writing-audit` for a selective final editorial pass.

Build the full intended experience for review:

- Complete page structure and visual hierarchy.
- Strong preview claims.
- Realistic synthetic content where real content is missing.
- Simulated interactions and application states.
- Cohesive existing or generated imagery.
- Responsive desktop and mobile layouts.

Do not let production incompleteness shrink the approved design intention.

## Stage 4: Review

Deliver two separate artifacts:

1. The clean preview: no internal warnings, placeholder labels, verification badges, or developer notes.
2. `CLIENT_REVIEW.md`: proposed claims, provisional content, imagery sources, simulated functions, decisions, and requested refinements.

Concept approval covers look, feeling, layout, copy, claims, intended functionality, and customer journey. It does not assert that production systems are connected.

Once approved, record the direction and boldness so later implementation and audit passes do not dilute it silently.

## Stage 5: Connect

Move unresolved implementation items into `DEPLOYMENT_READINESS.md`:

- Real content, proof, links, and assets.
- Backend, schema, migrations, permissions, and backups.
- Authentication, roles, membership, recovery, and protected routes.
- Forms, destinations, consent, and spam handling.
- Payments, prices, webhooks, tax, and refunds.
- Client-owned API keys, OAuth applications, and environment variables.
- Workers, integrations, retries, logging, and monitoring.
- Analytics, privacy, legal, accessibility, domains, and ownership.

Use a broad visual prototype and a narrow real vertical slice together: the former wins client approval; the latter proves the architecture before full production connection.

## Stage 6: Promote

Treat a shareable preview deployment as review infrastructure, not production, unless the project explicitly designates that deployment as its production target.

Before promotion:

- Resolve or remove every production-blocking claim and provisional asset.
- Connect required real services with client-owned resources where appropriate.
- Exercise success, empty, error, denied, and recovery paths.
- Run build, tests, accessibility, performance, and browser checks proportionate to the product.
- Confirm branch and official production target.

After promotion, verify the official production experience and record evidence.

## Stage 7: Remember

Preserve:

- Approved direction and client decisions.
- Rejected directions and why.
- Real production resources and ownership.
- Verification commands and evidence.
- Known risks and next iteration opportunities.

Use existing repo memory and client artifact stores. Do not build a second control plane around the workflow.
