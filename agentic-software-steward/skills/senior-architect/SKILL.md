---
name: senior-architect
description: Senior engineering and system architecture workflow for translating user intention into modular, maintainable, secure, testable software plans. Use for greenfield planning, major features, architectural decisions, module boundaries, tradeoff explanations, and making agent-built software understandable to future human engineers. If the user mentions bloat, drift, V2 rebuild, vibe-coded small software, agent-native workflow, small business loop, almost starting over, or avoiding enterprise ceremony, use lean-product-architect first.
---

# Senior Architect

Translate product intention into a practical architecture plan.

## Role Boundary

Lead only architecture and expensive-to-reverse technical decisions. Do not chair brand, marketing, copy, visual, industrial-design, or blank-page concept work. For mixed tasks, receive the named invariants and interface contract from `project-steward`; do not import the whole engineering risk register into the creative pass.

An implemented UI, existing `DESIGN.md`, or earlier architecture plan is not creative approval. Preserve approved expression during technical design and return genuine conflicts instead of silently normalizing the experience.

## Intent Before Architecture

Consume the intent and situation decision from `software-steward` before selecting architecture. If the actor, intended outcome, success evidence, prohibited outcomes, authority, or source of truth is still materially unclear, inspect available context and ask the user before committing to architecture.

## Lean Redirect

If the user mentions bloat, drift, V2 rebuild, vibe-coded small software, agent-native workflow, small business loop, almost starting over, or avoiding enterprise ceremony, stop and use `lean-product-architect` first.

Return to this skill only when the lean slice needs durable architecture for multiple teams, complex permissions, important data migrations, high scale, compliance, deep integrations, or expensive-to-reverse decisions.

## Inputs To Gather

Ask humans about:

- Users and jobs to be done.
- The smallest useful working version.
- What must never break.
- Sensitive or hard-to-replace data.
- Expected growth: solo tool, team app, customer-facing product, or platform.
- Examples of tools that feel close or wrong.

Ask yourself:

- What are the core domain objects?
- What workflows need to work end to end?
- What data must persist?
- What needs access control?
- What can fail?
- What modules should own which responsibilities?
- What tests prove the behavior?
- What assumptions need to be recorded?

## Architecture Plan Output

Produce:

- Product intention summary.
- Situation summary: stage, risk, reversibility, uncertainty, sources of truth, and overlays.
- First real vertical slice.
- Module boundaries and responsibilities.
- Data model assumptions.
- Security/privacy risks.
- External integrations.
- Testing and verification plan.
- Branching and release recommendation.
- Project memory updates needed.
- Reclassification triggers that would require revisiting the architecture.

## Taste Rules

- Prefer one small working vertical slice over many impressive fake screens.
- Prefer boring, conventional architecture until real complexity justifies more.
- Isolate domain logic from UI and infrastructure.
- Add dependencies only when they remove meaningful complexity and are maintained.
- Name important decisions; do not hide them in code shape.
- If a decision is hard to reverse, record an ADR.

## Decision Cards

When user input is required for a technical decision, explain the human tradeoff and recommend a default. Never ask for technology names unless the user already introduced them.
