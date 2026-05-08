# Agentic Software Steward Skill Suite Definition

## Purpose

Build a Codex skill package that makes agents behave like a disciplined senior software team:

- Ask non-technical users about intention, not implementation trivia.
- Translate intention into architecture, risk, design, security, copy, verification, and handoff.
- Prefer smaller real vertical slices over larger fake or unwired features.
- Preserve project memory in the repository so future agents and human engineers can understand why the software exists, how it works, and how it can break.
- Use specialist skills for UI/UX, design systems, brand voice, and copywriting instead of one giant overloaded skill.

The suite should be called:

```text
agentic-software-steward
```

The lead skill should be:

```text
software-steward
```

Use "senior architect" as a role inside the suite, but the package should feel broader than one engineer. It is a project stewardship operating system for agent-built software.

## Research Inputs To Encode

The suite should encode operating habits from these sources:

- Impeccable: use `PRODUCT.md` and `DESIGN.md`, distinguish brand vs product UI, shape before craft, use browser inspection and polish loops. Source: https://github.com/pbakaus/impeccable
- Google DESIGN.md: keep machine-readable design tokens plus human-readable rationale in a root `DESIGN.md`; tokens are the normative values and prose explains application. Source: https://github.com/google-labs-code/design.md
- Senior engineer handbook: senior engineering combines communication, software design, system design, reliability, UX, leadership, and technical writing. Source: https://github.com/jordan-cutler/path-to-senior-engineer-handbook
- C4 model: use system context, container, component, and code views as lightweight architecture mapping levels. Source: https://c4model.com/
- arc42: document goals, constraints, context, building blocks, runtime, deployment, decisions, risks, and glossary. Source: https://arc42.org/overview
- Architecture Decision Records: keep small, modular decision records for architecturally significant decisions, with context, decision, status, and consequences. Source: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- OWASP ASVS: use a real security verification standard for web application controls. Source: https://owasp.org/www-project-application-security-verification-standard/
- NIST SSDF: treat security as part of the software development lifecycle, not a late cleanup step. Source: https://csrc.nist.gov/pubs/sp/800/218/final
- Microsoft threat modeling: define security requirements, diagram the application, identify threats, mitigate them, and validate mitigations. Source: https://www.microsoft.com/en-us/securityengineering/sdl/threatmodeling
- Twelve-Factor App: declare dependencies, store config in the environment, separate build/release/run, keep dev/prod parity, treat logs as event streams. Source: https://12factor.net/
- Google SRE SLOs: define what users care about before choosing operational metrics. Source: https://sre.google/sre-book/service-level-objectives/
- DORA Four Keys: use deployment frequency, lead time, time to restore, and change failure rate as delivery health signals when deployments exist. Source: https://github.com/dora-team/fourkeys
- Practical Test Pyramid: use balanced automated tests and acceptance tests that prove user behavior works. Source: https://martinfowler.com/articles/practical-test-pyramid.html
- Diataxis: keep docs focused by separating tutorials, how-to guides, reference, and explanation. Source: https://diataxis.qubitpi.org/
- OpenSSF Scorecard and SLSA: use dependency and supply-chain checks as optional hardening layers for serious projects. Sources: https://openssf.org/projects/scorecard/ and https://slsa.dev/

## Exact Skill Package Structure

Recommended repository or plugin layout:

