---
name: graph-engineering
description: Design and audit task graphs, knowledge graphs, and agent dispatch topology.
disable-model-invocation: true
---

# Graph Engineering

Design the topology agents execute through and the relationships they reason over. Make every node, edge, state field, verifier, and human gate earn its place.

When starting from a human or business workflow, use `workflow-automation-architect` first to determine what should be automated and whether each step should use deterministic code, rules, integrations, models, agents, or humans. Graph topology and node intelligence are separate decisions.

## Separate The Two Modes

Classify the request before designing anything:

- **Task graph:** models how work executes. Nodes are jobs or deterministic steps; edges are dependencies, routes, joins, retries, and approval gates.
- **Knowledge graph:** models what the system knows. Nodes are entities, events, decisions, or artifacts; edges are typed relationships with provenance and time.

Do not treat these as one graph. They solve different problems and may use different storage and runtimes.

## Start With The Loop Test

Keep a single agent loop when the work is mostly sequential, requires one continuous context, mutates shared state throughout, has one clear verifier, or is inexpensive enough that orchestration would dominate the work.

Use a task graph only when its topology provides concrete value through at least one primary qualifier:

- Two or more genuinely independent branches that can run concurrently.
- Specialized reviews that should not share the producer's context.
- Conditional outcomes that require different next steps.
- Long-running work that needs durable state, recovery, or partial retry.
- Breadth or context volume that one agent cannot handle reliably.

A fixed producer/reviewer sequence or one independent verifier does not qualify by itself; keep it as a staged loop. If a proposed graph can collapse into one loop without losing speed, isolation, reliability, durable recovery, or necessary control, collapse it. A workflow diagram is not evidence that a graph is needed.

## Independent Perspectives Are Not Automatically A Graph

A read-only **Weirdo Pass** or `non_obvious_option` stage may challenge a credible baseline. Keep it in one staged loop unless fresh-context isolation, parallel alternatives, or breadth creates measurable value. Give it no execution or merge authority; one coordinator decides whether to test, park, or reject its proposal.

A **Toby pattern** or workflow-friction observer may aggregate retries, corrections, escalations, and handoff evidence. Start with telemetry plus periodic read-only review. Use a graph or durable node only when volume, waiting, isolation, or independent recovery justifies it. The observer may propose versioned changes but must not rewrite the workflow it watches.

CEO, COO, and Marketing role names alone do not define topology, but this executive cell qualifies when their value depends on fresh-context cognitive independence and typed handoffs. Run them as separate agent contexts: Marketing returns an independent `market_brief`; an optional Weirdo node returns `non_obvious_option`; CEO owns strategic fan-in and returns `direction_decision`; COO receives that decision in a fresh context and returns `harness_job`. A single agent changing roles in one conversation is `degraded_single_context`, not an equivalent graph.

Fresh context does not require different model providers or three persistent services. It requires separate histories, scoped evidence packets, role-specific tools/memory, typed outputs, and exclusion of upstream hidden reasoning. Use Hermes plus durable work records first; add a graph runtime only when waiting, resume, partial retry, concurrency, or recovery exceeds those primitives.

## Task Graph Workflow

Read [references/task-graphs.md](references/task-graphs.md) when designing or executing agent orchestration.

Read [references/skill-directed-agent-assembly.md](references/skill-directed-agent-assembly.md) when selected skills should dispatch fresh-context agents whose typed outputs are assembled into one result.

