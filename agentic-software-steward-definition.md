# Project Steward Suite

## Purpose

Make agents capable of turning a client's intention, references, existing materials, and desired outcome into a truthful, distinctive, beautiful, working experience that can be reviewed, connected to real production resources, safely promoted, and understood by the next agent or human.

The suite is not a documentation generator, a copy encyclopedia, or a second control plane. It is one delivery workflow with specialist skills.

Within that suite, Agentic Software Steward provides the technical execution harness. It:

- Asks non-technical users about intention, not implementation trivia.
- Translates intention into architecture, risk, design, security, copy, verification, and handoff.
- Prefers smaller real vertical slices over larger fake or unwired features.
- Detects evidence-backed automation and exponential-leverage opportunities without forcing AI, graphs, an MTP, or organizational transformation onto ordinary software.
- Broadens what agents may notice and suggest without silently broadening execution authority; uses bounded non-obvious option passes and read-only workflow-friction observation only when the situation qualifies.
- Operates by the Reckless AI contract: strong reversible decisions proceed without permission theater, while consequential effects remain bounded by per-action authority or an accepted deterministic policy envelope.
- Acts as the lead technical identity for a five-layer Agentic Software Harness, with optional charter-governed CEO, COO, and Marketing roles activated by Hermes and informed by OB1/OpenBrain.
- Preserves project memory in the repository so future agents and human engineers can understand why the software exists, how it works, and how it can break.
- Uses specialist skills for UI/UX, design systems, brand voice, and copywriting instead of one giant overloaded skill.

## North-Star Loop

```text
Intent and evidence
-> brand direction and business-specific evidence
-> distinctive structure, copy, typography, and imagery
-> bold clean preview
-> client refinement and approval
-> production connection
-> promotion and live verification
-> durable memory
```

## Agentic Harness Architecture And Research Basis

Within the technical execution lane, the lead skill is:

```text
software-steward
```

Use `project-steward` as the neutral front door for mixed or ambiguous work. Use "senior architect" as a role inside the technical lane, but the package should feel broader than one engineer. It is a project stewardship operating system for agent-built software.

The current package is a skill-based instruction harness, not yet a durable software-factory runtime. Factory infrastructure and capability claims must be earned by repeatable workflow evidence.

## Research Inputs To Encode

The suite should encode operating habits from these sources:

- Impeccable: use `PRODUCT.md` and `DESIGN.md`, distinguish brand vs product UI, shape before craft, use browser inspection and polish loops. Source: https://github.com/pbakaus/impeccable
- Google DESIGN.md: keep machine-readable design tokens plus human-readable rationale in a root `DESIGN.md`; tokens are the normative values and prose explains application. Source: https://github.com/google-labs-code/design.md
- Senior engineer handbook: senior engineering combines communication, software design, system design, reliability, UX, leadership, and technical writing. Source: https://github.com/jordan-cutler/path-to-senior-engineer-handbook
- C4 model: use system context, container, component, and code views as lightweight architecture mapping levels. Source: https://c4model.com/
- arc42: document goals, constraints, context, building blocks, runtime, deployment, decisions, risks, and glossary. Source: https://arc42.org/overview
- Architecture Decision Records: keep small, modular decision records for architecturally significant decisions, with context, decision, status, and consequences. Source: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- OWASP ASVS: use a real security verification standard for web application controls. Source: https://owasp.org/www-project-application-security-verification-standard/
- NIST SSDF: treat security as part of the software development lifecycle, not a late cleanup step. Source: https://csrc.nist.gov/pubs/sp/800/218/final
- Microsoft threat modeling: define security requirements, diagram the application, identify threats, mitigate them, and validate mitigations. Source: https://www.microsoft.com/en-us/securityengineering/sdl/threatmodeling
- Twelve-Factor App: declare dependencies, store config in the environment, separate build/release/run, keep dev/prod parity, treat logs as event streams. Source: https://12factor.net/
- Google SRE SLOs: define what users care about before choosing operational metrics. Source: https://sre.google/sre-book/service-level-objectives/
- DORA Four Keys: use deployment frequency, lead time, time to restore, and change failure rate as delivery health signals when deployments exist. Source: https://github.com/dora-team/fourkeys
- Practical Test Pyramid: use balanced automated tests and acceptance tests that prove user behavior works. Source: https://martinfowler.com/articles/practical-test-pyramid.html
- Google Research agent-scaling study: use multi-agent coordination for genuinely parallelizable work, keep sequential reasoning in one agent, and prefer a central coordinator for error containment. Source: https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/
- Anthropic multi-agent engineering: use parallel workers for breadth-first independent work, central synthesis, explicit budgets, observability, and evaluation; account for materially higher token cost. Sources: https://www.anthropic.com/engineering/multi-agent-research-system and https://www.anthropic.com/engineering/building-effective-agents
- GraphRAG-Bench and Zep/Graphiti: route retrieval by question type, test graph retrieval against simpler baselines, and attach time plus provenance to mutable agent memory. Sources: https://arxiv.org/abs/2506.05690 and https://arxiv.org/abs/2501.13956
- Hermes Agent memory and automation suggestions: preserve compact user preferences in user memory, keep project candidates outside always-loaded memory, deduplicate suggestions, and require explicit acceptance before scheduling. Sources: https://hermes-agent.nousresearch.com/docs/user-guide/features/memory and https://hermes-agent.nousresearch.com/docs/developer-guide/creating-skills
- Superpowers engineering disciplines: investigate root cause before fixing, require fresh verification before completion claims, review requirements separately from code quality, evaluate feedback technically, and use worktree isolation only when it serves the workflow. Adapt these ideas to situation-aware stewardship instead of adopting mandatory ceremony. Source: https://github.com/obra/superpowers/tree/main/skills
- OpenExO 3.0 and The Organizational Singularity: keep destination architecture (MTP + DRIVE + SHAPE), the PURPOSE-to-LEARN Intelligence Stack, and the REWRITE migration playbook separate; use machine-readable purpose constraints, explicit decision authority, recursive learning, safe autonomy, human accountability, and one-workflow proof. Apply the framework conditionally, version-check it against official sources, and treat the public book chat as exploratory rather than canonical. Sources: https://openexo.com/exo-model-3 and https://openexo.com/organizational-singularity
- Humanizer: use voice-sample precedence, no-fabrication rules, pattern diagnosis, and a second post-rewrite audit for general prose; keep token-level preferences subordinate to approved project voice. Source: https://github.com/blader/humanizer
- Stop Slop: use its compact pattern rules only as an opt-in strict stress test; do not universalize blanket bans on adverbs, passive voice, fragments, em dashes, or sentence openings. Source: https://github.com/hardikpandya/stop-slop
- Agent Style: use its reader-context and clarity disciplines for technical prose such as docs, papers, runbooks, commits, and errors; respect its stated exclusion of marketing and narrative work. Source: https://github.com/yzhao062/agent-style
- MarketingSkills: route to the smallest relevant marketing specialist after product and brand context exists; do not load the entire collection or let conversion guidance authorize fabricated claims. Source: https://github.com/coreyhaines31/marketingskills
- Diataxis: keep docs focused by separating tutorials, how-to guides, reference, and explanation. Source: https://diataxis.qubitpi.org/
- OpenSSF Scorecard and SLSA: use dependency and supply-chain checks as optional hardening layers for serious projects. Sources: https://openssf.org/projects/scorecard/ and https://slsa.dev/