```text
agentic-software-steward/
  .codex-plugin/
    plugin.json
  skills/
    software-steward/
      SKILL.md
      references/
        orchestration.md
        question-protocol.md
        routing-rules.md
        risk-levels.md
        definition-of-done.md
        repo-foundation.md
        project-memory.md
        no-theater-software.md
        install-update-policy.md
        validation-scenarios.md
    senior-architect/
      SKILL.md
      references/
        architecture-scorecard.md
        decision-cards.md
        module-boundaries.md
    repo-foundation-bootstrap/
      SKILL.md
      assets/
        AGENTS.template.md
        PROJECT_MEMORY.template.md
        PRODUCT.template.md
        docs/
          architecture-overview.template.md
          module.template.md
          adr.template.md
          definition-of-done.template.md
          no-theater-software.template.md
          security-threat-model.template.md
    project-memory-steward/
      SKILL.md
    no-theater-software/
      SKILL.md
    security-data-safety/
      SKILL.md
    release-steward/
      SKILL.md
    brand-copy-steward/
      SKILL.md
    ai-brand-voice/
      SKILL.md
    100-year-copywriting-engine/
      SKILL.md
      references/
        ...
    impeccable/
      SKILL.md
      reference/
        ...
      scripts/
        ...
  third_party/
    impeccable/
      LICENSE
      NOTICE.md
  README-for-humans.md
```

If we want a lighter v1, start with:

```text
skills/
  software-steward/
  repo-foundation-bootstrap/
  project-memory-steward/
  no-theater-software/
  security-data-safety/
  brand-copy-steward/
```

Then make `impeccable`, `ai-brand-voice`, and `100-year-copywriting-engine` companion skills. The orchestrator should call them when present and offer to install them when missing.

## Orchestrator Routing Rules

The `software-steward` skill is the router. It should load first for broad requests like:

- "Build an app"
- "Audit this repo"
- "Make this production ready"
- "Refactor this vibe-coded repo"
- "Plan this software"
- "Make sure this is not fake"
- "Improve the UI/UX"
- "Make this human-engineer ready"

### Universal Preflight

Before meaningful edits:

1. Read `AGENTS.md` if present.
2. Read `PROJECT_MEMORY.md` if present.
3. If UI work, read `PRODUCT.md` and `DESIGN.md` if present.
4. Check git status and current branch.
5. Classify the task type: greenfield, repo bootstrap, feature, UI, copy, refactor, security/data, release, cleanup.
6. Classify risk level.
7. Decide which specialist skill should own each part.
8. Ask only intention questions that would change the plan.
9. Convert technical questions into plain-language decision cards with a recommended default.

### Human Question Protocol

Ask humans about intention:

- What should this help someone do?
- Who uses it?
- What would make it feel successful?
- What would be embarrassing, harmful, expensive, or dangerous if wrong?
- What information should the software remember?
- Should different people see or do different things?
- Should this feel like a quick prototype, a serious product, or a foundation for growth?

Do not ask:

- "Do you want RBAC?"
- "Postgres or Mongo?"
- "Microservices or monolith?"
- "What state management library?"

Instead ask a decision card:

```text
Decision: Should different people have different permissions?

Why it matters:
This affects privacy, safety, and how hard the app is to manage later.

Options:
1. One owner account: fastest, simplest.
2. Separate user accounts: better for teams, still manageable.
3. Roles and permissions: strongest control, more complexity.

Recommendation:
Start with separate accounts and one owner/admin role if this may become a team product.

Default:
If you do not care, I will plan for separate accounts with a simple owner/admin distinction.
```

### Specialist Routing

Use these routing rules:

- Greenfield or major feature: `senior-architect` first, then relevant specialists.
- Existing repo with unclear intent: `repo-foundation-bootstrap` first.
- Any module/responsibility/documentation drift: `project-memory-steward`.
- Any dashboard, button, page, integration, or workflow that might be fake: `no-theater-software`.
- Auth, permissions, secrets, private data, migrations, payments, deletion, external integrations: `security-data-safety`.
- UI/UX or frontend craft: use `impeccable` if installed. If missing, offer install, then fallback to `design-system-steward` rules.
- Visual identity/design tokens: create or update `DESIGN.md`.
- Product/design context: create or update `PRODUCT.md`.
- User-facing copy, empty states, onboarding, marketing, landing pages: `brand-copy-steward`, then `ai-brand-voice` or `100-year-copywriting-engine` if available.
- Branching, cleanup, final merge readiness: `release-steward`.

### Routing Order For New Software

