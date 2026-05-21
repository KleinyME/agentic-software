---
name: lean-product-architect
description: Lean, anti-bloat architecture for early-stage products, small business automations, agent-native tools, autonomous AI workflows, V2 rebuilds, and drifted repos. Use when the user wants the smallest real business loop, complains about bloat, ceremony, control planes, dashboards, gates, proof systems, speculative modules, or says an agent-built repo drifted. Prefer direct tool use, deletion, and one working vertical loop over platform architecture.
---

# Lean Product Architect

Design the smallest real business loop that works. Prevent architecture theater.

Use this skill before `senior-architect` when the product is early-stage, owner-operated, agent-native, or already bloated.

## Bias

Prefer the smallest real business loop over a complete platform.

Before adding a module, dashboard, queue, proof gate, document, API, verifier, compatibility layer, or abstraction, ask:

- Does this directly help the first customer journey complete?
- Does it reduce owner babysitting this week?
- Does it improve preview, audit, report, or delivery quality in a way the user will use now?
- Does it prevent a concrete dangerous action?

If not, do not add it.

## Complexity Budget

For early-stage products:

- One primary user loop.
- One durable state model.
- One approval boundary model.
- One agent interface.
- No compatibility APIs unless an active caller exists.
- No new verifier unless it replaces more code than it adds.
- No ADR unless the decision is hard to reverse.
- No dashboard before the workflow it observes is real.
- No queue until synchronous/direct execution is proven insufficient.
- No generic plugin layer until two real integrations need it.

If the plan exceeds the budget, remove scope before adding architecture.

## Agent-Native Architecture

Do not build a second brain around an AI agent.

Use the agent, tools, skills, memory, and existing backend APIs directly.

Add wrappers only for:

- Safety.
- Repeatability.
- Evidence capture.
- Idempotency.
- A real user-facing workflow.

Keep adapters thin. Prefer direct tool calls and existing services over building internal control planes.

## Existing Repo Rescue

When the user says the repo drifted, treat existing code as evidence, not authority.

Classify surfaces as:

- Keep: useful, working, active.
- Rewrite: important but structurally wrong.
- Archive: maybe useful later, not on the active path.
- Delete: stale, duplicate, fake, unused, or blocking clarity.

Prefer deleting stale surfaces over documenting around them.

Do not preserve old flows for compatibility unless a real active user, caller, customer, or integration depends on them.

## Useful Automation vs Proof Ceremony

Useful business automation:

- Completes or improves a real workflow.
- Saves owner time this week.
- Produces a deliverable, preview, report, audit, or action the user can use.
- Reduces a known mistake or risk.

Proof ceremony:

- Exists mostly to reassure the agent.
- Produces gates, dashboards, reports, or logs no one will use.
- Adds status tracking before there is a real workflow.
- Measures fake progress.
- Requires maintaining a system around the system.

Delete proof ceremony unless it prevents a real near-term mistake.

## Output Shape

Produce:

- North-star loop.
- First vertical slice.
- Keep/rewrite/archive/delete map for brownfield repos.
- Data boundaries.
- Approval boundary.
- Hard stops.
- Test/verification plan.

Do not produce unless asked:

- Broad platform roadmaps.
- Multi-phase ceremony.
- Speculative modules.
- Dashboards before workflows.
- Enterprise control planes.
- ADRs for easy-to-reverse choices.

## Hard Stops

Stop or escalate to companion skills when:

- The slice writes to live external systems: use `security-data-safety` and `live-environment-steward`.
- The plan contains fake dashboards, unwired forms, or pretend status: use `no-theater-software`.
- The repo needs branch/deploy/rollback discipline: use `release-steward`.
- The work has grown beyond a small business loop and needs durable multi-user architecture: use `senior-architect`.

## Final Check

Before finalizing a plan, name what was removed to keep the system lean.

If nothing was removed, reconsider whether the plan is still too bloated.

