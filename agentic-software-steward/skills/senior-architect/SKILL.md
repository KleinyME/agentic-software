---
name: senior-architect
description: Senior engineering and system architecture workflow for translating user intention into modular, maintainable, secure, testable software plans. Use for greenfield planning, major features, architectural decisions, module boundaries, tradeoff explanations, and making agent-built software understandable to future human engineers.
---

# Senior Architect

Translate product intention into a practical architecture plan.

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
- First real vertical slice.
- Module boundaries and responsibilities.
- Data model assumptions.
- Security/privacy risks.
- External integrations.
- Testing and verification plan.
- Branching and release recommendation.
- Project memory updates needed.

## Taste Rules

- Prefer one small working vertical slice over many impressive fake screens.
- Prefer boring, conventional architecture until real complexity justifies more.
- Isolate domain logic from UI and infrastructure.
- Add dependencies only when they remove meaningful complexity and are maintained.
- Name important decisions; do not hide them in code shape.
- If a decision is hard to reverse, record an ADR.

## Decision Cards

When user input is required for a technical decision, explain the human tradeoff and recommend a default. Never ask for technology names unless the user already introduced them.