```text
1. Intention interview
2. Product brief
3. Architecture plan
4. Risk classification
5. Design/brand foundation if UI exists
6. Vertical-slice implementation plan
7. Security/data plan
8. Verification plan
9. Project memory seed
10. Build in small real slices
```

### Routing Order For Existing Repos

```text
1. Read existing docs and repo structure
2. Identify entry points, data, auth, dependencies, routes, tests, config
3. Ask user intention questions only for missing intent
4. Create/update foundation files
5. Mark facts as Known / Inferred / Confirmed / Open Question / Risk
6. Detect theater software, fake data, duplicate implementations, dead code
7. Create prioritized remediation plan
8. Implement only after the foundation is sufficient
```

## Risk-Level Checklist

### Low Risk

Examples:

- Copy changes
- Small isolated style fix
- Non-critical UI polish
- Documentation clarification

Required:

- Check current branch/status.
- Run focused validation if available.
- Update memory only if intention changed.

### Medium Risk

Examples:

- New feature
- Component or route changes
- New dependency
- Moderate refactor
- UI flow changes

Required:

- Work on a branch unless repo policy says otherwise.
- Define acceptance criteria.
- Add or update tests for meaningful behavior.
- Check no-theater rules.
- Update relevant project/module/design memory.

### High Risk

Examples:

- Auth, permissions, roles
- Private data
- Payments
- Data migrations
- Deletion/destructive actions
- External integrations
- Large refactors
- Deployment or environment changes

Required:

- Branch required.
- Plain-language decision card if user intent matters.
- Security/data review.
- Rollback or recovery plan.
- Tests for success and failure paths.
- Update `PROJECT_MEMORY.md`, module memory, and ADR if architecture changed.
- Verify secrets/config are not hard-coded.

### Critical Risk

Examples:

- Production database mutation
- Irreversible data deletion
- Credential handling
- Public release of sensitive functionality
- Compliance-heavy domains

Required:

- Stop and ask for explicit approval.
- Produce a change plan before editing.
- Require backup/rollback notes.
- Prefer human review when available.
- Do not proceed if verification cannot be performed.

## Install And Update Policy For Companion Skills

Companion skills should never be silently installed.

Policy:

1. Detect whether the needed companion skill exists.
2. If present, use it.
3. If missing and the task benefits from it, ask permission to install from a pinned GitHub repo/path.
4. Prefer pinned refs, release tags, or lockfiles over pulling from `main` for serious projects.
5. Preserve third-party `LICENSE` and `NOTICE` files when vendoring.
6. After installing a skill, tell the user Codex may need a restart to pick it up.
7. If install is not possible, use a built-in fallback checklist and record the limitation.

Recommended companion sources:

```text
impeccable:
  repo: https://github.com/pbakaus/impeccable
  path: .agents/skills/impeccable
  license: Apache-2.0, preserve NOTICE

design.md CLI:
  package: @google/design.md
  use: lint/diff/export DESIGN.md when network/dependencies allow

ai-brand-voice:
  source: user's packaged skill

100-year-copywriting-engine:
  source: user's packaged skill
```

Update policy:

- Do not auto-update vendored companion skills during ordinary product work.
- Provide a separate "update companion skills" workflow.
- Before updating, record current version/ref.
- After updating, run skill validation and at least one UI/copy regression scenario.
- If Impeccable changes, preserve its license/notice and run at least one UI validation scenario.

## Project Foundation Files

The suite should create a minimal foundation, not documentation sprawl.

Recommended repo files:

```text
AGENTS.md
PROJECT_MEMORY.md
PRODUCT.md
DESIGN.md
docs/
  architecture/
    overview.md
    decisions/
      0001-template.md
  modules/
    _template.md
  quality/
    definition-of-done.md
    no-theater-software.md
  security/
    threat-model.md
  brand/
    voice.md
```

Do not create every file blindly. Bootstrap the minimum useful set:

