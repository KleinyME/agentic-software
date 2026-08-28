---
name: workflow-automation-architect
description: Discover, qualify, and design worthwhile automation opportunities in new or existing software. Use when a build contains repeated manual work, schedules, monitoring, triage, handoffs, approvals, copy-paste between systems, recurring decisions, queues, imports, notifications, operational workflows, proactive-agent requests, CEO/COO/Marketing operating loops, Hermes-activated executive work, or repeated agent friction - including when the user did not explicitly ask for automation. Determine whether each step should use deterministic code, rules, an integration, a bounded model call, an agent loop, a task graph, or human judgment; set a safe initiative ceiling; design read-only workflow-friction observers; and recognize when coordination or recursive learning also creates an exponential-strategy candidate. Ask about intent when the missing answer would change whether or how to automate. Produce portable OB1/OpenBrain candidates and use native Hermes automation suggestions when available.
---

# Workflow Automation Architect

Notice valuable automation without turning every workflow into an agent system. Separate the shape of control flow from the method used at each step.

## Proactive Scan Contract

During every software build, silently scan the requested workflow and nearby operational work for:

- Repeated manual steps or recurring requests.
- Copy-paste between systems.
- Predictable triggers, schedules, monitoring, or follow-ups.
- Triage, classification, routing, approvals, and handoffs.
- Waiting states, retries, reconciliation, or status checks.
- Repeated decisions with stable evidence or policy.
- Error-prone checklists or work that consumes meaningful owner time.

Do not interrupt the main task merely to say that no opportunity exists. Surface an opportunity only when it has a credible trigger, useful outcome, and completion evidence.

## Expand Initiative Without Expanding Authority

Translate vague instructions such as "be proactive" or "do smart things" into a declared initiative ceiling for each workflow:

1. `observe`: collect relevant signals without changing state.
2. `suggest`: surface a deduplicated opportunity with evidence.
3. `draft`: prepare a reversible artifact or simulation for review.
4. `execute_reversible`: perform only pre-approved, bounded, auditable actions with rollback.
5. `execute_gated`: commit a consequential action only after its named human or deterministic policy gate passes. An accepted policy may authorize qualifying instances without per-action human review; exceptions stop.

Choose the highest level that materially advances the intent while remaining
inside declared authority, reversibility, verification, and stop behavior. Do
not default to `draft` merely because a reversible action could be wrong.
Uncertainty should normally trigger investigation, a shadow run, or a bounded
test. More context, stronger models, or wider tool access still do not raise the
authority ceiling automatically.

External messages, publication, deployment, purchases, deletion, permission
changes, sensitive-data disclosure, and other consequential effects remain
gated unless separately and explicitly authorized. The gate does not have to be
a per-action human click: a versioned standing policy may authorize a repeated
action class when deterministic eligibility, evidence, suppression,
idempotency, compliance, budget, assurance, sampling, pause, and revocation
controls are real and immediately enforced.

## Put Intent Before Automation

State the workflow intent in one sentence:

```text
When [trigger], help [actor] achieve [outcome], proven by [evidence], without [unacceptable consequence].
```

Inspect the repo and available context first. Ask the user a short plain-language question when an unknown about the actor, desired outcome, frequency, authority, source of truth, or unacceptable consequence would change:

- Whether the workflow should exist.
- Whether automation is worthwhile.
- Whether a human must retain judgment or authority.
- The architecture, data boundary, or first vertical slice.
- Whether an action may affect live systems, money, private data, or external people.

If the intent cannot be stated honestly, ask before recommending or building automation. If the missing detail does not change the design materially, state the assumption and continue.

## Qualify The Opportunity

Read [references/method-selection.md](references/method-selection.md) when choosing what to automate and how.

Reject or defer automation when it is a one-off, has no stable success signal, saves negligible effort, changes too frequently, depends on tacit human relationship judgment, or has high consequences with no reliable verifier.

Classify a candidate:

