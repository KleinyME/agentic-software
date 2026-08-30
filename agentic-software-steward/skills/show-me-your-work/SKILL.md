---
name: show-me-your-work
description: Keep a reviewable decision trail for long, multi-phase, or unattended work: one TSV row per decision with why, evidence, and result. Use when a human reviews the run afterward, not for routine edits.
---

# Show Me Your Work

For work a human reviews after the fact, a decision trail lets them reconstruct what was decided, why, and on what evidence, without rerunning the work or reading the whole transcript. Keep one canonical log so the trail is consistent and a future agent can find it.

## The Format

A single TSV file, one row per decision. TSV because a repository host renders it as a sortable table, `column -s$'\t' -t` and spreadsheets read it, and a row appends with one command. Cells stay single-line. Evidence is a pointer, never a paste.

Copy [`references/decision-log-template.tsv`](references/decision-log-template.tsv) (the header row) to start a clean log. Columns:

- **ts.** ISO8601 timestamp. The timeline axis.
- **phase.** The phase or workstream.
- **decision.** What was chosen or done, one line.
- **why.** The reason in plain words. If a principle drove it, say it plainly (`explored options first, this was a one-way door`), not as a jargon tag.
- **evidence.** A link or path that proves it: commit SHA, pull request number, `file:line`, or an artifact, trace, or screenshot path. Never a paragraph.
- **result.** The outcome or predicate state: `tests green`, `reverted`, `pixel-diff 0`, `INCONCLUSIVE`, `open`.

An example, plain-spoken so a reviewer reads it at a glance. This is illustration only; do not copy these rows into a real log.

```
ts	phase	decision	why	evidence	result
2026-05-24T09:02:00Z	frame	counted the work first, about 100 components and roughly 75 hours	wanted to know the size before starting a long run	commit 3a9f1c2	found 5 things to sort out before starting
2026-05-24T09:40:00Z	harness	took screenshots of the old version before changing anything	so we can compare old against new and catch any visual change	scripts/snapshot.sh, baseline/	saved 120 reference screenshots
2026-05-24T11:15:00Z	widget	moved the widget styles over without changing how it looks	keep the change small and the result identical	commit 7c21e0a, pixel-diff 0	looks identical, tests pass
2026-05-24T12:30:00Z	widget	threw out a helper's work because its screenshots were blank	checked the real files instead of trusting its summary	worktree reset	reverted, tightened the instructions for next time
```

## Logging A Row

Write each entry the way you would tell a teammate what you did. Plain words, concrete actions, no AI speak or abstract jargon; `ai-writing-audit` applies to log text too. A reviewer should understand each row without decoding it.

Use the helper so rows stay well-formed: `scripts/log.sh <logfile> <phase> <decision> <why> <evidence> <result>`. It stamps `ts`, writes the header on first use, strips stray tabs and newlines, and prefixes any cell starting with `=`, `+`, `-`, or `@` with a single quote, so a reviewer opening the log in a spreadsheet does not trigger formula execution. A bare `printf` appending a row works too, but mind those same bytes when cells come from generated or user-supplied text.

Log decision points and checkpoints, not every action: a fork chosen, a unit completed with its verification result, a pivot or revert with its trigger, a blocker surfaced, a gate fixed. For repeated iterations, one row per iteration. Skip the trivial and self-evident.

## Where It Lives

By default the log is a working artifact, not committed. Keep it at `decisions.tsv` in the work directory, or `.audit/<task-slug>.tsv` when several efforts run at once, and leave it out of git. Most work does not need a committed trail; the local log still keeps the run honest and can be discarded after.

Commit it only when the work is ambitious enough that a reviewer needs the trail to trust the result: a large cross-language port, a multi-week migration, anything where confidence has to be shown rather than assumed. A committed log renders as a table in the pull request.

## Rules

- One row is one decision or checkpoint. If it does not fit on one line, the decision is not crisp yet.
- Append-only. A wrong call gets a new row that supersedes it. Never edit or delete history.
- Prefer evidence produced by committed scripts over hand-made one-offs, so a reviewer can re-run it.

## Audit The Log Against What Happened

At the end of the run, before handing back, check the log told the truth. Read this run's own transcript or session record where the host exposes one, and otherwise your working notes for the run. Never read other sessions' records to do it; that reads unrelated private work. Walk the log against what actually happened:

- Every row maps to a real action. Cut invented or aspirational entries.
- Each row's evidence resolves and shows what the row claims.
- A fork, pivot, or abandoned approach that shaped the work but is not logged is a gap. Add it.
- Drop padding. If nobody would audit a row, it does not earn its place.

Fix the log, not the story. If the work diverged from what a row claims, the row is wrong.

## Independent Review Of The Trail

Before handing back, dispatch an independent reviewer in a fresh read-only context, using a different model from the producer's where the host offers a choice; otherwise an independent fresh context. Self-review is not a substitute; the point is fresh eyes you cannot bring yourself. The reviewer reads the audit trail and the run's record, then flags what the user should pay attention to. Not a redo of the work, a scan for what is suboptimal or risky:

- Decisions logged with weak or absent evidence.
- Verification steps skipped or claimed without proof.
- Choices that look risky in hindsight: premature, scope-creeping, papering over a symptom.
- Gaps the user would otherwise miss on a casual skim.

Every reply for a run that produced a trail ends with an "Attention" section. Lead with who reviewed it on its own line (`reviewed by <model or independent fresh context>`), then list each flag pointing to specific rows or moments. "No flags" is a valid value; the reviewer's identity is not.

## Reviewing The Trail

Read top to bottom, follow the evidence pointers, spot-check. A committed TSV renders as a table on the repository host; `column -s$'\t' -t decisions.tsv` renders it in a terminal. A row whose evidence does not resolve, or whose result is unverified, is the audit catching a gap.

## Composing This Skill

Other skills route their audit trail here instead of inventing one. Reference this skill by name and let it own the format; do not restate the columns. `site-scorecard` and the Hermes `client-website-delivery` skill route their run trail here rather than maintaining bespoke status prose.