- Always: `AGENTS.md`, `PROJECT_MEMORY.md`.
- If product/UI exists: `PRODUCT.md`, `DESIGN.md`.
- If modules are clear: `docs/modules/*.md`.
- If risky architecture decision exists: ADR.
- If auth/data/secrets exist: security threat model.
- If user-facing copy matters: brand voice.

## Template: AGENTS.md

```markdown
# Agent Guide

## Start Here

1. Read `PROJECT_MEMORY.md`.
2. For UI work, read `PRODUCT.md` and `DESIGN.md`.
3. For module work, read the matching file in `docs/modules/`.
4. Check git status and current branch before editing.

## Project Rules

- Main/master should stay shippable.
- Prefer small working vertical slices over large fake features.
- Do not present fake data, dead buttons, or unwired UI as complete.
- Update project memory when architecture, module ownership, data, security, setup, or meaningful product intent changes.
- Remove replaced code when safe. If not safe, record why and create a dated removal plan.

## Verification

Before saying done, report:

- What works now.
- How it was verified.
- Tests or checks run.
- Any fake/demo/stub data remaining.
- Any risks or follow-up items.
```

## Template: PROJECT_MEMORY.md

```markdown
# Project Memory

## Product Intention

Status: Confirmed | Inferred | Open

[Plain-language description of what this software is for and who it serves.]

## Current Working Truth

- [What currently works end to end.]
- [What is partially built.]
- [What is prototype/demo/stub only.]

## What Must Not Break

- [Critical workflows.]
- [Important data.]
- [Security/privacy promises.]

## Architecture Map

- UI:
- API/server:
- Domain logic:
- Data/storage:
- Auth/permissions:
- External integrations:
- Background jobs:

## Module Ownership

| Module | Owns | Must Not Own | Depends On | Memory |
|---|---|---|---|---|

## Data And Security Notes

- Sensitive data:
- Secrets/config:
- Backup/rollback notes:
- Permissions model:

## Verification Commands

- Install:
- Dev:
- Test:
- Build:
- Lint/typecheck:

## Known Risks

| Risk | Severity | Why It Matters | Mitigation |
|---|---|---|---|

## Open Questions

| Question | Why It Matters | Default Assumption |
|---|---|---|

## Recent Meaningful Changes

- YYYY-MM-DD: [Architecture/product/security/design change.]
```

## Template: PRODUCT.md

```markdown
# Product

## Register

product

## Users

[Who uses this, their context, frequency, and job to be done.]

## Product Purpose

[What this product helps them do and how success is recognized.]

## Primary Workflows

1. [Workflow]
2. [Workflow]

## Brand Personality

[3-5 traits. Include tone boundaries.]

## Anti-References

[What this should not feel like, look like, or behave like.]

## Design Principles

- [Principle tied to user/product intent.]

## Accessibility And Inclusion

[WCAG expectations, motion, contrast, keyboard, screen reader, language.]
```

For brand/marketing sites, `Register` should be `brand`. For app surfaces, use `product`.

## Template: DESIGN.md

Follow the Google DESIGN.md format:

- YAML frontmatter for machine-readable tokens.
- Markdown prose for rationale.
- Tokens are normative.
- Prose explains how and why to apply them.

Minimum sections:

```markdown
---
name: [Project Name]
description: [One-line design purpose]
colors:
  primary: "#000000"
typography:
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1rem"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  sm: "8px"
  md: "16px"
---

# Design System: [Project Name]

## Overview

## Colors

## Typography

## Layout

## Elevation & Depth

## Shapes

## Components

## Do's and Don'ts
```

For production UI, run `npx @google/design.md lint DESIGN.md` when dependency/network access is available.

## Template: Definition Of Done

```markdown
# Definition Of Done

A feature is done only when:

- The promised behavior works end to end.
- User-facing UI is wired to real behavior or explicitly labeled demo/prototype.
- Primary actions perform the action they claim.
- Data persists when users would reasonably expect persistence.
- Empty, loading, error, success, disabled, and permission states exist where relevant.
- Tests or checks cover important behavior.
- Security/data risks were reviewed for the change.
- Replaced code, unused imports, duplicate helpers, and stale docs were removed when safe.
- `PROJECT_MEMORY.md`, `DESIGN.md`, module memory, or ADRs were updated if intent or architecture changed.
- The final handoff says what was verified and what remains risky or unfinished.
```

