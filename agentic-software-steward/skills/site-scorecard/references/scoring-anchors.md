# Scoring Anchors

Score each dimension 0–10 against these anchors. Interpolate between bands.
Cite the observed evidence for every score. Dimension ids match the
`visibility_blueprint_v3` contract exactly.

## first_glance_clarity — First-Glance Clarity

Five seconds, phone width, cold visitor.

- 9–10: Who, what, where, and the next action all land instantly. The headline carries business-specific meaning, not category filler.
- 7–8: Who and what are instant; the action or location takes a beat or one scroll.
- 5–6: The business type is clear but requires reading or scrolling; the headline could top any competitor's site.
- 3–4: Template copy or decoration obscures the business; a visitor must hunt for what is offered.
- 0–2: A cold visitor cannot tell what the business is or does.

## design_communication — Design Communication

Does the visual language say something true about this business?

- 9–10: Direction demonstrably derived from real artifacts (signage, paperwork, product, place); passes the Only-This-Business test at the hero level.
- 7–8: Fits the industry and feels intentional; some elements are borrowed generics.
- 5–6: Pleasant but interchangeable within the industry — a costume, competently worn.
- 3–4: Template aesthetic; the design says nothing about this business.
- 0–2: The aesthetic contradicts the business (luxury dressing on a budget service, corporate polish on a family shop).

## owner_pride — Owner Pride

Would the owner show this to a customer? Would it go on the truck?

- 9–10: The owner's own story, people, and work lead the page; the reaction is "they saw us."
- 7–8: The business is recognizable, but its trophies — the invention, the award, the perk, the people — are missing or buried.
- 5–6: Accurate but anonymous; nothing to point at with pride.
- 3–4: Generic to the point of embarrassment, or carries errors the owner would spot.
- 0–2: Misrepresents the business.

## trust_and_proof — Trust And Proof

Earned evidence, verifiable facts, zero theater.

- 9–10: Layered real proof — authentic photography, named people, certifications, reviews or links to them — with contact facts verified against official sources.
- 7–8: Solid real proof with minor gaps (e.g. reviews exist but are not surfaced).
- 5–6: Claims without evidence; trust asserted rather than shown.
- 3–4: Stock imagery passing as real work, or internal contradictions in the business's own facts.
- 0–2: Fabricated proof. Any invented review, credential, price, or quoted statement attributed to a real person caps this dimension at 2 and is a presentation blocker.

## mobile_experience — Mobile Experience

Judge at 390px, as feel, not just absence of overflow.

- 9–10: Designed mobile-first; primary action persistently in thumb reach; fast; type comfortable.
- 7–8: Clean and usable with minor friction (long taps to action, dense sections).
- 5–6: Works, but is a desktop layout surviving on a phone.
- 3–4: Horizontal overflow, tap-target failures, or unreadable type anywhere.
- 0–2: Functionally broken on a phone.

## ai_readability — AI Readability

Can a machine read it, and does the structure give each customer question an address?

- 9–10: Fetchable without obstruction; semantic HTML; every page has a distinct title and description; major customer questions (offering, hours, location, signature item, how to convert) each resolve at their own URL; key facts live in text, not images.
- 7–8: Clean, readable structure; some major questions share one page or lack a stable address.
- 5–6: Readable but monolithic — one URL for the whole business; anchors instead of pages.
- 4 and below: Award no more than 4 if any of these hold, choosing the band by severity: facts contradict themselves within the property; content is only in images; robots or headers block reading on a property meant to be read. 0–2 means effectively invisible to machines.

This dimension must cite the record's instrument checks (`citedChecks`) as its
hard evidence — the machine lane already measured fetchability, robots,
schema, and structure. The judgment adds the question-address assessment.

## Applying The Anchors To Both Sources

On preview runs, the live site and the concept are scored against the same
bands. Expect asymmetry: live sites typically hold Trust and Proof advantages
(real reviews, real photos, established conversion paths) while losing
Clarity, Design Communication, and AI Readability. Report the asymmetry as
found — the production recommendation is almost always "the concept's
structure plus the live site's proof," and honest scoring is what makes that
recommendation land.
