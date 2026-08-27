---
name: client-website-delivery
description: Use when auditing, verifying, polishing, or packaging public-facing client website deliverables so audit evidence, build guidance, preview polish, and owner-ready artifacts stay separated but coordinated.
version: 1.3.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [client-sites, website-audits, previews, polish, verification, copy-safety]
    related_skills: [systematic-debugging]
---

# Client Website Delivery

## Overview

Use this umbrella for client-facing website work that spans audit evidence, implementation guidance, preview polishing, and external review packaging. The class-level goal is to make the deliverable feel owner-ready without confusing three separate layers:

1. **Audit/report outputs** — evidence, gaps, scores, screenshots, findings, recommendations.
2. **Build inputs** — approved facts, constraints, proof policy, IA priorities, CTA constraints, brand voice direction.
3. **Rendered public website copy and UI** — visitor-facing language, layout, hierarchy, mobile behavior, and reviewable deployment links.

The recurring failure mode is treating an audit, prototype, or preview as if it were already a finished public site. The correct workflow uses audits as evidence, verifies pipeline/runtime behavior when needed, then polishes the visible preview until it reads like a real business, school, nonprofit, or community organization speaking to visitors.

## When to Use

Use when:
- the user asks to polish, critique, or finish a client site preview
- a website-audit pipeline or report output changed and must be verified end-to-end
- audit findings are feeding a redesign, preview, owner review, or rebuild
- the deliverable needs Telegram-friendly or owner-friendly packaging
- stale dev servers, cached audit payloads, or Vercel preview auth walls may make review misleading
- visible copy starts sounding like strategy/audit commentary instead of visitor-facing website copy

Do not use for:
- purely internal app dashboards with no public client-review surface
- generic UI mockups where audit evidence and owner packaging are irrelevant
- backend quota/billing incidents with no website-audit/preview deliverable

## Delivery Workflow

### 1) Establish the review target
- Identify whether the target is a live site audit, an implementation preview, a paid audit artifact, a report pipeline, or a candidate production build.
- If the owner asks for the "newest audit result" for a known site, default to a fresh current-site baseline plus the current owner-review Blueprint/report unless they explicitly ask for only the free audit.
- If the user frames work as a fresh paid audit, separate concept, or do-not-overwrite request, build in a standalone project directory and keep artifacts isolated from older previews.
- Verify the actual public URL when the link is part of the deliverable; do not assume a Vercel preview link is shareable or unauthenticated.

### 2) Verify audit/runtime truth before interpreting output
When a pipeline or audit field changed:
- confirm the real endpoint or command that exercises the audit stack
- force refresh rather than trusting cached payloads
- if a dev server is already running, consider a fresh secondary instance on another port so stale runtime state does not masquerade as code failure
- inspect `auditMeta`, stack/version, target URL, generated time, finding IDs, field presence, null/non-null status, and plausible score/finding content
- for fresh owner-review audits, verify the generated web report and PDF routes, not only the raw record id
- when asked whether a "just generated" client PDF/report is accessible, check both filesystem artifacts and durable audit records; distinguish free-audit captures from paid Blueprint records, because free captures can be fresh and valid while having no `/api/audit/paid/:id/pdf` artifact
- count findings from the current payload shape; in Blueprint findings, severity may live in `severity` rather than `priority`
- inspect sector/archetype classification, competitor/peer names, and client-facing language before calling a Blueprint usable; schools/nonprofits/community orgs must not inherit local-trade/service-business defaults like buyers, quotes, booked appointments, services/service areas, or restaurant/pub competitors
- scan the rendered report for empty bullet/list items, grammar artifacts such as "the you confirms", and public PDF/web parity problems; route status 200 is not enough if the content is visibly broken
- for email delivery, distinguish provider acceptance, recipient-mail-server acceptance, and human receipt; an event named `delivered` usually proves only that the recipient server accepted the message, not that the client can see it in Inbox or Spam
- when a later-started Blueprint sends but another does not, inspect each exact capture/job pair and its gate result rather than inferring FIFO failure; a local `record.json` can exist while a `422` validator rejection prevents any provider attempt
- before requeueing a validator-rejected judgment, run the current full delivery-boundary validator; zero blockers and a manually added identity are not enough when required metadata or client-facing sections such as `narrativeReview` are incomplete
- if a judgment process exits successfully but the attempt-scoped output path is absent, inspect legacy/sibling judged-record paths before rerunning the model; validate any candidate with the full current boundary, then release the exact active claim through the durable retry API and use submit-only recovery after its retry lease opens. A network abort while persisting attempt failure can leave the claim marked running even though a valid judged artifact exists.

