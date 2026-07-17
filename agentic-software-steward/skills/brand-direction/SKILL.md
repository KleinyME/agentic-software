---
name: brand-direction
description: Turn reference sites, an existing business or site, audience changes, desired feeling, and user-stated differences into a fresh, bold brand direction without a long branding interview. Use for prompts such as "build something like these sites but...", "reimagine this client site", "make this speak to a different audience", "define the voice quickly", "what style fits this business", or any client-facing site/app project that needs positioning before copy, imagery, or frontend implementation.
---

# Brand Direction

Create enough direction to build a distinctive client-review preview. Research first, ask only questions that change the result, and make provisional assumptions when choices are reversible.

## Operating Posture

- Treat reference sites as grounding, not templates.
- Treat an existing client site as evidence, not creative authority.
- Let business type inform the direction without forcing an industry stereotype.
- Prefer one strong coherent direction over a committee-safe average.
- During concept work, push beyond the inferred comfort zone. Client review is where boldness is accepted, refined, or walked back.
- Separate creative generation from production verification. Do not weaken preview copy merely because a claim still needs confirmation.
- Never put internal notes, claim flags, placeholder labels, or implementation status inside the customer-facing page.

## Inputs

Use what the user already supplied. Useful inputs are:

- Existing business, site, repo, products, services, and proof.
- One to three reference sites.
- What feels right about each reference.
- What must be different.
- Intended audience or audience shift.
- Desired feeling and perception.
- Primary action or business outcome.
- Facts, constraints, and non-negotiables.

Do not force a questionnaire. If product, audience, goal, references, differences, and feeling are sufficiently clear, produce the direction immediately. Otherwise ask one high-leverage question at a time, with a reasonable default.

## Workflow

### 1. Establish Truth

Inspect available sources and extract only:

- Known business facts.
- Real products, services, people, places, processes, and proof.
- Current customer journey and working functionality.
- Legal or operational constraints.
- Facts that require client confirmation.

Label facts as `known`, `inferred`, `client-stated`, or `open`.

### 2. Analyze References

For each reference, record:

- What to borrow: tone, hierarchy, density, image treatment, rhythm, trust signals, or interaction model.
- What to avoid.
- What would be inappropriate to copy.
- How the new brand will differ.

Do not copy wording, layouts, visual assets, or distinctive expression. Read `references/anti-anchoring.md` for redesign and reference-led work.

### 3. Create The Direction

Produce a primary direction and, when useful, one bolder stretch direction. Define:

- Audience and their situation.
- Desired perception.
- Central promise.
- Positioning and meaningful difference.
- Three voice behaviors with concrete examples.
- Three messaging pillars.
- Emotional register.
- Visual register.
- Words, patterns, and category cliches to avoid.
- Anti-references: what the brand must not feel like.
- A sample headline, paragraph, and call to action.

Avoid adjective-only direction such as "modern, trustworthy, premium." Translate each trait into observable writing and design behavior.

### 4. Generate Strong Claims

Marketing claims are allowed and expected in concept previews. Generate the strongest coherent claims that align with the business and desired outcome.

Use owner-approved ordinary qualitative positioning directly. Non-quantified language about audience fit, approachability, ease, or experience does not enter the proof register merely because it could theoretically be tested.

Classify proposed claims outside the page:

- `positioning`: needs client alignment.
- `brand-promise`: needs client approval.
- `experience-promise`: needs a real content or service workflow before production.
- `capability`: needs implementation before production.
- `quantitative`: needs evidence before production.
- `social-proof`: needs authorized proof before production.
- `certification-or-comparison`: needs confirmation or evidence before production.

Record claim status in `CLIENT_REVIEW.md`; never annotate or hedge the rendered copy. Use `proposed`, `client-approved`, `proof-required`, `implementation-required`, `verified`, `production-approved`, or `remove-or-rewrite`.

### 5. Hand Off Cleanly

Provide:

1. A concise brand direction suitable for `PRODUCT.md`, `docs/brand/voice.md`, or the client artifact store.
2. The approved direction and unresolved decisions for `CLIENT_REVIEW.md`.
3. Production dependencies for `DEPLOYMENT_READINESS.md` only after creative approval.
4. Direction for `brand-copy-steward`, `visual-direction`, and frontend design.

The client-facing preview must remain visually complete and persuasive.

## Approval Boundary

Concept approval means the client approves the intended audience, look, feeling, layout, copy, claims, and customer journey. It does not mean the backend or integrations are production-connected.

After approval, preserve the chosen boldness and personality. Later copy audits, implementation passes, and release hardening must flag conflicts instead of silently bleaching the direction.

Record the direction as `provisional`, `approved`, `rejected`, or `superseded`, with exact scope and approval evidence. Existence, implementation, screenshots, and repeated reuse do not constitute approval.
