# Answer-Availability Audit

Audits whether a source's content contains a correct answer at an addressable
location. It does not simulate or claim any assistant's behavior — describe it
accurately.

## Selecting Questions

3–5 per business, phrased the way a real customer asks. Draw from these slots
and the business's vernacular inventory (from `design-distinctiveness`
research and `brand-direction` Establish Truth):

1. The offering: "Do they do X?" for the service the business most wants to sell or is most asked about.
2. Logistics: hours, location, or service area.
3. The signature: the thing only this business has — the invented dish, the perk, the credential.
4. Conversion: "How do I book / register / order / get a quote?"
5. The differentiator surfaced by research: the question whose answer separates this business from its competitors.

Prefer questions the research phase proved customers actually ask (review
language, FAQ patterns). Do not select questions chosen to flatter the concept.

## Statuses

Score each question once per source:

- `answered_at_url` — a correct answer exists at a stable, addressable URL whose purpose matches the question.
- `answered_buried` — the answer exists but requires scrolling, menu-diving, embedded media, or inference.
- `not_stated` — the source does not contain the answer.
- `contradictory` — the source (or the business's set of official properties) gives conflicting answers.

## Rules

- Verify answers against the official source of truth before marking either source correct. An answer present but wrong scores `contradictory`, not `answered_at_url`.
- A concept that deliberately omits an unverifiable fact scores `not_stated`, a better answer-availability status than `contradictory`. Removing a contradiction is an improvement worth showing; this status comparison does not set the finding's business priority.
- Every `contradictory` answer is a visible finding with reconciliation work, but contradiction is a status, not an automatic priority score. Rank it against buyer consequence and the owner's stated business goal. A contact contradiction leads only when it removes a dependable buyer path, misroutes an emergency or safety-critical request, creates material transaction or regulatory risk, or otherwise has greater consequence than the positioning, proof, offer, or conversion gaps. Ordinary secondary phone, address, or hours discrepancies stay disclosed without taking over the Blueprint.
- When a business operates multiple official properties (two domains, conflicting profiles), audit the set as one source and record which property said what.

## Recording

Each question becomes an `AnswerAvailabilityItem` in the record: `question`,
`liveStatus`, `liveNote` (factual, free of internal process language — the
table is owner-facing). On preview runs, add `conceptStatus`/`conceptNote`.
Questions scoring `not_stated` or `answered_buried` get a homework item
(`homeworkId` link) whose acceptance is `rerun_question`.
Contradictory questions also get reconciliation homework even when they are
not the lead finding.
