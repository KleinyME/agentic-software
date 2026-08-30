---
name: request-triage
description: Classify a Karbon client request into its lane and draft the client reply.
disable-model-invocation: true
---

# Request Triage

The care-plan support model: lanes are cheap, judgment is metered. In-lane
structured requests are effectively unlimited; the metered resource is the
owner's personal attention. **Triage classification IS the meter, so the rule
is strict: a request is in_lane only if fulfillment stays entirely inside the
lane's recipe and acceptance check. Doubt escalates.**

## API surface

- `GET /api/hermes/v2/client-requests?status=submitted` — the queue
  (header `x-hermes-agent-key`).
- `POST /api/hermes/v2/client-requests/:id/respond` — body
  `{ text?, status?, lane? }`. Hermes may set status only to
  `triage`, `needs_info`, `scoped`, or `quote_first`. Approval, deploy,
  and close transitions are owner-only; the server enforces this.

## Lanes

| Type | In-lane means | Acceptance check |
|---|---|---|
| `add_event` | One event with a date, title, and description that drops into the site's existing events pattern. No new page templates, no design decisions. | Event renders on the events surface with the stated facts; nothing else changed. |
| `publish_post` | One post using the site's existing post layout, content supplied or trivially editable. No new sections, no nav changes. | Post renders at its URL with supplied content; feed/list updates. |
| `change_info` | Replacing existing facts: hours, prices, phone, address, staff names, service copy edits in place. Structure untouched. | The stated facts appear where the old facts were, everywhere they occur (including schema/llms.txt), and nowhere shows the old value. |
| `other` | Almost never in-lane. Only when it is literally one of the above mis-filed. | Reclassify, then that lane's check. |

**Out-of-lane, always:** new pages or sections, layout or design changes,
"make it pop", anything touching navigation, integrations, redirects, domain
or email changes, legal/compliance wording the client did not supply,
anything requiring a judgment call about how the site should look or read.

## Workflow

1. Read the request: type, title, details, thread, and its site.
2. Decide the lane by the table above. If any part of fulfillment would step
   outside the recipe — even a small part — the whole request is
   `out_of_lane`.
3. Missing facts? Set `status: needs_info` with ONE message asking for
   everything at once (dates, exact wording, links, photos). Never
   drip-feed questions.
4. In-lane and complete? Set `lane: in_lane, status: scoped` and reply with
   what will change and the acceptance check in plain words. The server
   notifies the owner for approval — building does not start here.
5. Out-of-lane? Set `lane: out_of_lane, status: quote_first` and reply
   honestly: this one needs the owner's judgment, they will hear back with
   either a quote or a scheduled slot. Do not estimate price or time.
6. Never touch a repo from triage. Triage classifies and converses; it does
   not build. Repo work begins only after the owner's approval, in a build
   session, and deploy is a second explicit approval.

## Voice

Deadpan, specific, first person, no hype (brand playbook). The client-facing
reply names exactly what happens next and who acts. No internal jargon:
"lane", "queue plumbing", request ids, and status enums stay out of replies.

## Done Means

- Every processed request left `submitted`, carries an honest lane, and has
  a reply the client can act on (or needs nothing from them).
- Nothing was promised that is not in the lane's recipe.
- No repo, DNS, deploy, or content change happened.
