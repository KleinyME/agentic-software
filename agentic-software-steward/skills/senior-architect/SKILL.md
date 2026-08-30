---
name: senior-architect
description: Plan modular, testable architecture from product intention: greenfield planning, major features, module boundaries, expensive-to-reverse decisions. For bloat, drift, or a V2 rebuild, use lean-product-architect first.
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

## Intake

Use `grilling` for anything you still need from the human, and put only the decisions that actually change the architecture: the jobs to be done, the smallest useful working version, what must never break, which data is sensitive or hard to replace, expected growth, and any integration or platform the client is already committed to. Everything else is a fact to look up, not a question to ask.

## The Five Phases

Work the design in this order. Do not slide past a phase silently.

### 1. Ground

Understand how the affected area works today, and why it is that way, before designing anything. Read the code paths, the data, and the existing contracts. Naming a file is not grounding: trace the flow. Where the design would redefine ownership or layering, find out why the current shape exists so the reason becomes a constraint rather than a guess.

Skip Ground only when the work is genuinely greenfield with no surrounding system to integrate.

### 2. Sketch

Write the caller's usage first: the call sites a consumer would write, and what comes back. The caller's usage is the spec, and the types serve it. Derive the type sketch, function signatures, and module map from that usage; where the two disagree, change the sketch, not the usage.

Leave bodies unimplemented and mark tricky logic as pseudocode. A reader should be able to trace data from input to output from the types and signatures alone.

Screen the sketch against [references/design-red-flags.md](references/design-red-flags.md) before committing to it. Compare candidate shapes on interface depth: prefer the one that hides more complexity behind a smaller public surface.

Drawing a second, structurally distinct sketch is an optional move, not a required phase. Reach for it when the first shape is expensive to reverse, when the design space has real contenders, or when the first sketch feels like the only idea you had. Whole-shape alternatives, not point fixes inside one shape.

Write the rationale alongside the sketch, shaped per [references/rationale-template.md](references/rationale-template.md).

### 3. Agree (opt-in)

Default: proceed to implementation with the sketch. No checkpoint.

Stop for sign-off when the user asks for one, when the decision is expensive to reverse, or when a Decision Card needs an answer only the human can give. If the human pushes back on the shape, at a checkpoint or later, treat that as new grounding: return to Ground, then re-sketch, before writing more code.

### 4. Implement

The sketch is the contract. Replace unimplemented bodies with code and pseudocode with logic.

Deviations from the sketch are signal worth surfacing, not drift to absorb quietly. When a function needs a parameter the sketch did not anticipate, say so and decide which is wrong: the sketch, the requirement, or the implementation reaching past its job.

### 5. Scrap

When implementation keeps producing friction the sketch cannot absorb, throw the sketch out rather than bolting fixes onto a wrong shape. The trigger is a pattern of friction, not a single hard case. Tells:

- the same shape of workaround appearing repeatedly across unrelated code;
- several unrelated edge cases that each need a special-case branch;
- types that need escape hatches to compile: casts, `any`, optional fields that are always set in practice;
- reaching for a lock when the sketch said the state was not shared;
- callers having to know the abstraction's internal rules to use it;
- two or more independent Implement-phase deviations of the same shape.

Complexity in the data is not complexity in the design; some problems are legitimately hard. When you do scrap, re-ground on what was actually built, redesign as if the new constraints had been day-one assumptions, and make the new sketch smaller than the old one before it grows again.

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
