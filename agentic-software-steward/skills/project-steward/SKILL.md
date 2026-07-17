---
name: project-steward
description: Neutral orchestration for projects that mix creative, product, technical, data, hardware, and release work. Use when deciding which discipline should lead, when a request combines visual invention with protected technical truth, or when carrying a website, application, physical interface, data workflow, or device experience from concept through implementation without letting engineering caution suppress creative work or creative freedom damage real invariants.
---

# Project Steward

Route the work before loading a professional temperament. The primary craft chairs the current pass. Supporting disciplines may protect named invariants, but they must not take over the task.

## Core Rule

Classify the requested deliverable, not the project noun and not the agent's historical role.

- A software repo can contain a pure visual-direction task.
- A marketing site can contain a strict identity, payment, or deployment task.
- A vehicle display can require free visual invention and exact protocol truth at the same time.

Do not describe the entire user or project as `proof-first`, `creative`, `technical`, `regulated`, or `high-risk`. Apply those postures only to the affected work.

## Internal Route Card

Create this card internally before meaningful planning or edits. Show it only when it helps the user understand a real boundary.

```text
Stage: explore-invent | choose-direction | design-behavior | implement | diagnose | validate | release-operate
Primary craft: brand-marketing | visual-industrial | product-interaction | domain-data | device-protocol-hardware | platform-runtime | release-operations
Supporting crafts: [only those needed]
Freedom zone: [what may be reinvented]
Protected invariants: [facts or behaviors that must remain true]
Deferred gates: [checks that belong to a later stage]
Proof target: [what proves this pass succeeded]
```

Infer the card from the requested outcome. Do not ask the user to choose a lane unless the intended deliverable is genuinely unclear and different answers would produce materially different work.

## Route By Stage

- `explore-invent`: generate possibilities without production hardening.
- `choose-direction`: select a coherent concept using audience, product, and owner taste.
- `design-behavior`: define experience, interaction, states, and information hierarchy.
- `implement`: build the chosen result.
- `diagnose`: determine why existing behavior fails; do not silently expand into redesign or repair.
- `validate`: test the relevant visual, behavioral, data, protocol, or operational claims.
- `release-operate`: promote an accepted result and verify the official target.

Do not run release gates during concept generation. Do not reopen an approved creative direction during release unless there is evidence of a defect or the user asks.

## Route By Primary Craft

- Brand, marketing, copy, visual appearance, art direction, and physical/digital instrument appearance: use `creative-director`.
- Product behavior and interaction: use the relevant frontend/product-design specialist, with `creative-director` when appearance or personality is material.
- Code, architecture, persistence, identity, concurrency, auth, and runtime behavior: use `software-steward`, `lean-product-architect`, or `senior-architect` as appropriate.
- CAN, electrical, protocol, device, and hardware truth: use the domain sources and technical specialist; keep experimental, confirmed, and production-proven facts distinct.
- Production promotion and live verification: use `release-steward` and `live-environment-steward`.

Use one primary craft per pass. Split a mixed request into connected passes when simultaneous context would let one discipline distort another.

## Conditional Risk Overlays

Activate an overlay only when the artifact or action being changed crosses its boundary:

- Data integrity and identity.
- Authentication, privacy, or secrets.
- Physical actuation or electrical safety.
- Regulated commerce, payments, or sensitive claims.
- Destructive or production mutation.

An overlay supplies the minimum protected invariants, verification, and approval boundary. It does not set the visual tone, rewrite ordinary marketing language, or import every historical risk from the project.

Project association is not activation. A peptide project's visual concept does not automatically require payment-policy analysis. A resin-kit lifestyle image does not automatically require SDS review. A Parts Syndicate homepage does not need assembly-collision context unless the page reads or changes that identity. A SmartDash gauge concept needs truthful source-state and scale constraints, not a protocol audit of every visual choice.

Do not place owner-approved ordinary qualitative language such as `No experience required` into a proof or deferred-verification gate. Evidence gates belong to quantified, regulated, guaranteed, comparative, precise unconfirmed, or factual social-proof claims.

## Authority And Maturity

Classify inputs by authority:

- `hard constraint`: explicitly required to remain.
- `product truth`: real offer, behavior, audience, asset, or operating fact.
- `taste signal`: stated attraction, rejection, feeling, or preference.
- `inspiration`: evidence that may influence the result.
- `disposable draft`: rough sketch, old layout, exploratory palette, provisional copy, competitor example, or earlier agent output.

Classify durable decisions independently:

- `disposable`
- `provisional`
- `approved`
- `rejected`
- `superseded`

Record scope, approver, date, and replacement when applicable. A file named `DESIGN.md`, a live implementation, or a detailed earlier plan is not approved merely because it exists. If visual authority metadata is absent, treat the direction as provisional during reimagination. Technical invariants and aesthetic direction may have different authority states.

## Mixed-Work Sequence

For work that genuinely blends disciplines:

1. Give the primary craft only the product truths, taste signals, and named invariants it needs.
2. Produce or choose the result in the freedom zone.
3. Freeze the selected expression at its actual authority state.
4. Create a narrow integration contract:
   - inputs and source of truth;
   - outputs;
   - permitted mutations;
   - forbidden mutations;
   - error, stale, unavailable, and recovery behavior when relevant.
5. Implement through that contract.
6. Validate expressive quality and technical correctness separately.

Do not make the creative pass read an entire database incident history. Do not let the engineering pass casually reinterpret the accepted visual intention.

Examples:

- Beautiful inventory tag: visual-industrial leads; stock identity and QR payload are protected; `assembly_uuid` is outside the freedom zone.
- SmartDash gauge: visual-industrial leads appearance; checked channel source, units, scales, stale state, warnings, and live/replay/demo labeling are protected.
- Client-site redesign: creative direction leads; real offer and working links are protected; accessibility and production hardening occur after the direction is reviewable unless they block review.

## Progressive Memory

Read the project front door, then load only memory relevant to the current stage, craft, and overlays. Do not preload every operational risk, archive, rejected design, or historical incident into a creative task.

Use `project-memory-steward` to keep:

- approved direction separate from provisional and rejected work;
- verified technical truth separate from inference;
- protected invariants discoverable without making them the project's personality;
- deep lane-specific material behind a concise front door.

For forward testing, read `references/routing-regression-cases.md`.

## Completion

Complete the requested stage. Report the result, relevant proof, protected invariants, and the next genuine gate. Do not burden the handoff with risks that were not activated by the work.
