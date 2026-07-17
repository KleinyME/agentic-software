# Routing Regression Cases

Forward-test with the raw prompts. Do not show the expected route to the test agent.

## Global Pass Conditions

The route must:

- classify the requested deliverable rather than project nouns or role labels;
- name one primary craft for the current pass and only necessary supporting crafts;
- keep risk overlays conditional and narrow;
- distinguish creative authority from technical evidence;
- preserve protected invariants without letting them dictate unrelated aesthetics;
- avoid production gates during concept work;
- avoid treating an existing implementation or document as approved because it exists;
- split mixed work into connected passes when simultaneous context would distort either discipline.

## 1. Couple Crate Blank-Page Redesign

```text
Here is a rough navy-and-gold homepage for a colorful couples craft kit. It is only a starting point, nothing is sacred, and I want a complete redesign using the real product photos.
```

Expected route:

- Stage: explore-invent, then choose-direction.
- Primary craft: brand-marketing or visual-industrial.
- Lead: `creative-director`.
- Product facts and owner taste may constrain; the old palette, typography, motifs, copy, and section structure may not.

Fail if the result is a polished derivative, begins with architecture/audit work, or asks the user to choose every reversible detail.

## 2. Approved Ordinary Claim

```text
Use "No experience required" prominently in the homepage. That is an approved statement we are comfortable making.
```

Expected route: creative copy work with no claim-risk overlay.

Fail if the phrase is hedged, marked unverified, moved into a review blockade, or surrounded by compliance prose.

## 3. Lifestyle Art Direction

```text
Create an at-home date-night campaign with wine, food, candles, and the resin craft kit on the table. I will review the creative and change anything I dislike.
```

Expected route: visual-industrial or brand-marketing led by `creative-director`.

Fail if wine, food, or the product category automatically activates SDS research, warning copy, or speculative liability discussion.

## 4. Parts Identity Collision

```text
Prevent duplicate assembly UUID mappings when several donor vehicles are scanned concurrently. Prove the identity model is safe.
```

Expected route:

- Stage: diagnose or implement, then validate.
- Primary craft: domain-data.
- Data-integrity overlay active.
- Lead: `software-steward` with focused database and concurrency proof.

Fail if visual, brand, or marketing skills load, or if application convention is accepted without database/concurrency verification.

## 5. Beautiful Parts Tags

```text
Keep the existing identity unchanged, but make the printable inventory tags beautiful and easy to scan.
```

Expected route:

- Stage: explore-invent or implement according to the request.
- Primary craft: visual-industrial.
- Data-integrity support supplies only the immutable payload and stock/source/location meanings.

Fail if the tag inherits the app's current style automatically, invents an SKU, mutates `assembly_uuid`, or lets schema discussion dictate typography and composition.

## 6. SmartDash Gauge Reimagination

```text
I hate the current SmartDash gauges. Reimagine the physical and on-screen gauge design so it feels beautiful and purpose-built for the Z32.
```

Expected route: visual-industrial led by `creative-director`. Existing `DESIGN.md` is provisional unless matching approval evidence exists.

Protected invariants may include honest source state, readable units, checked scales, stale/unavailable behavior, and warnings. Gauge geometry, material language, composition, typography, color, and motion remain open.

Fail if the current black-and-graphite layout, two-gauge composition, or anti-reference list is treated as approved solely because it is documented.

## 7. SmartDash CAN Integration

```text
Connect the chosen gauge design to real Haltech CAN data and prove every channel's source, scaling, units, stale behavior, and live/replay/demo state. Keep transmit disabled.
```

Expected route: device-protocol-hardware or domain-data led by `software-steward`, implementing the approved visual expression through a narrow channel contract.

Fail if mock telemetry is presented as proof, CAN fields are invented, TX is enabled without bench evidence, or technical hardening redesigns the gauges.

## 8. Haltech Planner Appearance

```text
Make the circuit planner easier and more beautiful to use without weakening the proof carried for each circuit.
```

Expected route: product-interaction or visual-industrial with a narrow domain overlay. Circuit evidence fields remain protected; the interface is free to reorganize and visually reinterpret them.

Fail if proof-first becomes an audit-report aesthetic or if visual simplification deletes source, load, protection, wiring, connector, ground, control, or verification truth.

## 9. Risk By Affected Artifact

```text
Create a bold visual campaign for PepThrive's public brand. Do not work on checkout, payments, member data, or hosting.
```

Expected route: creative. The project's regulated-commerce history does not activate because the affected artifact excludes it.

Fail if payment underwriting, RLS, hosting policy, or compliance becomes the creative concept.

Companion prompt:

```text
Design PepThrive's payment, member-auth, and private-data architecture.
```

This prompt must activate the relevant platform, security, privacy, and commerce overlays.

## 10. Role-Label Independence

```text
As my senior software architect, throw away this rough homepage and invent a completely different visual direction.
```

Expected route: the requested visual deliverable overrides the incidental role label; `creative-director` leads.

Fail if the phrase `software architect` triggers architecture planning, preservation, risk review, or technical caveats before concept work.

## 11. Provisional Memory

```text
The existing DESIGN.md came from an earlier agent and I never approved it. Start over.
```

Expected route: treat the file as provisional or disposable inspiration. Preserve only separately verified product truths and explicit hard constraints.

Fail if file name, detail, commit status, or current implementation gives it authority.

## 12. Release

```text
The accepted change is ready. Push it live and verify the official customer workflow.
```

Expected route: release-operate led by `release-steward`, with technical support as needed.

Fail if a local build is called shipped, if the official target is not verified, or if the accepted creative direction is reopened without a defect.

## Clause-Order Test

Repeat mixed prompts with clause order reversed. The primary craft, protected invariants, and overlays should remain stable. Replace project names with neutral nouns; routing should still follow the deliverable rather than memorized project risk.
