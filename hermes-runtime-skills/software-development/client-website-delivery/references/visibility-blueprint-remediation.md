# Visibility Blueprint Remediation Pattern

Use this when a visibility/audit report contains recommendations that should become repository changes.

## Classify Before Editing

Put every finding in one of three buckets:

1. **Repository-controlled and reproducible** — content gaps, route discoverability, semantic HTML, render-blocking assets, responsive defects. Fix these.
2. **Repository-controlled but unverified** — reproduce first; do not code against a report assertion alone.
3. **External or operational** — directory listings, third-party profiles, customer reviews, backlinks, approvals, business promises, DNS, and account changes. Report separately; do not claim the repository fixed them.

## Test-First Slice

Write small source-level regression tests before implementation where the expected behavior is deterministic. Good assertions include:

- a buyer-facing process page names stages, timing, and required inputs
- public links have corresponding sitemap entries
- marketing CSS does not import render-blocking third-party font stylesheets
- a content card does not create an inappropriate landmark

Run each named test red, implement that slice, run it green, then run the whole focused suite.

## Buyer-Facing Process Content

A useful process page should answer:

- what happens after yes
- what the client must provide
- when timing starts
- realistic planning ranges by package
- what pauses or changes the schedule
- how preview, approval, launch, care, and handoff work

Write as customer guidance, not an audit explanation. Treat ranges as planning ranges rather than guarantees. Never invent unapproved inclusions, revision counts, or ownership terms. If timing varies materially, say it is confirmed in the written scope.

## Performance and Crawl Techniques

- Replace CSS `@import` calls to remote font stylesheets with local WOFF2 assets and `@font-face` declarations using `font-display: swap` when licensing and repository policy allow it.
- Prefer variable Latin subsets when they materially reduce requests; validate downloaded files as real WOFF2 assets.
- Add every intentional, indexable, publicly linked route to the sitemap.
- Give SPA routes route-specific title, description, canonical, and social metadata in the production route-shell generator.

## Visual Verification

- Check the production build, not only the dev server.
- Inspect desktop and a phone-width full-page render.
- Measure `scrollWidth` against `clientWidth` to detect horizontal overflow.
- Inspect wrapped or horizontally scrolling navigation carefully: a clipped final label is a defect even if scrolling technically works.
- Rebuild after every CSS correction before recapturing evidence.

## Repository Hygiene

Build generators may rewrite PDFs, static HTML, or other generated artifacts even when their bytes are semantically unchanged. After verification, inspect status and diff, restore unrelated generated churn, and keep only the intended remediation changes.

## Reporting

Report fixed, deferred/external, verified, and blocked items separately. Do not provide exact audit-score deltas unless both baseline and after measurements were successfully preserved. A failed final audit is a verification limitation, not evidence that the implementation failed.

## Post-Improvement Client Handoff

**Regression-and-polish loop comes first (owner rule, 2026-07-21).** Before any
handoff is drafted, compare the before/after measurements. If any metric got
worse, or a known mechanically-fixable optimization was left on the table
(uncompressed images, render-blocking assets, missing alt text, unminified
payloads), fix it and re-measure. Loop until the comparison is clean or the
remaining item genuinely needs client input or a separate scope. A client
email must never announce work that made something worse — we fix it before
we tell them. Anything that cannot be fixed in the loop is framed
forward-looking in "What remains" ("needs work to continue"), never as
"we broke X."

After the loop converges and a reviewable preview and same-method
before/after checks exist, prepare a plain-language client handoff with four
parts:

1. **What changed** — describe visible and technical work in everyday language. Lead with the client benefit, not filenames, frameworks, or audit jargon.
2. **What to review** — provide one preview link and a short checklist covering desktop/mobile appearance, wording and business facts, forms/contact paths, links, and anything that requires client judgment.
3. **What was measured** — report the baseline, preview result, absolute delta, test method, run time, and environment. Separate measured results from likely or projected benefits. Never turn a single synthetic Lighthouse run into a traffic, ranking, lead, or revenue promise.
4. **What remains** — list external work, missing client inputs, known limitations, and the exact approval or decision needed next.

Create a draft client email from `templates/client-improvement-email.md`. Keep it short enough to scan on a phone, link to a fuller report when needed, and avoid internal paths, branch names, commit ids, queue details, provider/runtime names, or guardrail language.

Client-send remains a hard stop: draft and review are allowed, but do not send the email until the owner explicitly approves that exact client-facing message. Production promotion, DNS, spend, and final-completion claims remain separate decisions.