# Exponential Opportunity Contract

## Human-Readable Brief

```text
Intent:
[Actor, outcome, evidence, prohibited outcome.]

Classification:
[no_fit | leverage_candidate | intelligence_loop_candidate | rewrite_candidate]

Why now:
[Observed coordination, learning, data, trust, or operating-model evidence.]

Compounding mechanism:
[What improves with each run or participant and why.]

Current constraint:
[One or two DRIVE/SHAPE attributes, not a ten-item scorecard.]

Method boundaries:
[What is deterministic, model-based, agentic, graph-shaped, and human-only.]

Smallest proof:
[One workflow, baseline, target, reversible run, evals/logs, rollback, stop rule.]

On success:
[What manual or legacy path will be deprecated and what later decision becomes possible.]
```

## Machine-Readable Opportunity

Use this for OB1/OpenBrain or project memory when the candidate is durable and qualified:

```yaml
kind: exponential_opportunity
schema_version: 1
key: "exponential:<project-id>:<normalized-scope-id>"
status: proposed
project: "<project-id>"
scope: "feature | product | workflow | function | organization"
intent: "<actor, outcome, evidence, prohibited outcome>"
classification: "leverage_candidate | intelligence_loop_candidate | rewrite_candidate"
observation:
  source: "<repo path, issue, conversation, workflow trace, or linked automation record>"
  observed_at: "<ISO-8601>"
  facts: []
hypothesis:
  bottleneck: "coordination | judgment | data | trust | operating_model"
  compounding_mechanism: "<cause-and-effect loop>"
  relevant_attributes: []
design:
  purpose_protocol_needed: false
  topology: "function | chain | state_machine | agent_loop | task_graph | durable_graph | undecided"
  methods: []
  human_only_decisions: []
proof:
  baseline: "<observed value or unknown>"
  target: "<predeclared success condition>"
  reversible_path: "<shadow, parallel, sandbox, or rollback>"
  stop_rule: "<failure or cost threshold>"
  deprecates_on_success: "<manual or legacy path>"
safety:
  accountable_owner: "<role or open>"
  permission_boundary: "<scope>"
  prohibited_actions: []
  rollback: "<mechanism>"
links:
  automation_opportunity_key: "<optional>"
canonical_source:
  model: "ExO 3.0"
  version_or_checked_at: "<version/date>"
open_questions: []
next_step: "<one decision or experiment>"
```

## Lifecycle

Use these statuses:

- `proposed`
- `needs_intent`
- `accepted`
- `piloting`
- `proven`
- `rejected`
- `scaling`
- `implemented`
- `measured`
- `retired`

Update by stable key. Do not resurface `rejected` unless evidence, scope, risk, or feasibility materially changes.

## Link To Automation Records

If the candidate concerns a specific automated workflow:

- Keep implementation method, trigger, topology, and workflow safety details in the existing `automation_opportunity` record.
- Put strategic compounding, DRIVE/SHAPE constraint, purpose protocol, and migration hypothesis in `exponential_opportunity`.
- Link both records by stable key.
- Do not copy the full record into both places.

## Proof Levels

- `hypothesis`: mechanism is plausible but no run exists.
- `prototype`: a bounded implementation exists, clearly labeled and not treated as operational proof.
- `shadow_proof`: the new path processed real or representative inputs without authority to commit.
- `parallel_proof`: old and new paths ran on the same inputs and met predeclared comparisons.
- `operational`: authority migrated with evals, logs, rollback, and accountable ownership.
- `compounding`: repeated measured cycles show the workflow or ecosystem improving, not merely running.

Never call a candidate exponential based only on a strategy artifact, model output, readiness score, or one successful demo.
