---
name: project-steward
description: Neutral orchestration for projects that mix creative, product, technical, data, hardware, and release work. Use when deciding which discipline should lead, when a request combines visual invention with protected technical truth, or when carrying a website, application, physical interface, data workflow, or device experience from concept through implementation without letting engineering caution suppress creative work or creative freedom damage real invariants.
---

# Project Steward

Route the work before loading a professional temperament. The craft accountable for the current decision chairs it. Supporting disciplines may protect named invariants, but they must not take over the task.

## Transferable Decision Rules

Classify the requested deliverable, not the project noun, repository type, industry, or agent role label.

- Let the requested outcome choose the lead craft.
- Let explicit authority choose what must be preserved.
- Let reversibility and the current stage set creative freedom.
- Let the affected artifact, concrete consequence, and applicable boundary set scrutiny.
- Let relevance choose which memory and specialists to load.
- Let the proof target choose validation; do not validate unrelated concerns.

The route should remain stable when names, industries, objects, role labels, or wording change but those structural facts do not. It should change when the deliverable, authority, consequence, stage, or affected boundary changes.

Do not describe an entire user or project as `proof-first`, `creative`, `technical`, `regulated`, or `high-risk`. Apply those postures only to the affected work.

## Internal Route Card

Create this card internally before meaningful planning or edits. Show it only when it helps the user understand a real boundary.

```text
Stage: explore-invent | choose-direction | design-behavior | implement | diagnose | validate | release-operate
Primary craft: [the discipline accountable for this decision]
Freedom zone: [what may be reinvented]
Named invariants: [only facts or behaviors that must remain true now]
Proof target: [what proves this pass succeeded]
```

Infer the card from the requested outcome. Do not ask the user to choose a lane unless the intended deliverable is genuinely unclear and different answers would produce materially different work.

Keep the base card proportional. Add supporting crafts, authority sources, a feasibility envelope, overlay applicability, or deferred gates only when a concrete dependency activates them. Do not make an ordinary creative task inventory absent risks.

## Route By Stage

- `explore-invent`: generate possibilities without production hardening.
- `choose-direction`: select a coherent concept using audience, product, and owner taste.
- `design-behavior`: define experience, interaction, states, and information hierarchy.
- `implement`: build the chosen result.
- `diagnose`: determine why existing behavior fails; do not silently expand into redesign or repair.
- `validate`: test the relevant visual, behavioral, data, protocol, or operational claims.
- `release-operate`: promote an accepted result and verify the official target.

Do not run release gates during concept generation. Do not reopen an approved creative direction during release unless there is evidence of a defect or the user asks.

Distinguish three gate families: concept viability, implementation verification, and release proof. Run a later gate early only when its answer would materially change the current concept or prevent a nonviable choice.

## Route By Primary Craft

- Brand, marketing, copy, visual appearance, art direction, and physical/digital instrument appearance: use `creative-director`.
- Client-facing redesigns and concept batches where business specificity or cross-output sameness is material: use `design-distinctiveness` after positioning and before visual or frontend execution; keep `creative-director` as lead.
- Product behavior and interaction: use the relevant frontend/product-design specialist, with `creative-director` when appearance or personality is material.
- Human factors, accessibility, essential comprehension, spatial experience, or participant-facing behavior: use the relevant design or domain specialist when these shape concept viability.
- Code, architecture, persistence, identity, concurrency, auth, and runtime behavior: use `software-steward`, `lean-product-architect`, or `senior-architect` as appropriate.
- Electrical, protocol, device, and hardware truth: use domain sources and the relevant technical specialist; keep experimental, confirmed, and production-proven facts distinct.
- Production promotion and live verification: use `release-steward` and `live-environment-steward`.

Use one accountable primary craft per decision, not necessarily one craft for the whole pass. A mixed pass may contain linked decisions with different leads.