- `watch`: plausible pattern but insufficient repetition or evidence; do not interrupt the user.
- `could_automate`: useful option with unresolved intent or economics; ask only if the answer affects the current architecture.
- `should_automate`: repeated, costly, slow, or error-prone work with a stable trigger and verifier.
- `architecture_input`: the automation changes the product's state model, permissions, integrations, or vertical slice; resolve it before architecture.

A candidate should normally show at least two benefits among time saved, faster response, lower error rate, better auditability, or reduced owner babysitting.

After qualification, ask whether the value is merely repeatable efficiency or whether something improves with every run, correction, participant, or captured decision trace. Use `exponential-strategy` only when a concrete compounding mechanism or operating-model bottleneck exists. Do not relabel ordinary automation as exponential.

## Choose Topology And Method Separately

First choose the smallest control-flow shape:

- Direct function or script.
- Fixed chain.
- Explicit state machine.
- Single intelligent loop.
- Task graph with real branches or conditional routes.
- Durable workflow graph for waiting, resume, or partial retry.

Then label every step with one method:

- `deterministic`: code, validation, calculation, transformation, or exact policy.
- `rule_table`: explicit business decisions maintained as data or configuration.
- `integration`: typed read/write against another system.
- `model`: bounded interpretation of unstructured input with a schema and threshold.
- `agent_loop`: open-ended sequential tool use with a clear stop condition.
- `human`: intent, authority, empathy, exception judgment, or irreversible approval.

Prefer a deterministic shell with small intelligent islands. High uncertainty plus a strong verifier may justify model or agent work. High uncertainty plus a weak verifier requires a human.

Use `graph-engineering` only after this method selection shows real parallel branches, conditional routes, durable recovery, isolated verification, or context breadth that one loop cannot handle.

Use `exponential-strategy` after method selection when the accepted workflow also needs decision architecture, recursive learning, compounding context, safe autonomy, ecosystem trust, or a proportional operating-model rewrite. Exponential strategy does not override the selected deterministic, model, agent, graph, or human methods.

## Activate Executive Work Without Per-Run Prompts

Read [../software-steward/references/executive-operating-loop.md](../software-steward/references/executive-operating-loop.md) for proactive CEO, COO, Marketing, chief-of-staff, portfolio, or Hermes-driven operating loops.

Require one accepted standing autonomy charter defining goals, sources, job classes, initiative ceilings, budgets, gates, escalation, quiet hours, and stop conditions. After the charter and schedule are explicitly accepted, Hermes may activate eligible internal observation, analysis, prioritization, or draft jobs without new per-run approval. The COO may start bounded reversible jobs only when the charter names the job class, isolation, verification, resource cap, and release gate.

Keep sending, publishing, spending, pricing, contracting, deploying, merging,
deleting, credential or permission changes, sensitive-data movement, and other
consequential actions behind their named authority gate. For repeated
homogeneous actions, make the chartered communication or action policy the unit
of human supervision; qualifying instances may pass a deterministic gate while
exceptions route to the owner. Ask the owner only when missing intent or an
exception would change direction, scope, authority, identity, data use, policy,
or the completion contract.

## Observe Workflow Friction Deliberately

Read [references/friction-observer.md](references/friction-observer.md) when a user wants an agent to watch other agents or when a repeated workflow shows retries, corrections, escalations, missing context, access gaps, or handoff delay.

Start with deterministic telemetry and periodic read-only review. Use a bounded model only when unstructured traces need interpretation. The **Toby pattern** may recommend an investigation, eval case, rule change, access review, or accepted workflow change; it may not self-modify prompts, policies, permissions, skills, or production behavior.

## Produce A Workflow Automation Contract

Read [references/workflow-contract.md](references/workflow-contract.md) when the opportunity is accepted for design or implementation.

