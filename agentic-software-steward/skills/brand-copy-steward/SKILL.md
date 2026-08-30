---
name: brand-copy-steward
description: Create and review user-facing product copy: pages, onboarding, empty states, labels, buttons, errors, emails. Use whenever visible words in a UI change. Not for long-form ads; use 100-year-copywriting-engine.
---

# Brand Copy Steward

Make every visible word intentional, useful, truthful to the product's current stage, and recognizably on-brand. Treat copy as part of product behavior, not decoration added after a component is built.

## Automatic UI Rule

Apply this skill to every newly created or materially changed user-facing surface even when the user did not explicitly request copywriting. This includes navigation, headings, labels, buttons, forms, helper text, onboarding, empty/loading/success/error/permission states, notifications, emails, exports, metadata, generated content, and marketing or checkout pages.

Do not let a coding agent fill the UI with generic copy merely because the component needs text.

## Read Existing Context First

Read `PRODUCT.md`, approved brand or creative direction, `docs/brand/voice.md`, current customer-facing copy, and source-backed product facts when available.

When positioning, audience, customer language, proof, or conversion intent is missing, read [references/product-marketing-context.md](references/product-marketing-context.md). Reuse repository-native memory rather than creating duplicate context. Ask only for missing intent that would change the message, authority, claim, or action.

For serious sales or campaign copy, read
[references/buyer-language-evidence.md](references/buyer-language-evidence.md).
Build a dated evidence model from real business language until the writer can
predict the next material objection. Preserve source, awareness stage,
uncertainty, contradictions, and public-use boundaries; do not fill gaps with a
fictional persona.

## Route By Surface

- Reference-led concept, audience shift, desired feeling, or reimagination: use `brand-direction` and `creative-director` first when available.
- Blank-page marketing, direct response, offers, campaigns, headlines, ads, or sales emails: use `100-year-copywriting-engine` when its framework expertise is useful. Do not make it the automatic voice.
- Existing marketing copy: use [references/copy-production-workflow.md](references/copy-production-workflow.md), then `ai-writing-audit`.
- Product UI and transactional copy: prioritize task clarity, next action, consequence, and recovery. Use brand personality at a lower intensity than campaign copy.
- Public or generated output: use `audience-boundary` before implementation and final delivery.
- Technical prose: use technical-writing guidance rather than forcing marketing rules onto it.

## Copy Production Workflow

### 1. Establish The Message Contract

State the audience and situation, artifact and channel, one primary action, central promise or outcome, verified proof and source facts, approved voice behaviors, and what the copy must not imply.

### 2. Separate Truth From Invention

Classify material inputs as:

- `confirmed`: approved by the owner or an authoritative current source;
- `source_supported`: published by the business and usable for concept work;
- `inferred`: plausible but not approved as a public claim;
- `open`: missing or conflicting;
- `prohibited`: fabricated, private, restricted, or not authorized for publication.

Do not create specificity by inventing metrics, customers, quotes, prices, deadlines, guarantees, awards, integrations, or capabilities.

### 3. Create Direction Before Polishing

When direction is unresolved, explore two or three distinct message concepts. Change the promise, tension, proof, or point of view, not only wording. When direction is approved, write the complete copy architecture in one coherent voice.

### 4. Review In Focused Passes

Review strategy, clarity, voice, value, proof, specificity, and friction. Keep edits reversible and explain meaningful changes. Then use `ai-writing-audit` without bleaching approved rhythm, humor, boldness, or persuasion.

### 5. Enforce The Public Boundary

Only approved public copy may enter UI components, public API responses, metadata, CMS publish fields, emails, or exports.

Never render prompts, private reasoning, copy rationales, framework names, audit labels, claim flags, reviewer notes, implementation status, fixture notes, developer commentary, or raw model/tool output. Keep review and delivery information in designated artifacts; do not hide it in DOM attributes or client payloads.

### 6. Verify The Actual Experience

Inspect the rendered surface and underlying payload. Verify every state has intentional copy; copy matches real actions and permissions; no placeholder or assistant residue remains; claims match the current stage; no internal field reaches the client; and mobile, accessibility, truncation, and localization remain usable.

## Claim Handling

Keep source support, currentness, and asset authorization separate. Source support is enough to preserve a fact in concept copy. Resolve material conflicts and time-sensitive facts before owner demo or production when they could mislead or break conversion.

Use owner-supplied ordinary qualitative positioning when it fits and is not contradicted. Apply formal proof requirements to material dependencies such as metrics, testimonials, comparisons, certifications, guarantees, deadlines, prices, and capabilities.

If a claim cannot ship: prove it, build the capability, adjust it without losing the central promise, or remove it. Do not automatically turn strong preview copy into vague hedging. Keep unresolved proof outside the rendered copy and resolve it before production.

## Product UI Standards

- A button names the action or value received.
- Helper text resolves a likely question rather than narrating implementation.
- Empty states explain what happened and provide a useful next step.
- Errors say what the user can do next; diagnostics remain internal.
- Confirmations state what changed and any important consequence.
- Permission copy names the boundary without exposing security internals.
- Loading copy does not promise completion the system cannot guarantee.
- Destructive actions make scope and reversibility clear.

## Clean Output Package

For implemented copy, separate `public_copy`, `review_notes`, `implementation_map`, and `test_hypotheses`. Only `public_copy` may reach the rendered surface. The implementation map may identify destinations but must not be displayed.

## Brand Memory

Record durable voice in `docs/brand/voice.md` or the approved project direction. Include audience, promise, voice behaviors, do/don't examples, approved boldness, customer language, and product-specific microcopy patterns. Later editing and implementation passes must flag conflicts rather than silently flattening the approved voice.

## Completion Standard

Copy is complete only when the user-facing words work in the real interface or channel, claims match current truth, internal material is structurally excluded, and a final contextual writing audit has run.