A constraint is supporting when it can be satisfied after the expressive direction is chosen without materially changing the concept. It belongs in the feasibility envelope when violating it would make the concept nonviable, or satisfying it would materially change the concept's form, interaction, sequence, materials, scale, or operating model. The relevant specialist states minimum requirements, forbidden zones, unresolved assumptions, and confidence; the primary craft retains authority over choices inside that envelope.

Use this test: can the direction be chosen now and the constraint satisfied later without changing its thesis? If yes, defer it. If no, resolve only the feasibility-critical unknowns before direction selection. Defer implementation hardening, full verification, and unrelated risk history.

## Conditional Risk Overlays

Activate an overlay only when the artifact or action being changed crosses its boundary:

- Data integrity and identity.
- Authentication, privacy, or secrets.
- Physical actuation or electrical safety.
- Regulated commerce, payments, or sensitive claims.
- Rights, consent, or representation when the artifact actually collects, publishes, archives, or controls another party's material.
- Destructive or production mutation.

An overlay supplies the minimum protected invariants, verification, and approval boundary. It does not set the visual tone, rewrite ordinary marketing language, or import every historical risk from the project.

Use `unknown` only when a concrete property of the affected artifact suggests a boundary may apply but applicability cannot yet be determined. Perform the smallest discovery needed to classify it. Do not use uncertainty as permission to activate a broad audit or to ignore a likely non-deferable constraint.

Project association is not activation. Activate an overlay only from properties of the affected artifact or action and a concrete applicable boundary. Historical risks elsewhere in the project do not travel into unrelated work.

Do not proof-gate ordinary non-quantified positioning, audience fit, approachability, ease, or experiential language merely because it is theoretically testable. Require substantiation when a claim's precision, consequence, regulatory status, guarantee, comparison, or asserted external evidence makes verification material.

## Authority And Maturity

Classify inputs by authority:

- `hard constraint`: an explicit requirement, externally binding requirement, or feasibility limitation whose violation would make the requested outcome nonviable.
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

When authority is genuinely distributed, map it by decision and fact rather than assuming one global owner. Identify only the parties or sources that govern the affected scope. Creative approval cannot waive a binding requirement or rewrite externally owned truth; those constraints still do not control expression outside their scope.

## Mixed-Work Sequence

For work that genuinely blends disciplines:

1. Give the primary craft only the product truths, taste signals, named invariants, and feasibility envelope it needs.
2. Produce or choose the result in the freedom zone.
3. Freeze the selected expression at its actual authority state.
4. Create a narrow integration contract:
   - inputs and authoritative representations; add ownership, provenance, reconciliation, and conflict behavior when authority is distributed;
   - outputs;
   - permitted mutations;
   - forbidden mutations;
   - error, stale, unavailable, and recovery behavior when relevant;
   - timing, resource limits, calibration, fault containment, safe state, interlocks, or manual override only when the artifact depends on them.
5. Implement through that contract.
6. Validate expressive quality, human or participant integrity, and technical correctness separately when each is in scope.

Do not make the creative pass read an entire database incident history. Do not let the engineering pass casually reinterpret the accepted visual intention.

Patterns:

- For a human-facing label backed by persistent identity, protect payload and identity semantics while leaving material, hierarchy, typography, and composition open.
- For a data-backed display, protect source, transformation, units, state, warning, and failure semantics while leaving visual expression open.
- For a customer-experience redesign, protect the real offer and required working behavior while leaving unapproved expression open; apply production hardening at the stage where it becomes material.

## Progressive Memory

Read the project front door, then load only memory relevant to the current stage, craft, and overlays. Do not preload every operational risk, archive, rejected design, or historical incident into a creative task.

Use `project-memory-steward` to keep:

- approved direction separate from provisional and rejected work;
- verified technical truth separate from inference;
- protected invariants discoverable without making them the project's personality;
- deep lane-specific material behind a concise front door.

For forward testing, read `references/routing-regression-cases.md`. Treat its named incidents as evaluation fixtures, never as runtime rules or vocabulary to copy into this skill.

## Completion

Complete the requested stage. Report the result, relevant proof, protected invariants, and the next genuine gate. Do not burden the handoff with risks that were not activated by the work.
