---
name: brand-copy-steward
description: Route, create, and review user-facing product and marketing copy across landing pages, websites, onboarding, empty states, ads, emails, and applications. Use when words must establish a brand, make persuasive claims, translate reference-led direction into copy, avoid robotic or ultra-literal language, use the 100-year-copywriting-engine, audit AI-writing patterns, or keep provisional review notes separate from the rendered customer experience.
---

# Brand Copy Steward

Make copy persuasive, specific, human, truthful to its current stage, and recognizably on-brand.

## Routing

- Reference sites, audience shift, desired feeling, or reimagining: use `brand-direction` first.
- Marketing, landing pages, headlines, offers, ads, or emails: use `creative-director` or the approved brand direction first. Use `100-year-copywriting-engine` only when the user requests it or a direct-response framework is specifically useful; do not make it the default voice.
- Final robotic/formulaic writing pass: use `ai-writing-audit` after direction and persuasive force are established.
- Customer-facing AI persona: use `ai-brand-voice` after the business brand direction exists.

## Creative Posture

Create first; verify for production second.

During concept and preview work:

- Make strong positioning, promise, capability, and outcome claims that align with the brief.
- Prefer conviction over hedging.
- Push beyond the inferred comfort zone when the user asked for a bold client concept.
- Build the full copy architecture, including proof and feature sections that still need client content.
- Keep the rendered page pristine and persuasive.

Do not invent a named person, quotation, customer, certification, metric, or third-party endorsement and present it as confirmed fact. A preview may design those sections and propose claim-shaped copy, but unresolved proof belongs in `CLIENT_REVIEW.md`.

Facts published on a business-owned site or official business profile are source-supported for concept copy. Carry useful services, perks, seasons, owner names, awards, and certifications forward rather than treating them as inventions.

## Claim Handling

Use owner-supplied or owner-authorized ordinary qualitative positioning directly when it fits the offer and is not contradicted. Do not require substantiation, hedging, or a production blocker solely because non-quantified language about audience fit, approachability, ease, or experience is theoretically testable.

Keep three questions separate:

- Source support: did the business publish or supply the fact?
- Currentness: is a time-sensitive operating fact still accurate and consistent across authoritative sources?
- Asset authorization: may a badge, photo, logo, quotation, or other protected expression be reproduced?

Source support is enough to preserve a fact in concept copy. Resolve material conflicts and currentness before an owner demo or production release when the discrepancy could mislead or break conversion. Handle asset reuse through the visual provenance workflow. Do not delete a supported claim merely because one of the other questions remains open.

Apply the formal claim register only when the language creates a material truth dependency:

Classify proposed claims outside the page as:

- Positioning or brand promise: client approval.
- Experience or capability promise: implementation before production.
- Quantitative claim: evidence before production.
- Testimonial, customer, certification, or comparison: source, authorization, and current production proof as applicable.

If a claim cannot ship, recommend one of:

1. Prove it.
2. Build the capability that makes it true.
3. Adjust it without losing the core promise.
4. Remove it.

Never automatically turn strong copy into vague language such as "aims to", "may help", or "designed to support" merely because verification is pending.

Do not narrate speculative low-probability risk to the user or let it shape the rendered marketing copy.

## Copy Rules

- Lead with the reader's situation, desire, tension, or outcome.
- Benefits and transformation over internal features.
- Specificity over generality.
- Consumer language over internal jargon unless the audience uses the jargon.
- Each page and section must add a new reason to care.
- Do not narrate APIs, authentication mechanics, page structure, or implementation unless the customer needs that detail.
- Compliance supports the message; it does not automatically become the brand personality.
- Vary cadence. Write something a person would choose to say aloud.
- Cut copy that could appear unchanged on fifty unrelated sites.
- Never imply a production connection in the official production experience unless it exists.

## Clean Preview Rule

Never place these inside the rendered customer-facing experience:

- Claim verification flags.
- Placeholder or fixture labels.
- Image source notes.
- Audit tags.
- Developer comments.
- Implementation status.
- Internal uncertainty.

Put them in `CLIENT_REVIEW.md`. After concept approval, transfer production work into `DEPLOYMENT_READINESS.md`.

## Preserve Approved Voice

Record durable voice in `docs/brand/voice.md` or the project's approved direction. Include audience, promise, voice behaviors, do/don't examples, words to use/avoid, approved boldness, and product-specific patterns.

Later audits and implementation passes must flag conflicts rather than silently bleaching approved personality, rhythm, humor, or conviction.

