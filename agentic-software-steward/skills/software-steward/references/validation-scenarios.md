# Validation Scenarios

Forward-test the suite with raw prompts. Do not tell the test agent the expected answer.

## 1. Reference-Led New Brand

```text
Build me a site like these two peptide research catalogs, but create a new brand. The entire product catalog must be behind login and new customers require membership verification. I want it to feel premium and controlled, not like a compliance document.
```

Verify that the suite:

- Uses references as a baseline, not a template.
- Produces bold public positioning.
- Keeps catalog/auth production requirements outside the rendered copy.
- Creates brand, visual, copy, client-review, and deployment handoffs.

## 2. Existing-Site Repositioning

```text
Take this reclaimed-materials client site and change the focus to designers and high-end builders. Every material has a story. Make it feel editorial, tactile, and worth specifying.
```

Verify that the suite:

- Extracts facts and assets without preserving the old structure.
- Reimagines from a blank page.
- Selects a business-appropriate visual register.
- Produces human, specific copy and a client asset plan.

## 3. Full Dashboard Preview Without Backend

```text
Create the full client-review version of this sourcing-agent dashboard. We need login, saved searches, daily runs, results, Telegram alerts, settings, and billing. The client needs to approve the entire experience before we connect their accounts.
```

Verify that the suite:

- Builds the complete intended preview instead of shrinking to one screen.
- Uses realistic fixtures and simulated flows.
- Keeps status notes outside the UI.
- Uses one narrow real vertical slice to prove architecture.
- Creates a production checklist for auth, data, worker, messaging, billing, and client ownership.

## 4. Bold Claims In Preview

```text
The first draft is too safe. Push the positioning far enough that it may feel uncomfortable. We will walk it back with the client if needed.
```

Verify that the suite:

- Creates a strong primary or stretch direction.
- Does not hedge claims inside the page.
- Records claim type and production requirement separately.
- Preserves approved boldness through the writing audit.

## 5. Existing Client Images And Generated Gaps

```text
Use the strongest imagery from the client's current site, decide what should be replaced, and generate a cohesive hero and supporting image set for the new direction.
```

Verify that the suite:

- Collects authorized client assets and records sources.
- Does not reuse competitor images.
- Selects style from audience and positioning.
- Generates one anchor direction before a supporting set.
- Keeps imagery provenance and approval notes outside the page.

## 6. Preview To Production

```text
The client approved the preview. Prepare it for production with their real login, payments, forms, backend, API keys, domain, and analytics, then tell me what is still blocking launch.
```

Verify that the suite:

- Converts review decisions into deployment readiness.
- Uses client-owned production resources where appropriate.
- Verifies auth, data, payments, forms, integrations, and failure paths.
- Distinguishes preview deployment from official production.
- Does not claim production until the official workflow is exercised.

## 7. Live Baseline Preservation

```text
Merge this older local client-site work into the current production branch without losing the approved live design or copy.
```

Verify that the suite:

- Inspects actual touched files and worktrees.
- Preserves the current production baseline.
- Carries forward only additive, non-regressive work.
- Builds, promotes, and verifies the official production target.
