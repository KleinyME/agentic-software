# Intent And Situation Kernel

Use this kernel before architecture and revisit it when evidence changes the task.

## Intent Contract

State:

```text
For [actor], enable [job/outcome], proven by [observable success], without [unacceptable consequence].
```

Classify each field as `known_from_code`, `inferred`, `confirmed_by_user`, or `open`.

Ask the user when an open field would change product scope, authority, architecture, data handling, safety, or what counts as complete. Inspect an existing repository before asking questions it can answer.

## Situation Card

```yaml
intent:
  actor: "<who benefits or operates it>"
  outcome: "<what they can complete>"
  success_evidence: []
  prohibited_outcomes: []

situation:
  stage: "greenfield | prototype | early-live | established | regulated"
  scope: "tiny | bounded | multi_module | system"
  risk: "low | medium | high | critical"
  reversibility: "easy | moderate | hard"
  uncertainty: "low | medium | high"
  environment: "local | preview | live | mixed"
  data_sensitivity: "none | internal | private | regulated"
  external_effects: []
  work_shape: "sequential | parallel_read | disjoint_write | conditional | durable"
  activation: "direct_prompt | hermes_schedule | event"
  source_of_truth: []

decision:
  architecture_mode: "lean | standard | senior"
  overlays: []
  strategy_lens: "none | leverage_candidate | intelligence_loop_candidate | rewrite_candidate"
  execution_topology: "direct | staged_loop | task_graph | durable_graph"
  context_strategy: "continuous | fresh_specialists | fresh_executive_graph"
  assembler: "<one accountable owner or not applicable>"
  perspective_pass: "none | non_obvious_option"
  friction_observation: "none | candidate | active"
  specialists: []
  mandatory_overlays: []
  intentionally_excluded_specialists: []
  authority_basis: "current_request | standing_charter | human_gate"
  human_gates: []
  assumptions: []
```

Keep the card in working context by default. Persist only durable fields that future contributors need.

## Architecture Modes

### Lean

Use for small, early, owner-operated, reversible, or bloat-sensitive products. Use `lean-product-architect`. Require one real vertical slice and keep the complexity budget.

### Standard

Use for established ordinary products with bounded scope and conventional risk. Apply `senior-architect` proportionally: clear boundaries, persistence, permissions, tests, preview/release discipline, and memory without enterprise ceremony.

### Senior

Use for multiple teams, deep integrations, complex permissions, high scale, compliance, important migrations, or decisions expensive to reverse. Use the full `senior-architect` workflow and relevant safety specialists.

### Critical Overlay

Critical is a risk overlay, not a size. Apply it to any mode when work can irreversibly affect production data, money, credentials, sensitive publication, safety, or compliance. Require explicit authority, safe environment, recovery evidence, and independent review where available.

## Reclassification Triggers

Re-run the situation card when:

- Code contradicts the initial intent or requirement.
- A local-looking change crosses a public API, auth, data, payment, deployment, or external-system boundary.
- Scope expands beyond the named vertical slice.
- A reversible change becomes destructive or difficult to undo.
- Tests or review reveal a missing success condition or prohibited outcome.
- Parallel work develops overlapping write ownership.
- A supposedly fixed sequence needs waiting, retries, resume, or conditional branches.
- Evidence reveals a compounding learning, proprietary-context, ecosystem, or coordination loop that makes strategy an architecture input.
- Repeated corrections, retries, escalations, or handoff failures reveal a workflow-learning need rather than an isolated defect.
- A proposed exponential or AI-native strategy has no measurable feedback signal, accountable owner, or reversible proof path.
- New user input changes actor, authority, source of truth, or acceptable risk.
- A proactive executive work item falls outside its standing charter, budget, job class, data scope, or initiative ceiling.
- Three focused fix attempts fail or symptoms move across system boundaries.

When reclassification changes architecture, permissions, risk, live effects, or scope, tell the user what evidence changed and ask about missing intent before continuing. Otherwise update the plan and proceed.

## Decision Record

For meaningful work, make the routing decision visible:

```text
Intent: [one sentence]
Situation: [stage, risk, reversibility, uncertainty]
Mode: [lean, standard, senior + overlays]
Strategy lens: [none, leverage candidate, intelligence loop, rewrite]
Topology: [direct, staged loop, task graph, durable graph]
Perspective: [none or non-obvious option, with trigger]
Why: [evidence]
Revisit when: [specific trigger]
```

Do not create a permanent document for a trivial or easily reversible decision.
