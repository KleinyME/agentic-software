# Web Stack Direction — HTML-First by Default

Standing technical direction for client-facing websites (marketing sites,
local-business sites, service pages, case-study pages). Exists because the
measured portfolio proved the failure mode: sites that look finished to people
and serve a near-empty HTML shell to every machine that decides who gets found.

## The default stack

**Astro, HTML-first.** Content lives in `.astro` components and is rendered to
real HTML at build time. React (or any framework) is used only as **islands**
for genuinely interactive widgets — booking forms, calculators, carousels.

Hard rules:

1. **Never `client:only` for primary content.** `client:only` skips server
   rendering entirely — the page ships as an app shell regardless of Astro
   being the framework. Use `client:load` / `client:idle` / `client:visible`,
   all of which pre-render the island to HTML and hydrate after.
   (Measured case: one directive change took a live site's server-rendered
   body from 4 words to ~1,900.)
2. **Module scope must be SSR-safe.** No `window` / `document` / `localStorage`
   at import or render time — guard with `typeof document !== 'undefined'` or
   move into effects. This is the usual crash when a client-only island is
   promoted to `client:load`.
3. **Machine files ship in `public/` from day one:** `robots.txt` (allow, with
   a `Sitemap:` directive), `sitemap.xml`, `llms.txt`. They are part of the
   template, not a launch task.
4. **LocalBusiness JSON-LD in the head** with real name/phone/area facts, and
   `tel:` links for every phone number. Facts come from the research phase —
   wrong schema is worse than none.
5. **Per-page titles and meta descriptions** naming the offer and the area.

## Prototype → production without a conversion phase

Prototyping tools (Google AI Studio and similar) emit client-side React SPAs.
The conversion tax happens only when the prototype's shape is allowed to
become the site's architecture. Protocol:

- Start every build from the Astro template; the prototype's components are
  pasted **into islands**, mounted `client:load`, never `client:only`.
- Immediately after first paste, run the SSR-safety pass (rule 2) so the
  build renders.
- Then progressively de-island: static sections (hero, services, about,
  FAQ) move out of React into `.astro` markup as they stabilize. Interactive
  cores stay islands.
- A page is done de-islanding when its primary copy is readable in View
  Source with JavaScript off.

## Previews are unindexable at the deployment layer, not in the code

Concept and preview deployments must not be indexed — enforce that with the
hosting layer (Vercel deployment protection, `X-Robots-Tag` header on the
preview environment), **never** by baking a blocking robots.txt or noindex
into the build. Baked-in blocks are exactly the thing that survives launch by
accident; a stale deploy pattern (repo fixed, production still blocked) has
already happened once and cost a live site its crawlability.

## Verification is a command, not a review

Every rule above maps to a deterministic check on the Karbon instrument bench.
After any fix or before any launch call:

    GET /api/audit/check/raw-html-readability?url=...
    GET /api/audit/check/robots-policy?url=...
    GET /api/audit/check/sitemap?url=...
    GET /api/audit/check/llms-txt?url=...
    GET /api/audit/check/schema-local-business?url=...
    GET /api/audit/check/contact-path?url=...
    GET /api/audit/check/https-security?url=...
    GET /api/audit/check/page-titles-descriptions?url=...

Full audits produce a `visibility_blueprint_v3` record
(schema vendored from the Karbon-AI repo, `contracts/visibility-blueprint.v3.schema.json`);
the record — not a reviewer's impression — is the before/after proof.

**Evidence retention rules for fix passes:**

- The record's `internal.evidence` holds every collected measurement category
  (Lighthouse detail with estimated savings, axe violations, crawl samples,
  structured-data issues, model-poll results). **Read it before measuring
  anything** — if the audit already collected it, re-measuring is waste.
- `internal` is never rendered or sent to a client. If a record file itself
  is ever shared externally, strip `internal` first.
- The raw `audit-payload.json` stored beside each record is the reprocessing
  source: when the adapter improves, records regenerate from stored payloads
  without re-auditing.

## When not Astro

- **Commerce:** Shopify, built in the client's own account (per the posted
  offer). The storefront is Shopify's; the machine-file and schema rules
  still apply to any custom pages.
- **Custom software** (accounts, backends, payments): scoped per job; pick
  the stack the software needs. The public marketing surface of such a
  project still follows the HTML-first rules above.
