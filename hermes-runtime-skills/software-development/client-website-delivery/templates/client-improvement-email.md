# Client Website Improvement Email

**Subject:** Your website improvements are ready to review

Hi {{client_first_name}},

We finished the next round of improvements to {{site_name}}. You can review the updated site here:

{{preview_url}}

## What changed

{{plain_language_change_list}}

## What to review

- Check the main pages on both a phone and a computer.
- Read the wording and confirm the business details, services, prices, hours, and contact information are accurate.
- Try the main contact, booking, purchase, or signup path.
- Open the important links and confirm they go where you expect.
- Reply with any changes you want before launch.

## What we measured

{{measured_results}}

{{projection_or_limitation_note}}

## What happens next

{{next_step}}

Nothing in this preview changes your live website. Once you approve the review version, we will confirm the separate launch steps with you.

Thanks,
{{sender_name}}
{{sender_company}}

---

## Drafting rules

- Use 3–7 short change bullets and translate technical work into client benefits.
- Numbers enter a client email only from at least 3 Lighthouse runs per side, reported as the median. A single synthetic run is directional evidence for internal triage, never for a client email.
- Regressions never reach a client email — they get fixed and re-measured in the regression-and-polish loop before drafting (see the handoff procedure). The email reports wins; anything still open is framed forward-looking under "what remains" as work to continue, never as something we made worse.
- If no trustworthy baseline exists, say “Not measured” instead of inventing a delta.
- Label projections as “Expected effect,” “Likely benefit,” or “Designed to improve”; never present them as measured.
- Do not promise rankings, traffic, leads, sales, revenue, or third-party platform outcomes.
- Do not expose filenames, branches, commits, internal systems, paths, credentials, or workflow guardrails.
- Drafting is allowed; sending requires explicit owner approval of the exact message.