A successful compile is not enough; verify through the product surface or API route the user actually cares about. When a client screenshot shows HTTP 200 beside “empty or exceeded the audit body limit,” zero/unmeasured score cards, or an unexpectedly empty entity profile, treat it as a collector-boundary incident rather than a site-quality finding: measure the decoded response bytes, preserve bounded network safety, test realistic hosted-builder HTML, and remove script/style/template noise only after extracting JSON-LD. Also separate request acceptance, judgment completion, delivery completion, provider acceptance, recipient-server acceptance, and client-confirmed receipt before saying a PDF or email reached the client. See `references/fresh-audit-rerun-pattern.md` for the reusable fresh-audit/report rerun checklist, `references/blueprint-delivery-recovery.md` for source-ceiling, queue-pickup, corrected-recapture, and delivery-proof recovery, and `references/blueprint-email-receipt-reconciliation.md` for non-receipt investigation and the one-controlled-fallback pattern.

### 3) Classify and remediate audit findings
Before turning a Blueprint or visibility report into code:
- reproduce each repository-controlled finding locally
- separate reproducible first-party fixes from unverified claims and external/operational work
- write a focused failing regression test for deterministic content, semantic, crawl, or asset-loading behavior
- implement and verify one slice at a time before running the full focused suite
- do not claim third-party profiles, reviews, backlinks, DNS, or other external signals were fixed by a repository change

For buyer-facing process gaps, publish customer guidance that explains stages, required inputs, when timing starts, realistic planning ranges, schedule-changing conditions, preview/approval, launch, and handoff. Present timing as a planning range, not a guarantee, and do not invent revision counts or package terms. Delivery timing is owner-sourced business truth: when the owner corrects it, update the source copy, regression coverage, client-handoff language, and deployed review surface together. Keep first-preview timing distinct from completed-build and launch timing.

See `references/visibility-blueprint-remediation.md` for the detailed test-first remediation, Karbon offer-timing truth, self-hosted font, sitemap, responsive-QA, review-preview access, and reporting pattern.

### 4) Convert audit evidence into build constraints, not page prose
Use audit output to decide:
- missing information
- missing trust/proof
- IA/page needs
- FAQ topics
- CTA constraints
- schema/content coverage
- source-backed brand or audience constraints

Do **not** paraphrase audit findings into rendered headings, hero copy, routing cards, or CTA support text. Reject language that says the page is clearer, warmer, easier to navigate, easier to understand, or now offers a simpler next step. The website should sound like the organization speaking to visitors, not like a strategist describing the redesign.

### 5) Choose the right information architecture before polishing
For live-candidate client sites, especially schools/community/org sites:
- avoid turning dense content into one giant landing page
- prefer a strong home page plus supporting pages such as Why, Experience, Enrollment, Services, FAQ, or Contact when depth is needed
- keep the home page emotionally strong and CTA-driven while moving practical detail to supporting pages
- routing cards should sell destination value, not explain the website's structure

### 6) Polish the visible preview like a real deliverable
Check and improve:
- brand preservation: colors, warmth, photography, local identity, sector-native feel
- hierarchy: hero order, CTA priority, trust cues, section rhythm
- visual variety: avoid endless identical cards that flatten the page
- copy: visitor-facing, specific, source-backed, not internal strategy prose
- mobile: brand row, hamburger state, open menu, CTA stacking, interior page compositions
- footer/end-state: intentional, not abandoned

For final visual evidence, build first and test the framework's **production preview server**, not its development server. Confirm the actual bound port from server output before running browser checks; a stale dev child process can keep the requested port while the preview silently moves to another one. Development-only overlays such as Astro's toolbar must not appear in owner screenshots.

