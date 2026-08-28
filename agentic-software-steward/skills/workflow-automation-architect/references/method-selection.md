# Workflow Method Selection

## Contents

- [Evidence to collect](#evidence-to-collect)
- [Step method selector](#step-method-selector)
- [Topology selector](#topology-selector)
- [Automation value test](#automation-value-test)
- [Failure rules](#failure-rules)

## Evidence To Collect

Observe the workflow before prescribing technology:

| Dimension | Useful evidence |
|---|---|
| Intent | Actor, outcome, success evidence, prohibited outcome |
| Frequency | Runs per day/week/month and seasonal peaks |
| Labor | Touch time, waiting time, handoffs, interruptions |
| Variability | Stable cases, exception types, changing inputs |
| Determinism | Whether accepted inputs map to one exact result |
| Verifiability | Tests, reconciliation, policy checks, human review |
| Consequence | Money, private data, legal effect, reputation, live state |
| Reversibility | Undo, idempotency, retry, rollback, compensation |
| Authority | Highest action level currently permitted and who may raise it |
| Decomposability | Independent branches, joins, isolated writes |
| Memory | Facts needed across runs and their source of truth |

Do not invent frequency or savings. Mark unknown values and ask only when they change the recommendation.

## Step Method Selector

| Conditions | Default method | Guardrail |
|---|---|---|
| Exact transformation, calculation, validation, or stable rule | `deterministic` | Unit/contract tests |
| Many explicit business conditions maintained by operators | `rule_table` | Versioned policy and test cases |
| Typed external read/write | `integration` | Idempotency, auth, retries, sandbox |
| Unstructured input and bounded typed output | `model` | Schema, confidence threshold, validation |
| Open-ended sequential investigation or tool use | `agent_loop` | Stop condition, budget, independent evidence |
| Intent, authority, empathy, novel exception, or irreversible judgment | `human` | Show evidence and preserve decision record |

Prefer hybrid designs. Models may interpret; deterministic code should validate and commit whenever possible.

Decision rules:

1. High determinism and high consequence -> deterministic code or rules.
2. High ambiguity and strong verifier -> bounded model or agent with fallback.
3. High ambiguity and weak verifier -> human judgment.
4. Repeated model output with stable corrections -> consider converting learned cases into rules.
5. Low-confidence output -> route, abstain, or ask; never pretend certainty.

## Topology Selector

| Work shape | Smallest suitable topology |
|---|---|
| One short stable operation | Function or script |
| Fixed ordered steps | Chain |
| Explicit legal states and transitions | State machine |
| Sequential intelligent work sharing context | Single agent loop |
| Independent read-only or disjoint-write branches | Fan-out/fan-in task graph |
| Input-dependent paths | Router or conditional graph |
| Waiting, callbacks, resume, or isolated retry | Durable workflow graph |

Topology does not select the node method. A state machine may contain one model node; an agent graph may contain mostly deterministic nodes.

## Initiative Ceiling

Assign authority separately from topology and intelligence:

| Ceiling | Permitted behavior |
|---|---|
| `observe` | Read scoped signals and record evidence |
| `suggest` | Surface a deduplicated recommendation |
| `draft` | Prepare a reversible artifact or simulation for review |
| `execute_reversible` | Run a bounded, pre-approved action with audit and rollback |
| `execute_gated` | Prepare a consequential action; named authority commits it |

Select the lowest ceiling that achieves the intent. More capable models, more memory, or more connected tools do not raise it.

## Automation Value Test

Recommend `should_automate` when all are true:

- A stable trigger and useful output exist.
- Completion can be verified.
- The workflow repeats or protects a meaningful risk.
- Maintenance is plausibly lower than continued manual effort.
- Authority and failure handling are clear.

Recommend `could_automate` when the design is promising but frequency, exception rate, ownership, or economics remain uncertain.

Use `architecture_input` when automation changes persistence, permissions, source-of-truth, integrations, audit history, or the first real user loop.

Use `watch` when evidence is insufficient. Do not surface `watch` items unless the user asks for a full opportunity inventory.

## Failure Rules

- Do not automate accidental workarounds before checking the root problem.
- Do not optimize a workflow that should be deleted.
- Do not automate unclear policy; clarify or formalize it first.
- Do not use an agent to conceal missing APIs or unstable data ownership.
- Do not compare only build cost; include monitoring, exceptions, maintenance, and failure recovery.
- Do not call human approval an automated step. It is an authority boundary.
