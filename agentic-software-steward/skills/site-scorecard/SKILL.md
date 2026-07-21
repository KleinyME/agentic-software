---
name: site-scorecard
description: Review a Karbon visibility_blueprint_v3 record as the dedicated judge — research the business, refine the judgment lane (customer question table, six anchored dimension scores, restructure plan, homework specs, people-side readout) where evidence warrants, and write the additive narrativeReview that becomes AbeL's client-facing second read. Use when a Blueprint judgment job is claimed, when a preview/drift run needs re-judging, or when someone asks to "run the scorecard", "judge this site", "review the Blueprint", or "complete the Blueprint".
---

# Site Scorecard

Give an already-issued Blueprint its research-driven second read: what
customers ask, how the site reads as a human artifact, what the page-by-page
plan is — and AbeL's written review on top.

Since the 2026-07-20 capture-to-client change, the record arrives COMPLETE:
the Karbon server fills the judgment lane at capture time (marked in
`internal.immediateJudgment`, mode `model_reviewed` or `instrument_derived`).
The client has usually already seen it. This pass refines the judgment lane
where real research contradicts the immediate pass, and adds the narrative
review — it is a reviewer's improvement pass, not a first fill.

The instrument lane measured; this skill judges. Never re-measure what the
record already contains, and never present judgment as measurement. The
measured lane — `instruments`, `readout.machinesView`,
`readout.planningSignal`, `meta.sourceAccess` — is FROZEN at issuance: the
Karbon server discards silent edits to it and alerts the owner. If a measured
value looks seriously wrong, say so in `narrativeReview.stillToConfirm`.

## Inputs

Required:

- A `visibility_blueprint_v3` draft record (`record.json`) with its
  `internal.evidence` block, plus the `audit-payload.json` beside it.
  Location convention: `D:\Karbon AI Clients\<slug>\runs\<runId>\`.
- The live URL (and the concept/preview URL for preview runs).

Recommended:

- Research output from `brand-direction` (Establish Truth: facts labeled
  known / inferred / client-stated / open) and `design-distinctiveness`
  (vernacular inventory). If neither exists for this client, run the research
  first — question selection without vernacular research produces flattering
  questions, which the method forbids.
- The client folder's `research/` directory for prior research; write new
  research there with sources and dates.

## Hard Rules

1. **Read `internal.evidence` before opening a browser.** The record already
   holds Lighthouse detail, axe violations, crawl samples, structured-data
   issues, and the AI model poll (including who got named instead).
   Re-measuring collected evidence is waste; contradicting it without new
   observation is fabrication.
2. **Judge separation.** Whoever built or fixed the site does not score it.
   Baseline runs of sites this agent never touched are fine. On preview or
   drift runs after this agent's own changes, the dimension scoring goes to a
   separate judge session (or the owner scores the six dimensions); this
   agent may prepare everything else. Every judgment session runs under a
   dedicated judge identity and records it in the completed record as
   `internal.judge = { "identity": "<judge-id>", "judgedAt": "<ISO>",
   "runtime": "<runtime-name>" }`. The Karbon delivery gate rejects records
   without a judge identity, and rejects preview/drift records whose judge
   identity matches a builder identity — that rejection is the separation
   rule working, not an error to route around.
3. **No invented facts.** Every `factsVerified` flag set true requires a
   named official source. Fabricated proof anywhere caps `trust_and_proof`
   at 2 and adds a presentation blocker (see anchors).
4. **Skill pinning.** Write this repo's current commit into
   `meta.repoCommit` and the cohort label into `meta.generation`. Drift
   audits must compare like with like.
5. **`internal` never reaches a client** — not rendered, not attached, not
   quoted. If sharing a record file externally, strip `internal` first.

## Workflow

1. **Load** the draft record; confirm `meta.contract` is
   `karbon_visibility_blueprint_v3` and note which blockers are present.
2. **Research** (or load prior research): business facts via
   `brand-direction` Establish Truth; vernacular and competitor language via
   `design-distinctiveness`. Save to the client's `research/` folder with
   sources and dates.
3. **Question table** — the record arrives with 3–5 questions from the
   immediate pass. Keep the ones research supports; replace weak or
   flattering ones per `references/answer-availability.md`; check each
   against the live site (and concept on preview runs), record statuses and
   owner-facing notes. Any `contradictory` becomes the rank-1 finding.
4. **Dimensions** — score all six against `references/scoring-anchors.md`,
   interpolating between bands, citing observed evidence in each
   `evidence` string. `ai_readability` must cite the instrument checks
   already in `citedChecks`; do not overwrite the machine lane's facts.
5. **Restructure plan** — one row per existing page (keep / rewrite / merge /
   redirect / validate) plus `add` rows for missing answer-addresses.
   `add` and rewrite-for-answer rows link a homework item.
6. **Homework** — for each `not_stated` / `answered_buried` question, write a
   `HomeworkSpec`: objective, suggested title and URL path, `mustContain`
   list, acceptance `rerun_question`.
7. **Readout** — fill `peopleView` meter values from the dimension scores
   (×10), set tones, and write the `diagnosis` paragraph in plain English.
8. **Narrative review** — write the top-level `narrativeReview` object,
   AbeL's plain-language client-facing review, first person, deadpan, no
   hype: `{ "whatISee": <one honest paragraph on this business's
   visibility>, "whatMattersMost": <the single highest-leverage issue and
   why>, "whatIdChange": <the concrete first change>, "recommendedPackage":
   { "name": <"Local Site + Care" | "Local Site (full handoff)" |
   "Online Store" | "Custom Stack">, "why": <why this package fits,
   grounded in the findings> }, "stillToConfirm": <what could not be
   verified from the outside> }. This drives the review email and the
   review section of the delivered document — it is the earned second ask.
9. **Gate bookkeeping** — set `factsVerified` honestly; write `stillOpen`
   (the most important unresolved gap, owner-facing); legacy drafts only:
   remove the "judgment pass not yet completed" blocker once steps 3–7 are
   done; add any presentation blockers the anchors require; write
   `internal.judge` with this session's judge identity (Hard Rule 2).
10. **Validate** the completed record against
    `references/visibility-blueprint.v3.schema.json` (`narrativeReview` is
    an additive top-level key the schema tolerates). A record that fails
    validation is not done.
11. **Store** the completed record back to its run folder. Rendering and
    delivery happen through the Karbon server
    (`POST /api/blueprint/v3/render`; audience `client` refuses records with
    blockers — that refusal is the gate working, not an error to route
    around).

## Preview And Drift Runs

- Score live and concept against the same anchors; report asymmetry as found
  (see the anchors' closing note).
- Fill `conceptStatus`/`conceptNote` per question.
- Deltas against the prior run are computed by check id, dimension id, and
  question id — never renumber or rename existing ids between runs.

## Done Means

- All six dimensions scored with cited evidence; questions 3–5 with statuses
  and owner-safe notes; restructure plan covers every known page; every
  unanswered question has a homework item with an acceptance test.
- `narrativeReview` is written, complete, and grounded in the findings.
- The measured lane is byte-identical to what arrived; remaining blockers
  are real; the record validates against the schema.
- `meta.repoCommit` / `meta.generation` are set.
- Research is saved in the client folder with sources; nothing from
  `internal` leaked toward the client.