1. **Audit the work.** Name the objective, deliverable, current loop, bottleneck, irreversible actions, shared artifacts, and verification oracle.
2. **Find real nodes.** Create a node only for a distinct job, tool boundary, permission boundary, deterministic operation, independent perspective, or recoverable unit of work.
3. **Draw edges before dispatching.** Add an edge only when the target consumes the source's output or when policy requires the transition. Delete ceremonial "and then" edges.
4. **Type every edge.** Prefer `depends_on`, `produces`, `routes_on`, `verifies`, `blocks`, `supersedes`, `retries`, and `requires_approval` over vague `related_to` edges.
5. **Define node contracts.** For each node specify inputs, output schema, tools, write scope, success evidence, failure output, timeout, and owner.
6. **Define shared state.** Keep it small and typed. State who may write each field, how concurrent updates merge, and which artifacts remain the source of truth.
7. **Choose the smallest topology.** Use a chain, fan-out/fan-in, router, evaluator loop, or orchestrator/workers pattern. Start with three to five nodes.
8. **Place independent verification.** Use a read-only verifier with explicit criteria. One coordinator owns synthesis and the final merge.
9. **Place human gates.** Gate irreversible, security-sensitive, live, financial, destructive, publishing, deployment, or externally visible transitions - not harmless internal steps.
10. **Bound execution.** Set concurrency, cost/token, wall-clock, retry, and recursion caps. Define cancellation, partial failure, and resume behavior.
11. **Measure the result.** Compare quality, wall-clock time, cost per successful completion, retry rate, and human intervention against the simpler baseline.

A graph design does not authorize spawning agents or performing external actions. Use subagents only when the user, system, repository instructions, and available tools permit it.

## Knowledge Graph Workflow

Read [references/knowledge-graphs.md](references/knowledge-graphs.md) for knowledge graphs, GraphRAG, or graph-backed project memory.

1. Write the multi-hop, temporal, or relationship-heavy questions the graph must answer.
2. Stop if a table, searchable Markdown, or vector retrieval answers them more simply.
3. Choose the smallest representation: typed Markdown links or JSON first, then SQLite/property graph, then RDF/OWL only when standards or formal semantics require it.
4. Define a minimal ontology before extraction.
5. Attach source, observed time, validity interval, confidence, and extraction method to every fact.
6. Extract entities before relations; require source evidence and validate edge domain/range.
7. Model dynamic changes as events or temporal edges.
8. Fuse aliases and duplicates before serving the graph. Preserve conflicting sourced facts instead of silently overwriting them.
9. Evaluate extraction and retrieval on the competency questions.
10. Serve small cited subgraphs or paths to agents; do not dump the entire graph into context.

For ordinary repositories, make the first implementation a compact typed relationship table in `PROJECT_MEMORY.md`. Add a separate machine-readable graph file, generator, or graph database only when a named consumer, query volume, or evaluated automation need justifies it. Use `project-memory-steward` to preserve durable project relationships.

## Required Design Output

For a task graph, produce:

- Why a graph is justified - or why the workflow should stay a loop.
- A small Mermaid topology.
- Node contract table.
- Typed edge table with conditions.
- Shared-state and write-ownership contract.
- Verifier, merge owner, human gates, budgets, stop rules, and failure routes.
- Baseline and success metrics.
- Skill-to-node dispatch plan, typed worker-return schema, accountable assembler, conflict precedence, and final fresh-context assurance when skill-directed agents are used.

For a knowledge graph, produce:

- Competency questions and simpler alternatives considered.
- Representation choice and minimal ontology.
- Typed edge vocabulary.
- Provenance and temporal contract.
- Extraction, validation, fusion, evaluation, and serving plan.
- Pilot scope before scale.

## Hard Rules

- Do not create agents to imitate an org chart.
- Do not make a memorable role name evidence that a separate agent or graph node is needed.
- Do not parallelize sequential reasoning or let multiple workers edit the same artifact.
- Do not accept worker self-reports as verification.
- Do not let independent worker findings merge without one accountable synthesizer.
- Do not use untyped edges for load-bearing decisions.
- Do not store graph facts without provenance and time.
- Do not deploy graph infrastructure before a small real workflow or retrieval question proves the need.
- Do not hide graph cost, failed branches, stale facts, or unresolved conflicts from the user.

## Research Basis

The operational rules are grounded in Google Research's controlled agent-scaling study, Anthropic's production multi-agent reports and workflow patterns, official LangGraph/AutoGen/Google ADK documentation, the GraphRAG-Bench paper, and the Zep/Graphiti temporal-memory paper. The linked 2026 guides supplied terminology and examples; primary sources control when claims conflict.
