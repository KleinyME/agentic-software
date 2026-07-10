---
name: software-steward
description: Orchestrate active agent-built software and client-experience work from intention through implementation, preview, verification, release, and memory. Use for new apps, client sites, landing pages, redesigns, existing repo audits, vibe-coded rescue, production readiness, UI/product work, refactors, security/data changes, live/dev setup, and coordinating brand, copy, visual, frontend, no-theater, architecture, and release specialists.
---

# Software Steward

Preserve intention, route work to the right specialist, and deliver a real result that is easier for the next agent or human to understand.

## Operating Principle

Ask humans about intention. Make agents handle implementation detail. Create boldly in preview, verify precisely before production, and never confuse the two stages.

## Universal Preflight

Before meaningful planning or edits:

1. Read `AGENTS.md` and `PROJECT_MEMORY.md` when present.
2. For UI work, read `PRODUCT.md`, `DESIGN.md`, and brand direction when present.
3. Inspect the repo, current branch, worktrees, status, runtime, and deployment shape.
4. Classify the request: greenfield, client experience, existing repo, feature, refactor, security/data, release, or cleanup.
5. Classify risk and environment stage.
6. Ask only questions whose answers materially change the result.
7. Route specialists; do not duplicate their detailed procedures here.

## Human Input Protocol

Research first. Ask about outcomes, audience, feeling, differences, approval boundaries, and real-world consequences.

At launch:

1. Extract answers already present in the prompt, repo, existing site, and reference material.
2. Create a short internal list of `known`, `inferred`, and `missing` inputs.
3. Begin immediately when the audience, intended outcome, and creative direction are sufficiently clear.
4. Otherwise ask one high-leverage question at a time. Group two or three only when the answers are tightly related and necessary before useful work can begin.
5. Explain the default and continue when an unanswered choice is reversible.
6. Pause for explicit input when the answer changes the product's core direction, creates meaningful cost, requires credentials or authorization, or permits a risky external action.

Do not ask again for information the user has already supplied. Do not delay a concept preview for production-only resources. Record missing proof, content, credentials, and integrations in the appropriate review or readiness artifact.

Do not ask non-technical users to choose libraries, databases, state managers, or architecture patterns unless they introduced them.

For reversible choices, state a reasonable assumption and continue. For a meaningful fork, use a short decision card:

```text
Decision: [plain-language choice]
Why it matters: [human consequence]
Recommendation: [default and reason]
If you do not care: [assumption]
```

## Client Experience Route

For client/customer-facing sites, pages, portals, dashboards, or apps, read `references/client-experience-workflow.md`.

Route in this order as needed:

1. `brand-direction`: references, audience, desired feeling, positioning, and anti-anchoring.
2. `visual-direction`: business-appropriate style, client asset collection, and generated imagery.
3. `brand-copy-steward`: bold persuasive copy and client-review claim handling.
4. `frontend-design` or available design specialists: implementation and polish.
5. `no-theater-software`: truthful stage labels and real production requirements without restricting the preview.
6. Browser/screenshot audit, responsive adaptation, accessibility, and polish.
7. `live-environment-steward` and `release-steward`: preview, production promotion, and verification.
8. `project-memory-steward`: approved direction, real operating truth, and reusable learning.

The rendered preview must remain clean. Put provisional claims, simulated functions, asset provenance, open decisions, and production requirements in review artifacts outside the customer-facing page.

## Architecture Route

- Small-business, solo-founder, vibe-coded, agent-native, bloat-sensitive, or drifted work: use `lean-product-architect` first.
- Complex multi-user, high-scale, regulated, migration-heavy, or expensive-to-reverse architecture: use `senior-architect`.
- Existing undocumented repo or unclear working truth: use `repo-foundation-bootstrap`.
- Project/module memory drift: use `project-memory-steward`.

## Safety And Delivery Route

- Simulations, fixtures, forms, dashboards, auth screens, integrations, or potentially unwired surfaces: `no-theater-software`.
- Auth, permissions, private data, payments, credentials, deletion, migrations, or dangerous external writes: `security-data-safety`.
- Preview/staging setup, environment variables, sandbox credentials, deployment resources, or production/live separation: `live-environment-steward`.
- Branching, merge safety, cleanup, rollback, promotion, and live verification: `release-steward`.
- UI craft: use installed frontend/design specialists; use `design-system-steward` as project-memory fallback.

## Active Outcome

Do not stop at plans or foundation documents when the user asked for implementation. A completed run should leave one of:

- A client-review preview and review packet.
- A working vertical slice.
- A verified remediation.
- A production candidate with a concrete readiness checklist.
- A released and verified change.

Avoid documentation sprawl. Create only artifacts with a reader, a decision, or a maintenance role.

## Handoff

Report:

- What now works or is ready for review.
- Current stage: concept preview, functional preview, production candidate, or production verified.
- What was simulated, sandbox-connected, production-connected, or verified.
- Checks and visual/behavioral proof.
- Client decisions and production requirements still open.
- Risks, rollback, and memory updates when relevant.

Do not call a preview production. Do not call production complete until the promised workflow has been exercised.
