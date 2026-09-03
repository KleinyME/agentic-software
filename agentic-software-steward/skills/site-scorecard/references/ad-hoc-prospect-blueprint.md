# Ad-hoc Prospect Visibility Blueprint

Use this when the owner asks for a full prospect Blueprint but there is no claimed judgment job or canonical run folder yet.

## Artifact layout

Create one client/prospect folder with:

```text
<client-root>/<slug>/
  research/       dated source notes and unresolved conflicts
  evidence/       raw audit payload, crawl output, screenshots
  deliverables/   validated record, HTML, PDF, extracted PDF text
```

Keep temporary crawlers and conversion scripts in the working repo's temp directory, not in the deliverable folder.

## Build sequence

1. Run a fresh Karbon production audit and save the raw response unchanged.
2. Crawl the important live pages and save desktop and narrow-mobile full-page captures. A machine audit alone cannot judge template dependence, local specificity, trust proof, hierarchy, or broken visual assets.
3. Research first-party and credible public profiles. Record URL, date, exact supported fact, and any conflict. Public search snippets are leads/evidence of what is publicly visible, not authority equal to an owner-confirmed fact.
4. If the audit response contains only `blueprintDraft`, use `completeImmediateBlueprint` to scaffold the issued record. A deterministic `instrument_derived` fallback is acceptable as scaffolding only. Do not ship its generic customer questions, decimal proxy scores, null human dimensions, generic restructure reasons, or synthetic homework unchanged.
5. **Reconcile machine contact evidence before judgment.** Compare any detected phone, email, contact-form, address, and quote-path claims against the saved HTML/crawl. Telemetry endpoints (for example monitoring or error-reporting addresses) are not public business contacts, and digits scraped from scripts are not phone numbers. A bad detected value must never be copied into a recipe, `mailto:`, `tel:`, finding, or client summary. Because the measured lane is frozen, do not silently edit an issued instrument: correct and rerun the capture before issuance, or add a presentation blocker and withhold the client PDF until the capture pipeline is fixed.
6. Replace/refine the judgment lane from live evidence: 3–5 real buyer questions, six anchored integer scores, people-side readout, page-by-page restructure plan, and question-linked homework. Keep the question count at 3–5, and verify every homework/acceptance `questionId` resolves after consolidating questions.
7. Preserve the frozen measured lane byte-for-byte: `instruments`, `readout.machinesView`, `readout.planningSignal`, and `meta.sourceAccess`.
8. Add the exact top-level `narrativeReview` shape required by `extractNarrativeReview`:

```json
{
  "whatISee": "...",
  "whatMattersMost": "...",
  "whatIdChange": "...",
  "recommendedPackage": { "name": "...", "why": "..." },
  "stillToConfirm": "..."
}
```

Do not put this object only under `internal`; validation and the rendered review will miss it.
9. Add `internal.judge` using the dedicated judge identity. Keep research provenance and detailed notes under `internal`, never in client-visible copy.
10. Validate with `validateJudgedBlueprintRecord` and the v3 schema before rendering.
11. Render the client HTML/PDF only when presentation blockers are empty. A factual conflict can be reported without a blocker if the disputed value is omitted as an asserted business fact, `factsVerified` remains false, and the conflict remains visible with reconciliation work. Rank it by material buyer consequence rather than automatically making it the Blueprint's thesis. If the record asserts an unverified value, keep the blocker.

## Capture reliability

- For JavaScript-heavy sites that keep analytics, chat, or commerce requests open, navigate with `domcontentloaded` plus a bounded settle delay rather than waiting indefinitely for `networkidle`.
- Capture both desktop and narrow-mobile full pages, then inspect the pixels; DOM metrics alone miss blank viewport-height sections, clipped display type, blurred media, and first-CTA depth.
- Normalize sitemap URLs before claiming page coverage: remove trailing-slash/canonical duplicates and distinguish discovered URLs from unique readable pages.
- Preserve raw crawl/audit evidence separately from the judged record so later corrections remain auditable.

## Conflict handling

For materially inconsistent address, phone, hours, price, certification, or availability:

- Set the customer question to `contradictory`.
- Add a judgment finding and rank it by buyer consequence and the owner's stated business goal.
- Make it rank 1 only when it removes a dependable buyer path, affects emergency or safety-critical routing, creates material transaction or regulatory risk, or is otherwise the highest-leverage issue.
- Cite both sources precisely.
- Link a homework item that establishes one owner-verified source of truth and synchronizes priority listings.
- Set the applicable `factsVerified` flag to false.
- Put the owner decision in both `stillOpen` and `narrativeReview.stillToConfirm`.
- When the conflict is subordinate, keep `whatMattersMost` anchored to the larger positioning, proof, offer, or conversion problem and avoid repeating the conflict as the Blueprint's opening thesis.
- Never pick the majority value and present it as truth.

## Final verification

A file existing is not enough.

- Confirm structural validation returns `ok: true` and has no issues.
- Confirm the client renderer accepts the record (or deliberately render preview when blockers remain).
- Parse the produced PDF: verify page count, non-empty text on every page, expected headline score, top finding, question table, restructure plan, fix guide, and measurement appendix.
- Run a semantic red-flag scan over extracted text for cross-client names, placeholders, `undefined`, raw HTML such as `<a href`, monitoring/telemetry addresses, invalid phone strings, and factual claims that the independent crawl disproved. Treat a hit as a blocker until explained or corrected at its source.
- Render PDF pages to images and visually inspect at least the first page, a dense findings page, a fix-guide page, and the last page. Check clipping, overlap, escaped markup, fonts, page breaks, accidental blank areas, and unreadable small type.
- If the PDF parser or renderer is missing, stop and ask the owner before installing anything. Name the exact package and version in the request. Do not install unattended and do not silently substitute an equivalent. Until it is available, record the PDF checks as blocked rather than passed: file existence and browser `page.pdf()` success are not evidence that the document is correct.
- Report the frozen planning signal as a planning score, never as a ranking promise.

## Prospect-facing summary

The Telegram handoff should be short and owner-readable: overall planning signal, six dimension scores, the one most important factual issue, 3–5 material findings, recommended direction, and the attached PDF. Keep the complete evidence in the artifact, not the chat message.
