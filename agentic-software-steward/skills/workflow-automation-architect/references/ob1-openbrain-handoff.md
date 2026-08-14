# OB1, OpenBrain, And Hermes Handoff

## Standing Preference

When the memory system supports user preferences, preserve this compact intent:

```text
Proactively surface high-value automation opportunities during software builds, even when not requested. Ask when missing business intent would change the recommendation. Keep suggestions concise, broaden initiative without broadening authority, and never create or schedule automation without explicit acceptance. After a standing charter and schedule are accepted, allow eligible internal runs without repeated per-run approval while preserving consequential gates.
```

In Hermes, this belongs in the `user` memory target because it is a durable user workflow preference. Do not store every candidate in the small always-loaded user profile.

## Portable Opportunity Record

Use this shape for OB1/OpenBrain, project memory, or another shared memory provider:

```yaml
kind: automation_opportunity
schema_version: 1
key: "automation:<project-id>:<normalized-workflow-id>"
status: proposed
project: "<project-id>"
workflow: "<short workflow name>"
intent: "<trigger, actor, outcome, evidence, prohibited outcome>"
observation:
  source: "<repo path, issue, conversation, or trace>"
  observed_at: "<ISO-8601>"
  frequency: "<known value or unknown>"
  pain: "<delay, error, labor, or risk evidence>"
recommendation:
  classification: "could_automate | should_automate | architecture_input"
  topology: "function | chain | state_machine | agent_loop | task_graph | durable_graph"
  methods: [deterministic, rule_table, integration, model, agent_loop, human]
  initiative_ceiling: "observe | suggest | draft | execute_reversible | execute_gated"
  rationale: "<why this is worthwhile>"
  confidence: "low | medium | high"
safety:
  side_effects: []
  human_authority: []
  prohibited_actions: []
open_questions: []
next_step: "<one decision or smallest experiment>"
```

## Portable Friction Observation

Use a separate evidence record when a repeated workflow problem has not yet earned an automation recommendation:

```yaml
kind: workflow_friction_observation
schema_version: 1
key: "friction:<project-id>:<workflow-id>:<normalized-friction-id>"
status: observed
project: "<project-id>"
workflow: "<workflow-id>"
step: "<affected step or handoff>"
observed_at: "<ISO-8601>"
evidence_refs: []
signals:
  occurrences: "<known count or unknown>"
  impact: "<time, quality, cost, risk, or blocked outcome>"
interpretation:
  suspected_cause: "<hypothesis, not fact>"
  confidence: "low | medium | high"
recommendation:
  response: "observe | investigate | rule_change | eval_case | workflow_change | access_review"
  next_test: "<smallest evidence-gathering step>"
safety:
  contains_private_content: false
  prohibited_actions: []
```

Deduplicate by stable key. A friction observation is evidence, not permission to alter the workflow. Link it to an `automation_opportunity` only after the response qualifies.

Friction statuses are `observed`, `confirmed`, `response_accepted`, `resolved`, `dismissed`, and `retired`. Preserve the workflow version and new evidence when reopening a resolved or dismissed observation.

## Executive Work Items

For CEO, COO, Marketing, portfolio, or other proactive operating loops, use the canonical `executive_work_item` and standing-charter contracts in [the executive operating loop](../../software-steward/references/executive-operating-loop.md). Link qualified work to existing automation or exponential records instead of copying their full contents.

## Optional Exponential Strategy Link

When the workflow has a concrete compounding mechanism or is part of an accepted AI-native operating-model redesign, add only this link to the automation record:

```yaml
strategy:
  classification: "leverage_candidate | intelligence_loop_candidate | rewrite_candidate"
  exponential_opportunity_key: "exponential:<project-id>:<normalized-scope-id>"
```

Keep the compounding hypothesis, relevant DRIVE/SHAPE constraints, purpose protocol, and proof level in the linked `exponential_opportunity` record defined by `exponential-strategy`. Do not duplicate both records or label ordinary efficiency as exponential.

## Lifecycle And Deduplication

Use the stable `key` to update rather than duplicate a candidate. Valid statuses:

- `proposed`
- `needs_intent`
- `accepted`
- `dismissed`
- `piloting`
- `implemented`
- `measured`
- `retired`

Do not resurface `dismissed` unless new evidence changes frequency, value, risk, or feasibility. Preserve the changed evidence and observed time.

## Hermes Mapping

Hermes supports persistent memory, skills, cron jobs, blueprints, and an approval-based `/suggestions` surface.

- Store the standing preference with the Hermes memory tool when available.
- Use a Hermes automation suggestion for a scheduled monitor, briefing, follow-up, or recurring agent job.
- After the user accepts a standing executive charter and its schedule, let Hermes activate charter-eligible internal runs without prompting again for each occurrence.
- Use a blueprint only for a reusable schedule-backed automation.
- Do not force product-internal state machines or application workflows into cron suggestions; keep those in project/OpenBrain memory and implement them in the product when accepted.
- Never create a cron job from a suggestion without explicit acceptance, and never treat schedule acceptance as authority for actions outside its charter.
- Use a stable suggestion key so dismissal prevents nagging.

Official references:

- Hermes persistent memory: https://hermes-agent.nousresearch.com/docs/user-guide/features/memory
- Hermes skills and external directories: https://hermes-agent.nousresearch.com/docs/user-guide/features/skills
- Hermes blueprints and suggested cron jobs: https://hermes-agent.nousresearch.com/docs/developer-guide/creating-skills

## Safety And Retention

- Store summaries and source pointers, not raw private documents, credentials, or customer data.
- Keep raw prompts, conversations, and traces out of durable friction records unless a scoped data contract explicitly requires them.
- Record observed facts separately from inferred benefits.
- Do not invent savings, frequency, or accuracy.
- Keep project-specific candidates out of the global user profile.
- Require source and observation time for every durable candidate.
- Retire candidates when the underlying workflow is deleted or materially changed.
