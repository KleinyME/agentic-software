# Blueprint Delivery Recovery

Use this when an owner says a Blueprint was “done” but the client received no email, the owner received no PDF, or client screenshots show an unreadable/zero-score report.

## Separate the four states

Do not collapse these into one “completed” status:

1. **Audit preview completed** — the browser has a preliminary result. This is not the judged Blueprint.
2. **Capture accepted** — a durable capture and linked judgment job exist. A “new request” notification proves only this.
3. **Judgment completed** — the dedicated judge produced a v3 record. It may still be blocked.
4. **Delivery completed** — the delivery timestamp/provider result and owner-Telegram document state prove the email and oversight copy were sent.

Before answering “where is it?”, inspect the capture, linked judgment job, `blueprintV3` presence, blockers, delivery state/timestamp/failure, and owner-Telegram state. Never infer delivery from an HTTP 200, an unlocked preliminary report, a request notification, or a job record alone.

## Recognize a source-body ceiling failure

Typical screenshots/signals:

- HTTP 200 paired with “response was empty or exceeded the audit body limit”
- `0/100` or blank `/100` cards for otherwise unmeasured fields
- every visibility layer marked not measured
- entity/services/location fields unexpectedly empty
- generic “use a public, audit-readable URL” advice even though the site opens normally

Reproduce at the same network boundary:

1. Fetch the canonical redirected URL with the audit user agent.
2. Measure the decoded response bytes.
3. Compare that size with the initial-page byte cap.
4. Confirm the browser-rendered page is real HTML, not an auth/protection/error page.
5. Add a failing service-level fixture slightly above the old limit.

Hosted builders such as Wix can return HTML above 1 MB. Increase a ceiling only with bounded headroom and keep the lower-level hard cap, timeout, redirect validation, DNS pinning, and compression protections intact. Do not turn the reader into an unlimited fetch.

## Keep machine payloads out of visible text

Large hosted-builder HTML often contains bootstrap JSON and scripts before meaningful content. Extract JSON-LD/schema first, then remove `script`, `style`, `noscript`, and `template` nodes before deriving page text, snippets, entity hints, or model prompts.

Regression coverage should prove both:

- a realistic hosted-builder-sized document remains source-readable; and
- client-facing text starts with visible page content, not bootstrap/script noise.

## Production verification

After tests, type-checking, build, and reversible first-party deployment:

1. Force a fresh production audit rather than accepting cache.
2. Confirm `sourceOk=true`, status 200, and an empty source-access issue.
3. Confirm title/headline and visible-text excerpt come from the page.
4. Confirm previously fake zero/unmeasured cards now carry real values or explicit “Not measured” states.
5. Inspect top findings for plausibility; source access can be fixed while genuine business-proof blockers remain.

A good source read does not automatically make the Blueprint deliverable.

## Recover a validator-rejected judgment safely

A judgment worker can finish its research and write a substantial local record while the delivery gate still rejects that output. Treat the gate result—not the existence of `record.json`—as authoritative.

When one job that started later sends while an earlier or parallel job does not:

1. Query the exact capture/job pair by normalized domain **and** client email; include `www` variants because stored domains may not match the owner’s shorthand.
2. Inspect the job’s terminal reason, the capture’s `blueprintV3` presence, delivery state, owner-Telegram state, and provider message id.
3. Distinguish these outcomes:
   - local judged file exists, but gate returned `422` → no provider attempt;
   - capture has a delivery claim but no terminal state → reconcile before retrying;
   - provider message id exists → do not requeue judgment merely because the owner has not seen the email.
4. Validate any recovered local record with the **current** delivery-boundary validator before requeueing. Checking only `blockers.length === 0` is insufficient. Required metadata and complete client-facing sections can still be missing—for example `internal.judge.identity`, `internal.judge.runtime`, a valid `judgedAt`, or the complete `narrativeReview` shape.
5. Do not “repair” a rejected record by adding only the first missing field reported by the gate. Run the full validator; if substantive required sections are incomplete, rerun the dedicated judgment rather than successively patching validator errors.
6. Before a guarded requeue, prove the capture/job linkage, completed capture setup, exact expected `updated_at`, known blocked reason, and absence of all delivery evidence. Use a compare-and-set update so a state change aborts recovery.
7. After requeue, verify the job actually enters `reviewing` with a fresh claim/attempt and cleared blocker. Report “actively reviewing,” not “sent.”
8. Claim delivery only after the capture is completed, the delivery state is terminal `sent`, and a provider message id exists.

This pattern preserves the fail-closed gate while preventing a terminal validation failure from being mistaken for an email-provider outage or an idle queue.

## Recover the requested Blueprint safely

A blocked judged record is evidence; do not mutate it into a successful record or manually bypass its delivery gate.

When the technical collector is corrected:

1. Run a fresh signed same-stack audit.
2. Preserve the original owner direction, source context, brand answers, intended email, and other client-stated facts.
3. Create a new idempotent capture linked to the corrected audit.
4. Run the dedicated judgment worker.
5. Allow automatic client email only when the second-judge gate has zero delivery blockers.
6. Put routine uncertainty into a prominent client-confirmation section and still deliver the useful analysis. Hold only when the report itself would be misleading, unsafe, unusable, or unsupported.

Do not confuse **Blueprint delivery blockers** with **implementation blockers**:

- Conflicting locations, an unconfirmed official social URL, session-format questions, credential details, and testimonial permissions usually belong in `What I still need to confirm`. They block publishing disputed details in a later website/profile update, not delivery of the Blueprint.
- Attribute wellness services and claims neutrally to the business. Do not make the Blueprint adjudicate whether a modality is scientifically valid. Flag only language that creates a real publishing/safety concern, such as unsupported diagnosis/cure guarantees or advice to replace medical care.
- Delivery blockers are reserved for conditions that make the Blueprint materially misleading or unusable: failed/insufficient audit evidence, fabricated facts, unresolved high-risk regulated claims presented as fact, broken documents/links, wrong recipient identity, or a provider/delivery failure.

If client confirmations remain, word them as direct, answerable questions and make clear that the later implementation—not the current analysis—waits on the answers.

## Prevent queue stalls

A request notification is not a worker. Production needs a durable pickup mechanism for new judgment jobs.

A safe watchdog should:

- poll for the oldest claimable job on a short interval;
- use the repository’s lease/claim API rather than inventing a second queue;
- avoid overlapping judge processes with a PID/lock check;
- remain silent when idle;
- surface only launch/inspection failures because normal terminal outcomes already notify the owner through the Blueprint rail;
- rely on idempotency and the second-judge gate for all client sends.

Verify the watchdog once in an empty queue and once with a disposable or expected queued job. Do not report “automation fixed” until the recurring schedule exists and the script can run successfully.

## Client-facing explanation

Use plain language:

- what failed in Karbon rather than blaming the client’s site;
- why the preliminary screenshots were misleading;
- what code and workflow changed;
- what a fresh audit now measures;
- why an email still may be held for real business confirmations.

Never present fallback zeros as poor performance, and never tell a client their site is unreadable when the actual condition was an internal byte ceiling.
