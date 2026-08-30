---
name: audience-boundary
description: Keep internal instructions, private reasoning, audit state, secrets, and simulation markers out of user-facing output. Use before shipping UI copy, APIs, emails, exports, and metadata. Not for judging whether copy is good.
---

# Audience Boundary

Treat clean public output as an architecture property, not a final copy edit. Decide what each audience may receive, trace data from source to sink, and enforce the boundary before polishing the words.

## Core Rule

Never expose system or developer instructions, private reasoning or scratch work, secrets, internal audit state, implementation commentary, or raw diagnostic data to an audience that is not authorized to receive it.

Do not send internal fields to a client and merely hide them with CSS. Remove them at the serialization, query, or view-model boundary.

## Audience Classes

Classify each artifact and field before implementation:

- `public`: intended for customers, visitors, recipients, or end users.
- `review`: client-facing review material such as approved preview notes and decisions.
- `delivery`: launch dependencies, deployment readiness, and operator handoff.
- `internal`: project memory, engineering notes, audit findings, logs, provenance, and implementation status.
- `restricted`: system/developer instructions, private reasoning, secrets, tokens, credentials, or private raw content.

An item may move to a broader audience only through an explicit transformation or approval. Renaming an internal field does not make its content public.

## Workflow

### 1. Declare the contract

State:

- the artifact and intended audience;
- the allowed source fields;
- prohibited source classes;
- the output sinks;
- who or what verifies the boundary.

For a detailed contract and examples, read [references/output-contract.md](references/output-contract.md).

### 2. Inventory output sinks

Inspect every path that can expose content, including:

- JSX, HTML, templates, text nodes, labels, placeholders, alt text, and ARIA descriptions;
- SEO metadata, structured data, localization files, public configuration, and source maps;
- email, SMS, push, chat, toast, notification, and user-safe error messages;
- API response schemas, client hydration payloads, view models, CMS fields, and generated-content schemas;
- PDFs, CSVs, downloads, exports, documentation, screenshots, and client-review artifacts.

### 3. Trace dangerous sources

Search upstream for:

- system prompts, developer prompts, planning notes, private reasoning, and scratch fields;
- audit tags, claim flags, confidence notes, moderation details, or reviewer commentary;
- prototype, fixture, simulation, provenance, model, or workflow status;
- TODOs, implementation notes, stack traces, raw provider errors, logs, and debug objects;
- secrets, tokens, credentials, environment values, private records, and unrestricted tool output.

Treat keyword searches as leads, not proof. Inspect how each value is created, transformed, serialized, and rendered.

### 4. Enforce separation structurally

Prefer explicit allowlists:

- public DTOs or view models contain only public fields;
- generated content separates `public_output` from `review_notes` and `internal_trace`;
- user-facing errors contain a safe message and optional correlation ID, while diagnostics stay server-side;
- preview and delivery truth lives in the appropriate artifact, not inside ordinary customer copy;
- internal status is transformed into user-relevant language only when the product intentionally exposes that status.

Never rely on hidden elements, client-side filtering, obscure property names, or prompt instructions alone as the boundary.

Never connect a raw model response, tool result, audit object, or agent message directly to a renderer. Project it through an allowlisted public schema on the server or trusted boundary. For implementation patterns, read [references/ui-integration-patterns.md](references/ui-integration-patterns.md).

For TypeScript or JSON applications, copy and adapt `assets/public-copy-boundary.template.ts` and `assets/public-copy.schema.template.json` rather than rebuilding the basic allowlist from memory.

### 5. Apply stage truth

- A concept or functional preview may use fixtures or simulations when clearly disclosed in review artifacts.
- Production dependencies and blockers belong in deployment-readiness artifacts.
- Ordinary public copy should not render internal stage labels, audit findings, claim flags, or build notes.
- If product users genuinely need a status, expose a deliberately designed and truthful user status rather than the internal workflow state.

### 6. Polish after the boundary is sound

Use this order when copy is involved:

1. Establish product truth, stage, and audience boundary.
2. Apply approved brand voice and the relevant copy specialist.
3. Run the AI-writing audit or humanization pass.
4. Recheck claims and no-theater evidence before publishing.

Generic style rules never outrank the approved voice, factual truth, or audience contract. Read [references/compatibility-routing.md](references/compatibility-routing.md) when external writing skills or rule packs are involved.

### 7. Verify the real exposure surface

Check both code and behavior:

- server query and serializer;
- network response and client hydration data;
- rendered DOM and accessibility tree;
- metadata, structured data, downloads, and generated files;
- sent email or notification previews;
- safe failure paths and production logging behavior.

Add focused tests that prove prohibited fields are absent, not merely invisible.

## Finding Format

Report a leak or boundary risk as:

```text
Finding: [short description]
Severity: low | medium | high | critical
Source: [where the data originates]
Sink: [where the audience can receive it]
Current audience: [class]
Allowed audience: [class]
Evidence: [path, field, render, response, or test]
Fix: [structural boundary change]
Verification: [how absence and intended behavior will be proved]
```

## Hard Stops

- Do not reveal or reconstruct private chain-of-thought. Provide a concise decision rationale when explanation is useful.
- Do not publish secrets or unrestricted private records.
- Do not disguise internal instructions as customer copy.
- Do not render raw model or agent responses. Render a validated public projection.
- Do not treat hidden UI as non-exposure when the client receives the data.
- Do not silently publish review or delivery artifacts.
- Do not flatten a distinctive approved voice through blanket bans on dashes, fragments, adverbs, passive voice, or other tokens. Judge the effect in context.

## Completion Standard

The work is complete only when the intended public or review artifact is clean, necessary internal truth remains available to its authorized audience, and tests or inspection prove restricted fields cannot reach the public sink.