Borrow interaction and proof patterns from strong design systems only as mechanics. Do not copy an AI/SaaS aesthetic wholesale onto schools, contractors, nonprofits, or community organizations unless that identity is appropriate.

See `references/static-site-preview-verification.md` for the production-preview, browser-assertion, screenshot, and Vercel access-verification pattern.

### 7) Package owner-facing and client-draft artifacts
When sending results to an owner or chat channel:
- write a concise Markdown review or summary, not just raw JSON
- include raw JSON when useful for implementation review
- decode and send screenshots directly when audit payloads embed them as data URIs
- clearly separate confirmed evidence, directional findings, and low-confidence/noisy sections
- prepare the plain-language client draft from `templates/client-improvement-email.md` after the regression-and-polish loop is clean
- separate measured changes from projected benefits, say “Not measured” when no trustworthy baseline exists, and keep client-send behind explicit owner approval
- when the owner wants ongoing oversight, configure durable completion notification before launch; after a confirmed send, retrieve the exact provider message, preserve HTML plus `.eml`, download and validate the exact linked PDF/report, and attach those owner copies in chat
- report blocked, retry-scheduled, failed, or uncertain outcomes instead of producing a synthetic “sent” archive

## Copy Safety Gate

Before calling a preview owner-ready, scan:
- hero headline and support copy
- top CTA support text
- page-routing cards
- section headings
- FAQ intros
- final CTA band

Ask: **Does this sound like a real organization talking to a visitor, or like a strategist describing a better website?** If it sounds like the latter, the audit boundary was breached.

Reject smell-test phrases such as:
- clear answers
- warmer guidance
- simpler next step
- what families can understand right away
- why this feels easier to navigate
- easier to find what you need
- this page gives you the overview
- go deeper here

Safer pattern: translate the audit finding into real visitor information. If admissions are unclear, explain how to tour, apply, or talk with the school. If proof is missing, add real proof or note that proof must be gathered before stronger claims are written.

## Verification Checklist

- [ ] Review target and isolation expectations are clear
- [ ] Fresh audit/runtime state was verified when pipeline output matters
- [ ] New fields/findings were checked for presence, null status, and plausibility
- [ ] Repository-controlled findings were reproduced before implementation; external findings remain clearly separated
- [ ] Deterministic content, semantic, crawl, and asset-loading fixes have focused regression coverage
- [ ] For PDF/report availability questions, artifact access was checked in both local report paths and durable audit records before saying yes/no
- [ ] Audit evidence was converted into constraints, not visible meta-copy
- [ ] Information architecture fits the content density
- [ ] Desktop and mobile preview states were visually checked from the production build/preview server, with no development toolbar or overlay in the evidence
- [ ] The browser checks used the actual bound preview port/URL rather than a stale process on the requested port
- [ ] Mobile verification includes horizontal-overflow measurement and complete navigation-label visibility
- [ ] Build-generated artifact churn was removed from the final diff unless intentionally changed
- [ ] CTA contrast, visited states, nav states, and interior CTA stacking are readable
- [ ] Owner-facing artifact is concise and reviewable
- [ ] Public preview/share link was checked in an unauthenticated browser context; the returned title, H1, CTA, schema, and representative static routes are the intended site, not merely an HTTP 200 or a hosting-provider login shell
- [ ] The exact URL sent to the owner is publicly readable; any protected immutable preview has an approved access exception/path or is reported as blocked rather than shareable
- [ ] After a corrected redeploy, both the immutable deployment URL and any stable review alias point to the current build
- [ ] Client handoff separates measured results, projected benefits, review items, and remaining work; exact client-send still awaits owner approval
- [ ] Email verification records the exact recipient, sender, subject, provider event, and whether receipt was confirmed by the client
- [ ] If owner archival was requested, the exact provider email was saved as HTML and `.eml`, and the exact linked report was downloaded and file-signature validated
- [ ] A provider `delivered` event is reported as recipient-server acceptance, never as proof of inbox placement
- [ ] A non-receipt fallback, when authorized, uses one simpler message with a new subject/idempotency key, validated PDF attachment, direct links, and a receipt request