## Template: No Theater Software

```markdown
# No Theater Software

Do not present software as complete when it only looks complete.

## Banned As Done

- Fake analytics dashboard not connected to events or real data.
- Settings page that does not save.
- Buttons that do nothing.
- Forms that do not submit or validate.
- Charts with hard-coded production-looking numbers.
- Auth UI with no real auth boundary.
- "Coming later" features that look shipped.

## Allowed Only When Explicitly Labeled

- Prototype
- Demo
- Fixture
- Seed data
- Stub

## Deferred Work Must Include

- What is unfinished.
- Why it is deferred.
- What must be built to make it real.
- How to verify it works.
- Risk if left unfinished.
```

## Template: Module Memory

```markdown
# Module: [Name]

## Owns

[Responsibilities.]

## Must Not Own

[Boundaries.]

## Public Interfaces

[Functions, routes, events, schemas, components other modules rely on.]

## Dependencies

[Internal and external dependencies.]

## How This Can Break The System

[Failure modes.]

## Tests

[Where tests live and what they prove.]

## Common Mistakes To Avoid

[Agent/human traps.]
```

## Template: ADR

```markdown
# ADR 0001: [Decision Title]

## Status

Proposed | Accepted | Superseded

## Context

[Forces, constraints, tradeoffs.]

## Decision

We will [decision].

## Consequences

- Positive:
- Negative:
- Neutral:

## Revisit When

[Trigger that makes this decision worth reviewing.]
```

## Validation Scenarios

Use these scenarios to forward-test whether the suite behaves correctly.

### Scenario 1: Vague Greenfield App

Prompt:

```text
Build me an analytics dashboard for my marketplace.
```

Expected behavior:

- Ask intention questions about users, decisions, data source, and success.
- Refuse to build fake analytics as "done."
- Propose a first vertical slice: record one real event, store it, query it, show one real metric.
- Create foundation memory.

### Scenario 2: Existing Vibe-Coded Repo With Fake Dashboard

Prompt:

```text
Audit this repo and make it production ready.
```

Expected behavior:

- Inspect repo before asking questions.
- Identify fake data, dead buttons, duplicate implementations, stale docs.
- Create/update `PROJECT_MEMORY.md`.
- Produce a staged remediation plan.
- Mark known vs inferred facts.

### Scenario 3: UI Redesign With Impeccable Available

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

### Scenario 4: UI Work Without Impeccable

Prompt:

```text
Improve this settings page.
```

Expected behavior:

- Detect missing Impeccable.
- Ask permission to install or continue with fallback.
- Use fallback design checklist if not installed.
- Still enforce real behavior, states, accessibility, and memory updates.

### Scenario 5: High-Risk Auth Change

Prompt:

```text
Add team accounts and admin roles.
```

Expected behavior:

- Classify high risk.
- Ask plain-language permission/ownership questions.
- Create a branch.
- Produce a security/data plan.
- Add tests for permission boundaries.
- Update project memory and ADR.

### Scenario 6: Brand/Copy Heavy Landing Page

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

### Scenario 7: Refactor Cleanup

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

### Scenario 8: Data Migration

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

## World-Class Bar

The suite is working when a future human senior engineer can enter the repo and quickly answer:

- What is this software for?
- What actually works?
- What is fake, stubbed, or deferred?
- Where is the core domain logic?
- What data matters?
- What must not break?
- What risks are known?
- How do I run, test, and ship it?
- Why were the important decisions made?
- How should the UI look and sound?
- What should the next agent avoid breaking?

The product is not world-class because it is complex. It is world-class when intention, behavior, architecture, design, security, and verification line up cleanly enough that the next contributor can move faster without guessing.