For a marketing test, campaign, message, asset, channel, or audience hypothesis,
also read
[references/marketing-experiment-contract.md](references/marketing-experiment-contract.md).
Pre-register the decision, evidence level, one variable, outcome signal, limits,
and stop rule before producing activity. Keep large discovery or preparation
populations separate from the much smaller consequential-action cohorts they
may inform.

Record:

- Intent, trigger, actor, outcome, completion evidence, and prohibited outcomes.
- Current manual path and evidence of frequency, delay, cost, or errors.
- Selected topology and the simpler baseline.
- Step contracts and execution method for every step.
- Source-of-truth, permissions, side effects, and single-writer rules.
- Highest permitted initiative level and the authority required to raise it.
- Confidence thresholds, deterministic validation, fallbacks, and human gates.
- Retry, time, cost, recursion, and cancellation limits.
- Pilot scope and success metrics.

Do not create, schedule, deploy, or enable an automation merely because it was suggested. A suggestion is not execution authority.

## Surface Without Nagging

If the opportunity changes current architecture, ask the necessary intent question before planning architecture.

Otherwise finish the user's requested work first, then add a compact note:

```text
Automation opportunity: [workflow]
Why it may be worthwhile: [evidence]
Recommended method: [deterministic / hybrid / agent / graph]
Decision needed: [one question or "none until you want to explore it"]
```

Do not repeat a dismissed suggestion unless material evidence changes. Do not turn speculative ideas into roadmap commitments.

## Feed OB1, OpenBrain, And Hermes

Read [references/ob1-openbrain-handoff.md](references/ob1-openbrain-handoff.md) when durable shared memory or Hermes is available.

- Preserve the user's standing preference for proactive, concise automation suggestions as a user preference when the memory system supports it.
- Export qualified opportunities as deduplicated `automation_opportunity` records.
- Export repeated, material workflow friction as deduplicated `workflow_friction_observation` records; convert accepted responses into normal issues, evals, or linked automation opportunities.
- When a qualified workflow also has a concrete compounding mechanism, link it to an `exponential_opportunity` record rather than duplicating the workflow description.
- Send scheduled monitors and recurring jobs to Hermes's native suggestions surface when available.
- Represent executive work that survives triage as a deduplicated `executive_work_item` linked to its charter version, goal, authority basis, and optional `harness_job`.
- Keep product-internal workflows in project memory or OpenBrain unless they are genuinely scheduled agent jobs.
- Require explicit acceptance before creating a Hermes cron job or any other recurring execution.
- Once a charter-backed schedule is accepted, do not require repeated approval for each eligible internal run; do require a fresh gate for exceptions and consequential actions.
- Store sources and observations, not secrets, raw private content, or invented metrics.

## Required Output

For a surfaced opportunity, provide:

- Intent and evidence.
- `could_automate`, `should_automate`, or `architecture_input` classification.
- Recommended topology.
- Method assignment for important steps.
- Human authority and safety boundaries.
- Initiative ceiling and any friction-observer contract that materially affects the design.
- One next decision or experiment.
- OB1/OpenBrain handoff record when supported.
- Exponential-strategy classification only when the compounding mechanism is concrete; omit it for ordinary automation.

## Hard Rules

- Do not confuse graph-shaped control flow with intelligent execution.
- Do not use an LLM where code or a rule table can decide exactly.
- Do not automate a workflow whose intent is not understood.
- Do not let models directly perform high-consequence writes without deterministic checks and required authority.
- Do not treat broader context or better models as broader execution permission.
- Do not let a friction observer rewrite the system it observes without versioned review, verification, and explicit authority.
- Do not treat a CEO, COO, Marketing, or other role name as authority; require a role contract and accepted standing charter.
- Do not interrupt users with weak, duplicate, or low-value suggestions.
- Do not let an automation opportunity expand the current vertical slice without user agreement.
- Do not call ordinary time savings, more model calls, or more users an exponential loop.
- Do not store every observation in always-loaded memory; save compact durable preferences and qualified candidates only.