## Common Pitfalls

1. **Trusting stale runtime state.** Existing dev servers, Vite middleware, HMR, or cached payloads can hide successful source edits or make missing fields look like code failures.
2. **Treating field presence as correctness.** A new object can exist but be null, empty, unsupported, or implausible.
3. **Letting audit language leak into the site.** Audit phrasing belongs in reports, not public copy.
4. **Using service-business copy defaults everywhere.** Schools, nonprofits, institutions, contractors, and community organizations need sector-native language.
5. **Ignoring preview friction.** Auth-walled Vercel previews, unreadable or clipped mobile nav, horizontal overflow, or broken CTA contrast can make a polished build unusable for owner review.
6. **Over-polishing away brand character.** Preserve the client's identity and emotional feel while improving hierarchy and craft.
7. **Overstating remediation.** Repository changes do not fix third-party listings, reviews, backlinks, DNS, or other external visibility signals; report those separately.
8. **Leaving generator churn in the diff.** Production builds may rewrite unrelated PDFs or static artifacts; restore them unless they are intentional deliverables.
9. **Inventing score deltas.** Cite before/after audit scores only when both measurements completed and were preserved.
10. **Mistaking request notification for completion.** A “new Blueprint request” alert proves only that the capture and judgment job were created. Before saying a PDF or email exists, inspect the capture record, linked judgment-job status, `blueprintV3` presence, delivery timestamp/failure state, and owner-Telegram document state. A queued or reviewing job has not produced a client-ready Blueprint.
11. **Treating large HTML as unreadable without checking byte ceilings.** When a browser renders the site but raw-source access is blocked, measure the actual response body and compare it with the same-stack source-body limit before blaming the site. Keep the record blocked until the source collector is safely corrected and rerun; do not bypass the delivery gate or send the client draft manually.
12. **Equating provider delivery with human receipt.** A mail provider's `delivered` event generally means the recipient's server accepted the message. If the client cannot find it, investigate exact provider metadata, use one controlled plain fallback with the PDF attached, and stop repeated retries after a second server-accepted message.
13. **Treating a local judged file or zero blockers as deliverability.** The current gate may still reject missing judge metadata or incomplete required sections. Validate the entire recovered output before a compare-and-set requeue; if substantive sections are incomplete, rerun judgment instead of patching one reported field at a time.
14. **Capturing final evidence from the wrong server.** A dev process can survive its parent, keep the requested port, and inject framework-only UI while the production preview silently binds elsewhere. Stop/identify listeners, use the actual preview URL, and recapture before owner review.
15. **Calling a protected deployment shareable.** Vercel can return a 200 login page for protected previews, and first deployments can be assigned to production automatically. Assert site identity unauthenticated and distinguish deployment success, review accessibility, and production promotion.

## References

- `references/audit-language-quarantine.md` — detailed boundary between audit/report language and rendered website copy.
- `references/blueprint-delivery-recovery.md` — distinguish request/judgment/delivery states; diagnose validator-rejected local judgments; recover with full current validation and guarded compare-and-set requeue; handle large-source/script-noise failures; keep judgment pickup from stalling.
- `references/blueprint-email-receipt-reconciliation.md` — distinguish provider acceptance from inbox receipt; proactively archive exact provider email plus validated linked report for owner oversight; investigate non-receipt and send one controlled PDF-attached fallback.
- `references/brand-brief-safety-gate.md` — safer audit-derived brand/copy field shapes and verification checks.
- `references/static-site-preview-verification.md` — verify static client prototypes from the production preview server; detect stale-port/dev-toolbar contamination; assert real site identity rather than HTTP status; handle Vercel first-deploy and protected-preview access traps.
- `references/visibility-blueprint-remediation.md` — test-first pattern for classifying and implementing first-party visibility findings, including Karbon timing truth, process content, local fonts, sitemap coverage, responsive QA, public-preview access, and honest reporting.
- `templates/client-improvement-email.md` — phone-readable post-improvement client email with change summary, review checklist, measured/projected split, limitations, and owner-approval boundary.
