# Workflow Friction Observer

Use a friction observer to learn where humans, agents, tools, or handoffs repeatedly struggle. The operator nickname may be **Toby pattern**; use `workflow_friction_observation` in durable records and interfaces.

The observer is an evidence collector, not a manager and not a self-improving control plane.

## Qualify The Observer

Use it when a named workflow repeats and at least one trustworthy signal exists:

- Retries, timeouts, fallbacks, or escalations.
- Repeated human corrections or rejected outputs.
- Missing context, permissions, tools, or source-of-truth access.
- Handoff delay, duplicated effort, or unclear ownership.
- Quality, cost, latency, or intervention metrics that can be compared over time.

Do not create a permanent observer for a one-off task, a workflow with no stable boundary, or a system whose telemetry would expose sensitive content without a lawful and necessary data contract.

## Observation Contract

Prefer deterministic telemetry aggregation before a model. Use a bounded model only to cluster or interpret unstructured traces, with source pointers and confidence.

```yaml
kind: workflow_friction_observation
schema_version: 1
key: "friction:<project-id>:<workflow-id>:<normalized-friction-id>"
status: observed
workflow: "<workflow-id>"
step: "<affected step or handoff>"
observed_at: "<ISO-8601>"
evidence_refs: []
signals:
  occurrences: "<known count or unknown>"
  retries: "<known count or unknown>"
  human_interventions: "<known count or unknown>"
  impact: "<time, quality, cost, risk, or blocked outcome>"
interpretation:
  pattern: "<what appears to recur>"
  suspected_cause: "<hypothesis, not fact>"
  confidence: "low | medium | high"
recommendation:
  response: "observe | investigate | rule_change | eval_case | workflow_change | access_review"
  next_test: "<smallest evidence-gathering step>"
safety:
  contains_private_content: false
  prohibited_actions: []
```

Separate observed facts from inferred causes. Deduplicate by stable key and increase evidence rather than creating a new complaint on every run.

## Learning Path

1. Observe a versioned workflow and retain source pointers.
2. Cluster repeated friction without hiding conflicting evidence.
3. Confirm the bottleneck and value of fixing it.
4. Convert accepted corrections into an issue, eval case, deterministic rule, or qualified automation opportunity.
5. Test the change against a baseline in shadow or reversible mode.
6. Promote only through the workflow's existing review, release, and rollback path.

The observer may recommend a change. It must not rewrite prompts, skills, policies, permissions, production behavior, or its own observation rules without versioned review and explicit authority.

## Topology And Permissions

- Start as logging plus a periodic read-only review, not a new agent service.
- Keep the observer outside producer write paths and give it no greater data or tool access than its evidence requires.
- Use a staged loop for one workflow. Use a durable or graph node only when volume, isolation, waiting, or independent aggregation proves the need.
- Redact or aggregate private content before durable memory; store summaries and source pointers instead of raw conversations.
- Escalate severe single events immediately; otherwise require repetition or material impact before interrupting the user.

Measure whether accepted changes reduce retries, intervention, latency, cost, or failure rate. Retire the observer when it no longer changes decisions.