## Current Skill Package Structure

The checked-in tree and plugin manifest are the authority for what ships. Do
not keep aspirational paths in this definition or present an optional companion
as bundled capability.

```text
agentic-software-steward/
  .codex-plugin/plugin.json
  skills/
    project-steward/
    creative-director/
    software-steward/
      references/
        agentic-harness-model.md
        executive-operating-loop.md
        intent-situation-kernel.md
        non-obvious-option-pass.md
        validation-scenarios.md
    workflow-automation-architect/
    graph-engineering/
    exponential-strategy/
    diagnosing-bugs/
    intent-aligned-review/
    evidence-before-completion/
    audience-boundary/
    brand-copy-steward/
    100-year-copywriting-engine/
    ai-writing-audit/
    ...other focused skills listed in README.md and plugin.json
  third_party/
  README-for-humans.md
hermes-runtime-skills/
scripts/
  validate-skill-suite.ps1
  sync-skills.mjs
```

Keep specialists modular. `100-year-copywriting-engine` is the bundled direct-
response and campaign specialist. Impeccable remains an optional companion.
Load either only when the routed work warrants it.

## Execution routing

Executable routing lives in [project-steward](agentic-software-steward/skills/project-steward/SKILL.md) for mixed work and [software-steward](agentic-software-steward/skills/software-steward/SKILL.md) for technical delivery. Use the smallest relevant route; these skills own stage selection, specialist activation, and verification. This definition does not add a second universal preflight or mandatory sequence.

## Core Principles

### Ask For Intention

Research first. Ask humans about audience, desired feeling, meaningful differences, business outcome, non-negotiables, and approval. Let agents handle implementation choices.

For reversible choices, state assumptions and build. Tangible previews are easier to refine than long abstract interviews.

### Create Boldly, Promote Precisely

Concept work should be persuasive and ambitious. Strong claims, realistic fixtures, simulated workflows, provisional imagery, and complete intended UI are allowed in client-review previews.

Production promotion is a separate gate. Before production, resolve claims, proof, content, real backends, auth, payments, forms, APIs, workers, credentials, ownership, and verification.

Apply the same asymmetry outside visual work: think aggressively, test
reversibly, and place caution at the actual side-effect boundary. A repeated
consequential action may use an owner-accepted deterministic policy gate instead
of per-instance human approval, but only within its versioned scope, evidence,
budget, assurance, sampling, pause, and revocation rules.

