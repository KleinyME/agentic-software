# Knowledge Graphs For Agent Memory And Retrieval

## Contents

- [Use test](#use-test)
- [Nine-stage pipeline](#nine-stage-pipeline)
- [Minimal project-memory graph](#minimal-project-memory-graph)
- [Temporal provenance](#temporal-provenance)
- [Evaluation and serving](#evaluation-and-serving)
- [Primary sources](#primary-sources)

## Use Test

Use a knowledge graph when relationships are part of the answer: multi-hop dependency questions, temporal changes, causal chains, recurring entities across many sources, or corpus-wide synthesis.

Prefer simpler storage when the need is exact lookup, full-text search, similarity retrieval, or a small relationship table. GraphRAG-Bench reports that graph retrieval can underperform ordinary RAG on real tasks, so route by question type and validate against a baseline.

## Nine-Stage Pipeline

1. **Scope:** Write competency questions and success metrics. Reject the graph if simpler retrieval answers them.
2. **Representation:** Choose typed Markdown/JSON, SQLite/property graph, or RDF/OWL. Decide time and provenance fields now.
3. **Ontology:** Define minimal entity, event, and relation types with precise meanings, domain/range, and real examples.
4. **Entity extraction:** Map structured sources deterministically. For unstructured text, extract typed entities with source spans.
5. **Relation extraction:** Create edges only between accepted entities; require evidence and validate domain/range.
6. **Event extraction:** Represent dynamic facts as events with actors, timestamps, and arguments rather than flattening them into ambiguous edges.
7. **Quality gate:** Sample precision, check provenance coverage, and test competency-question paths before scaling.
8. **Fusion:** Resolve aliases and duplicates with deterministic merge rules; preserve conflicting sourced facts and undo information.
9. **Serving:** Retrieve small relevant paths or subgraphs with citations. Combine vector retrieval for candidate discovery with graph traversal for relationships when evaluation supports it.

Pilot the complete pipeline on a small representative corpus before adding infrastructure or processing the full dataset.

## Minimal Project-Memory Graph

For most software repositories, start with a Markdown table in `PROJECT_MEMORY.md` - not a generator, separate index, or graph database. Move to a small JSON/YAML graph only after the table has a real machine consumer or has become too large to maintain safely.

Suggested node types:

- `Workflow`
- `Module`
- `Interface`
- `DataStore`
- `ExternalSystem`
- `Decision`
- `Risk`
- `Environment`
- `Test`
- `Incident`

Suggested edge types:

- `OWNS`: module owns interface or workflow.
- `DEPENDS_ON`: component requires another component or external system.
- `IMPLEMENTS`: code or service realizes a contract or decision.
- `VERIFIED_BY`: workflow or requirement is proven by a test/check.
- `DECIDED_BY`: architecture shape follows a recorded decision.
- `SUPERSEDES`: current decision or interface replaces an older one.
- `AFFECTS`: risk or incident impacts a module/workflow.
- `RUNS_IN`: component or workflow operates in an environment.
- `CAUSED`: supported causal relationship between changes and incidents.
- `BLOCKED_BY`: work cannot proceed until another state changes.

Example:

```text
checkout-flow -[DEPENDS_ON]-> payments-adapter
payments-adapter -[IMPLEMENTS]-> payment-provider-contract
checkout-flow -[VERIFIED_BY]-> tests/e2e/checkout.spec.ts
ADR-009 -[SUPERSEDES]-> ADR-003
incident-2026-08-04 -[AFFECTS]-> checkout-flow
```

Do not create edges merely because two artifacts mention each other. Every load-bearing edge needs evidence.

Do not add rebuild commands, CI synchronization, generated summaries, or extraction services during the first pilot unless the user explicitly asks for automation. First prove that the relationship model prevents stale-agent decisions.

## Temporal Provenance

Facts change. Store at least:

```yaml
subject: ADR-009
predicate: SUPERSEDES
object: ADR-003
source: docs/architecture/decisions/0009-auth.md
observed_at: 2026-08-14T00:00:00Z
valid_from: 2026-08-10
valid_to: null
confidence: confirmed
method: direct-document-link
```

Use `valid_from` and `valid_to` for world validity and `observed_at` for when the system learned the fact. Prefer explicit supersession over deleting history. Never silently overwrite conflicting facts from different sources.

Zep/Graphiti demonstrates the value of temporally aware knowledge for long-lived agent memory, but its published benchmark results are system-specific. Treat them as evidence to evaluate temporal memory, not proof that every project needs Graphiti.

## Evaluation And Serving

Evaluate:

- Entity and relation precision on a reviewed sample.
- Provenance and temporal-field coverage.
- Duplicate/merge error rate.
- Accuracy on competency questions.
- Retrieval quality and answer citation correctness.
- Latency and cost against vector-only or text-search baselines.

At query time:

1. Identify seed entities.
2. Retrieve the smallest relevant path or neighborhood.
3. Rank and prune by relation type, time, confidence, and query intent.
4. Serialize typed edges with source pointers.
5. Require answers to cite the supporting facts.

## Primary Sources

- Xiang et al., "When to use Graphs in RAG: A Comprehensive Analysis for Graph Retrieval-Augmented Generation," arXiv:2506.05690, v3 (2026): https://arxiv.org/abs/2506.05690
- Rasmussen et al., "Zep: A Temporal Knowledge Graph Architecture for Agent Memory," arXiv:2501.13956 (2025): https://arxiv.org/abs/2501.13956
- Southeast University Knowledge Graph graduate course source materials: https://github.com/npubird/KnowledgeGraphCourse
- Codejunkie99 Graph Engineering skill, terminology and nine-stage teaching adaptation, MIT: https://github.com/codejunkie99/graph-engineering
