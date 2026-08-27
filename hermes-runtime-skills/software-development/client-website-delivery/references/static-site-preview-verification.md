# Static Site Preview Verification

Use this pattern for Astro/Vite-style client prototypes and any deployment where a local development server, production preview server, and hosted URL can differ.

## Local final-QA sequence

1. Run the full production build and type/check command.
2. Stop the development server completely, including any child process still holding the port.
3. Start the built artifact with the framework's production preview command.
4. Read the server output and record the **actual** port. Frameworks may silently increment when the requested port is occupied.
5. Run browser verification against that exact base URL.
6. Capture desktop and mobile full-page screenshots from the production preview, not the development server. Astro's development toolbar can otherwise appear in evidence screenshots and be mistaken for site UI.

## Browser assertions

Do not treat HTTP 200 as sufficient. For each target URL, assert:

- expected document title
- expected H1 or distinctive body marker
- primary CTA exists and is visible
- contact links resolve to the intended destination
- expected JSON-LD type exists when applicable
- zero horizontal overflow at representative desktop/mobile widths
- no console errors attributable to the site
- no serious/critical accessibility violations
- crawler/support routes return their expected content rather than an HTML login shell

A useful smoke script should fail if the title/H1/CTA/schema belong to an authentication page or hosting dashboard, even when the response status is 200.

## Vercel review-link traps

- A project's first deployment can be assigned to the production environment even when invoked without `--prod`; do not represent that immutable deployment as a preview.
- A subsequent preview deployment can be protected by Vercel Authentication and redirect unauthenticated reviewers to a login page.
- The stable project alias and immutable deployment URL can have different access behavior.
- Verify the exact URL you intend to send in an unauthenticated browser context. Check title, H1, CTA, and representative static routes.
- If the preview is protected, configure a Deployment Protection Exception or another approved review-access path. Do not declare it shareable merely because deployment succeeded.
- If a stable `vercel.app` alias is intentionally used as a review surface, label it clearly as a review-only prototype and confirm that no client domain or production promotion occurred.

## Evidence to preserve

- build/check output
- dependency audit result
- verification JSON with route and viewport assertions
- final desktop/mobile screenshots captured from the same URL being shared
- exact share URL and whether it is publicly readable
- owner decisions still required before client-domain launch