Unapproved work remains on feature branches and in non-production review environments. A stable `preview` branch is a movable pointer to one exact review candidate, not an editable work branch. Approval attaches to that commit and its evidence; production receives only that exact approved commit, and later changes require renewed approval.

### Keep Review Notes Off The Page

The customer-facing preview must remain visually complete. Put proposed claims, simulated functionality, provisional assets, and open decisions in `CLIENT_REVIEW.md`. Put production implementation and verification in `DEPLOYMENT_READINESS.md`.

### Treat Existing Work As Evidence

For redesigns, extract facts and useful assets, then reimagine from a blank page. Do not preserve weak copy, section order, or visual patterns merely because they already exist.

### No Theater By Stage

No-theater does not ban prototypes. It prevents the suite from calling simulated or sandbox behavior production-verified. Track each capability as simulated, fixture, sandbox, connected, verified, or not required.

### Prove Visual Quality

Do not explain why a site is beautiful. Establish a business-appropriate direction, implement it, inspect desktop and mobile screenshots, and polish the rendered result.

## Skill Roles

### Lead

- `project-steward`: neutral routing by work stage, primary craft, authority, freedom zone, and conditional risk overlays.
- `creative-director`: lead authority for blank-page invention, brand, marketing, visual and industrial design, and physical or on-screen appearance.
- `software-steward`: lead authority for implementation, architecture, persistent identity, data, protocol integration, runtime behavior, tests, and technical hardening.

### Direction And Communication

- `brand-direction`: reference-led positioning, audience, feeling, differences, anti-anchoring, and provisional claims.
- `design-distinctiveness`: business vernacular, customer-job page physics, typographic specificity, and batch anti-sameness review.
- `visual-direction`: business-appropriate style, client asset collection, generated imagery, and image placement.
- `brand-copy-steward`: persuasive human copy, claim handling, and clean preview separation.
- `100-year-copywriting-engine`: optional creative accelerator for headlines, offers, frameworks, and strong claims.
- `ai-writing-audit`: context-aware final editorial pass that preserves approved voice.
- `ai-brand-voice`: assistant/chatbot persona built from an existing brand direction.

### Product And Engineering

- `lean-product-architect`: smallest real business loop and deletion-first small-product architecture.
- `senior-architect`: durable architecture for complex, expensive-to-reverse systems.
- `repo-foundation-bootstrap`: working-truth audit and minimum useful project foundation.
- `project-memory-steward`: durable intention, architecture, operating truth, and reusable learning.

Engineering roles protect named technical invariants. They do not chair creative work or promote an existing design into an approved constraint merely because it is implemented.

### Truth, Safety, And Delivery

- `no-theater-software`: stage-aware simulation and production truth.
- `security-data-safety`: permissions, sensitive data, destructive actions, and external writes.
- `environment-and-release`: preview, sandbox, production resources, credentials, and environment boundaries.
- `environment-and-release`: branch discipline, promotion, live baseline preservation, rollback, and proof.

### Design

- Installed frontend/design specialists own distinctive implementation, adaptation, polish, accessibility, and responsive QA.
- `design-system-steward` preserves project-local product and design memory and acts as fallback guidance.

## Client Experience Stages

### Concept Preview

Approve audience, positioning, look, feeling, layout, copy, proposed claims, imagery, and intended customer journey.

Allowed: complete simulated flows, realistic fixtures, proposed proof sections, generated imagery, and bold claims.

### Functional Preview

Exercise real frontend behavior using deterministic fixtures, local adapters, or sandbox services. Prove critical states and one narrow vertical slice.

### Production Candidate

Connect required client-owned content, accounts, data, auth, payments, forms, APIs, workers, monitoring, domains, and credentials. Resolve deployment-readiness blockers.

### Production Verified

Promote to the official target and exercise the promised workflow against production resources. Record evidence and rollback.

## Required Review Artifacts

Create only when relevant:

- `CLIENT_REVIEW.md`: plain-language client decisions, claims, imagery, provisional content, and simulated functions.
- `DEPLOYMENT_READINESS.md`: production resources, owners, blockers, tests, and verification.
- `PRODUCT.md`, `DESIGN.md`, and `docs/brand/voice.md`: durable product, visual, and voice direction.
- `PROJECT_MEMORY.md`: working truth, architecture, commands, risks, and recent meaningful changes.

## Validation Bar

The suite succeeds when it can:

- Turn sparse reference-led input into a distinctive direction without a long interview.
- Reimagine an existing site without anchoring to its current expression.
- Generate bold marketing copy without hedging every claim.
- Keep claim and simulation notes outside the rendered page.
- Select and produce imagery that fits the business and brand.
- Build a complete review preview without pretending it is production.
- Convert approval into a concrete production checklist.
- Preserve the official live baseline while promoting verified work.
- Leave evidence and memory that help the next contributor move faster.
