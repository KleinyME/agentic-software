# Review: mattpocock/skills and cursor/plugins (pstack) vs. this repo

Date: 2026-08-30
Baseline: this repo at main (`d2ddc26`), mattpocock/skills at current main, cursor/plugins pstack v0.14.5.

## Executive summary

Both professional repos are dramatically **smaller** than this one while doing more work per token,
and both are built on the same two disciplines this repo lacks:

1. **A managed always-loaded surface.** They treat every character of a skill description as a
   permanent per-turn tax and prune it ruthlessly, using the invocation axis (model-invoked vs
   user-invoked) to take most skills out of context entirely.
2. **Procedure over doctrine.** Almost every skill is either a one-page rule card or a stepped
   procedure with checkable completion criteria. Philosophy lives in one place, once.

This repo's content quality per line is genuinely high — the audit found no slop register, zero
broken references, professional third-party attribution, and better install tooling
(`sync-skills.mjs`) than either professional repo ships. The problem is architecture: ~612KB of
skill markdown, ~4k tokens of always-loaded descriptions, six doctrines restated across a dozen
files, and a routing model ("project-steward loads first") that no host actually enforces. The
five best skills here (`request-triage`, `site-scorecard`, `audience-boundary`,
`root-cause-debugging`, `ai-brand-voice`) already meet the professional bar. The leverage move is
to make the other twenty look like those five, not to add anything.

### Headline metrics

| | This repo | mattpocock/skills | pstack |
|---|---|---|---|
| Skills | 28 | 37 | 45 (21 are one-page principles) |
| Total SKILL.md lines | 3,425 | 2,465 | 2,307 |
| Total skill markdown | ~612KB / ~85k words | small (bodies 7–140 lines) | small (+ ~1,050 lines tested TS tooling) |
| Always-loaded description chars | 13,778 (avg 459/skill) | 5,367 (avg 145) | 9,461 (avg 210, most descriptions removed from model reach via `disable-model-invocation`) |
| Largest SKILL.md | 213 lines / 20KB | 140 lines | 229 lines |
| Smallest useful skill | 43 lines | **7 lines** (`grill-me`) | 7 lines (`bro`) |
| Behavioral evals | none (fixtures without a runner) | model-relative "no-op test", run the doc | blinded eval playbook, transcript-graded |

This repo's SKILL.md line count alone exceeds either professional repo's **entire** skill surface,
with fewer skills.

---

## How the professionals do it

### mattpocock/skills: writing theory, minimal surface, human-in-the-loop flows

The repo's own `writing-for-agents` skill is a complete authoring theory, and the repo visibly
practices it on itself:

- **Context pointers.** A skill description and an AGENTS.md line are the same object: "The
  pointer's *wording*, not its target, decides when the agent reaches the material… A must-have
  target behind a weakly worded pointer is a variance bug." Rules: front-load the leading word,
  one trigger per branch (collapse synonyms), cut identity the body already carries.
- **The two loads.** Every document spends either *context load* (always-loaded tokens) or
  *cognitive load* (the human must remember it exists). Most of his skills are **user-invoked**
  (`disable-model-invocation: true`): zero context load, description reduced to a one-line human
  label. Model invocation is reserved for skills the agent (or another skill) must reach alone.
- **7-line alias skills.** `grill-me`'s entire body is `Call the Skill tool with "grilling"`.
  Composition is one line: `grill-with-docs` = "Call the Skill tool twice, for 'grilling' and
  'domain-modeling'." Human-memorable entry points cost nothing; the discipline lives once.
- **Checkbox completion criteria and hard gates.** `diagnosing-bugs` Phase 1: name one command,
  already run at least once, red-capable, deterministic, fast. "No red-capable command, no
  Phase 2." Plus a self-interrupt: "If you catch yourself reading code to build a theory before
  this command exists, stop."
- **Frontier questionnaires** (`grilling`): dependency-ordered question rounds, each question
  numbered with a recommended answer, and a division of labor in one line: "Finding *facts* is
  your job, never the user's."
- **Tiny lazily-created state records with supersession** (ADRs, learning records): sequential
  `0001-slug.md`, "1–3 sentences", a 3-condition gate before creating one, `superseded by` status
  instead of deletion.
- **Single source of truth as policy**: one canonical install block copied verbatim everywhere;
  the environment (package.json, `--help`) counts as a source of truth and restating it is a
  "cache" that goes stale; a repo-level invariant that the router (`ask-matt`) is re-synced on
  every skill change ("a router that lies").
- **Negation as failure mode**: "Don't think of an elephant, and the elephant is all there is."
  State the positive target; a prohibition earns its place only as a hard guardrail paired with
  the positive.
- **The no-op test**: an instruction the model already obeys by default pays load to say nothing.
  Model-relative, settled "by running the document, not by debate."

Not worth copying: the aihero.dev/Total TypeScript business coupling, the em-dash ban, the
GitHub-only issue-tracker stance.

### pstack: process compliance, multi-model adversarialism, autonomy

One sticky front-door mode (`/poteto-mode`) routes every task to one of 22 playbooks; playbooks
call ~20 workflow skills; everything is grounded in 21 one-page principle skills.

- **Principles as skills.** Each is 16–34 lines, `disable-model-invocation: true`, description
  phrased "Apply when X. <rule in one sentence>", body Rule → Why → Pattern. They exist as
  separate files so other skills can cite a principle **by name** without restating it, humans can
  steer with one phrase, and evals can grade whether the agent actually read the leaf file. The
  mode skill carries an inline index of all 21.
- **Playbooks copied verbatim into the todo list**, with mandatory `skip: <reason>` on any step
  not done. "Skipping silently is not allowed." Process compliance becomes a visible artifact.
- **Subagent prompts as reference files** with fill-in slots (`{INTENT}`, `{RUBRIC_CONTENTS}`).
  Same prompt to all reviewers; "the adversarial signal comes from model diversity, not assigned
  personas." Prompts are versionable, reviewable files.
- **Lead-judgment buckets** for review synthesis: Act on / Consider / Noted / Dismissed, with
  per-dismissal reasons. "The 'Dismissed' section is not busywork. It's a trust mechanism." "If
  your 'Act On' list has more than 5 items, you're probably not filtering hard enough."
- **The verification-skill / feature-map pattern** (`create-verification-skill`): generate a
  project-local `verify-<app>` skill (Launch/Doctor/Drive/Evidence/Cleanup) plus one file per
  feature ending in "what observable end state proves it works", proven once end-to-end before
  handover. "A generated skill that was never executed is a draft, not a deliverable."
- **Decision logging as one composable skill** (`show-me-your-work`): a single TSV with a helper
  script, an end-of-run log-vs-transcript audit ("Fix the log, not the story"), and the rule
  "Other skills route their audit trail here instead of inventing one."
- **Evidence ladders**: blast-radius's 5-rung sureness scale ("you said so → file:line → walked
  the failure → ran it → reproduced in the app") and the central move: "find the one fact it's
  safe because of," then prove it by running code.
- **Prototype-instead-of-ask**: if a fork "is a fact you could observe by running something… it is
  not the human's to answer." Build the probe.
- **Failure-cost annotations**: rules justified with priced incidents — "a one-line fix that swept
  its ancestors severed a 41-PR chain and cost a day of repair"; "Twenty-one verdicts went stale
  this way in one run with no signal at all." Far more persuasive to a model than abstract rules.
- **Blinded skill evals**: banned meta-vocabulary in anything the candidate sees, one judge one
  pass, chain-following graded from transcript file-reads, not self-report.
- **Structure over instructions, applied to itself**: a plan linter script; a reflection step that
  demotes any lesson a lint could enforce; "encode the rule as a lint, metadata flag, runtime
  check, or script instead of more text."

Not worth copying: Cursor-specific frontmatter (`mode:`, `reminder:`), hard-coded model slugs,
Graphite dependency, the style micro-legislation ("write like hemingway" enforced by exact string
match in CI), and the sheer instruction mass of the full stack (its own orchestrate playbook
admits a case where the ceremony landed 1 unit while a plain agent landed 12).

---

## The five big gaps in this repo

### 1. The always-loaded surface is unmanaged (highest-leverage fix)

~13.8k characters (~3.5–4k tokens with YAML/name overhead) of descriptions load into **every**
session in every synced context, whether or not any steward work is happening. Neither
professional repo pays anything close, and both got there the same way: most skills are
user-invoked with a one-line human label; only skills the agent must reach alone keep a trigger
description. This repo uses the invocation axis on zero of its 28 skills. Worst offenders:
`workflow-automation-architect` (~1,000 chars), `site-scorecard` (~640), `exponential-strategy`
(~600), `graph-engineering` (~600), `software-steward` (~570).

Several descriptions also claim overlapping universal jurisdiction — `software-steward` (all
code), `brand-copy-steward` (all visible words, via its "Automatic UI Rule"),
`workflow-automation-architect` ("during every software build"), `evidence-before-completion`
(every completion claim). A single "add a settings page" task nominally matches 8–10 skills, and
nothing at runtime resolves the collision. The always-on skills are also precisely the ones
missing when-NOT clauses.

### 2. The routing model is fiction; the professionals make routing mechanical

The suite is written as if `project-steward` loads first and delegates. In a flat skills
directory, nothing enforces that. Matt solves this with a user-invoked router (`ask-matt`) that
only *hints*, plus an explicit call convention ("Call the Skill tool with 'grilling'" — never a
path, never a bare `/name`), plus a repo invariant that the router is re-synced whenever any skill
changes. pstack solves it with a sticky mode whose first todo item is reading the inline
principles index, and playbook steps copied verbatim into the todo list with `skip: <reason>`
accountability. Both mechanisms are observable; a description-triggered routing *hope* is not.

### 3. Doctrine is quadruplicated; procedure is the exception

Reckless AI appears in 5 places; the four stages in 4; the preview-pointer branch model in 5; the
specialist routing table in 3; CLIENT_REVIEW/DEPLOYMENT_READINESS rules in 7+ skills; three
different claim-status vocabularies exist for one claims policy. AGENTS.md institutionalizes this
by mandating updates to "all affected surfaces." Matt's rule is the direct fix: single source of
truth per meaning, one-place edits, and pointers everywhere else. pstack's version: cite the
principle **by name**; the rule text lives in exactly one leaf file.

Meanwhile the register of most skills is operating philosophy ("Own technical correctness without
turning engineering temperament into the personality of the entire project") rather than steps.
The repo's own best skills prove it knows the right format — endpoints, lane tables, enums,
numbered workflows, "Done Means" — and then most of the suite doesn't use it.

### 4. Speculative infrastructure vs. earned skills

`exponential-strategy` (206 lines of OpenExO vocabulary whose honest default output is silence),
the executive-cell/OB1 material in `workflow-automation-architect` and `graph-engineering`, and
38.6KB of eval fixtures with no runner are book reports and proof ceremony — the exact things
`lean-product-architect` warns against. Both professional repos ship only what their authors run
weekly, and pstack goes further: every hard rule carries the incident that paid for it. This
repo's equivalent earned material — `client-website-delivery`'s 15 pitfalls, `request-triage`'s
lane table, `site-scorecard`'s frozen-lane/judge-separation rules — is its most valuable content
and is currently buried in the junk drawer or mixed into a "generic" suite it doesn't belong to.

### 5. Validation pins phrases; the professionals test behavior

`validate-skill-suite.ps1`'s literal-phrase "behavior contracts" (e.g. release-steward must
contain an exact sentence) freeze wording, punish legitimate rewrites, and pass even if the
surrounding behavior is gutted. Matt's test is model-relative and empirical ("settle it by running
the document, not by debate"). pstack runs blinded evals and grades principle-following from
transcript file-reads. The link checker and frontmatter checks here are worth keeping; the phrase
pinning is not.

---

## What this repo does well (keep it)

- **`scripts/sync-skills.mjs`** is better install tooling than either professional repo ships:
  fingerprinting, drift refusal, backups, orphan preservation, `--report`, zero deps, tested.
- **Zero broken file references** across all 28 skills, enforced by the validator.
- **Third-party hygiene**: in-skill LICENSE/NOTICE, `third_party/` attribution, explicit
  "adapted from" lines. More professional than most public skill repos.
- **Honest capability claims**: "a skill-based instruction harness, not a durable job runtime";
  the schema-mirror script refuses to fake a pass when its source of truth is absent.
- **Real institutional memory** in the ops skills (request-triage, site-scorecard,
  client-website-delivery pitfalls) — the one thing that cannot be downloaded from someone
  else's repo.
- **Original ideas worth preserving through any rewrite**: the `x-authority` approval-metadata
  contract, the CLIENT_REVIEW.md claim-register pattern, audience-boundary's source→sink tracing
  with tests-for-absence, graph-engineering's Loop Test, lean-product-architect's complexity
  budget, and the anti-anchoring creative doctrine.
- **Consistent editorial voice**: no emoji, no hype, imperative register. The prose is good;
  there is just five times too much of it, in too many places.

---

## Recommendations

### P0 — structural (do these first; everything else compounds on them)

1. **Adopt the invocation axis.** Classify every skill: does the *agent* need to reach it
   unprompted? If not, set `disable-model-invocation: true` and cut the description to one human
   line. Realistic model-invoked survivors: `root-cause-debugging`, `evidence-before-completion`,
   `audience-boundary`, `brand-copy-steward` (if the Automatic UI Rule stays), maybe
   `no-theater-software`. Everything else — routers, strategy lenses, ops skills you invoke by
   name — goes user-invoked. Target: always-loaded surface under 1k tokens (from ~4k).
2. **Rewrite the surviving descriptions as pointers** per Matt's rules: front-load the trigger
   word, one trigger per genuinely distinct branch, cut identity the body carries, and add an
   explicit when-NOT clause to every always-on skill.
3. **Collapse the meta-documents.** README.md, README-for-humans.md,
   agentic-software-steward-definition.md, and AGENTS.md restate each other. Keep one
   authoritative doctrine file; each doctrine (Reckless AI, four stages, branch model, routing,
   claims policy) gets exactly one home and one claim-status vocabulary; everything else points.
   Delete AGENTS.md's "update all affected surfaces" rule — it institutionalizes duplication.
4. **Split Karbon ops from the portable suite.** `request-triage`, `site-scorecard`, and the
   Karbon parts of `client-website-delivery` are the best skills here *and* unusable outside your
   business (Windows `D:\` paths, Karbon endpoints). Give them a `karbon/` namespace the way
   `hermes-runtime-skills/` already namespaces the runtime lane, so the portable suite stays
   portable.

### P1 — convert doctrine to the two professional formats

5. **Principle cards.** Convert the philosophy content (project-steward's posture,
   software-steward's harness doctrine, no-theater, Reckless AI, lean doctrine) into
   pstack-style one-page principles: `disable-model-invocation: true`, description "Apply when X",
   body Rule → Why → Pattern, ≤30 lines. One router/mode skill carries the inline index. Other
   skills cite principles by name, never restate them.
6. **Procedures with completion criteria.** Every remaining workflow skill gets the
   request-triage treatment: numbered steps, hard gates with checkable bounds
   ("No red-capable command, no Phase 2"), and a "Done Means" section. Kill any sentence that
   fails Matt's no-op test (would the model behave differently without it?).
7. **Shrink `client-website-delivery` into an index.** SKILL.md keeps the workflow; the 15
   incident recoveries move to references by branch ("If the preview port doesn't match → read
   X"). While moving them, add pstack-style cost annotations ("this cost a redelivery on <date>")
   — you already have the incidents; price them.
8. **Cut or archive the speculation**: `exponential-strategy` (or make it a one-page principle
   card), the OB1/executive-cell references, `platform-specs.md` (self-admittedly stale),
   `super-bowl-ad-bible.md` (53KB — gate it behind an explicit branch or drop it), and
   `validation-scenarios.md` unless a runner exists within a month.

### P2 — mechanics worth stealing outright

9. **7-line alias skills** for your common entry points (e.g. `/new-client-site` →
   "Call the Skill tool with 'brand-direction' then 'design-distinctiveness'"). Zero context
   load, human-memorable, composition in one line.
10. **Playbooks-into-todos with `skip: <reason>`** for the delivery workflows — turns your
    checklists into auditable artifacts instead of prose the agent may or may not follow.
11. **A grilling-style frontier questionnaire** to replace the intake sections of
    project-steward/brand-direction: rounds ordered by dependency, every question carrying a
    recommended answer, "finding facts is the agent's job, never the user's."
12. **A verification-skill/feature-map generator** for client sites: per-feature files ending in
    "what observable end state proves it works." This is the professional version of
    evidence-before-completion — executable, not exhortative.
13. **One decision-log skill** (TSV + helper script) that the other skills route through instead
    of each inventing status/memory artifacts.
14. **Replace phrase-pinning validation** with: the existing link/frontmatter checks, a
    description-length lint (fail any model-invoked description over ~350 chars), an
    openai.yaml coverage check (13 of 27 currently missing), and a small blinded triggering-eval
    set (skill-creator's eval tooling, or pstack's eval playbook shape).
15. **Fix README drift now** (small, embarrassing, cheap): `brand-copy-steward` listed twice, the
    "## What the Skill Asks You" heading answered by a dangling "Yes.", the Repository Layout
    omitting `hermes-runtime-skills/` and 5 of 7 scripts, and the Codex-only install framing when
    cross-platform sync exists.

### What NOT to import

- pstack's Cursor frontmatter (`mode:`, `reminder:`), model slugs, Graphite mechanics, and prose
  micro-legislation.
- Matt's business funnels and house-style bans.
- Neither repo's scale of ceremony wholesale: pstack itself documents a case where its own
  orchestration ceremony lost to a plain agent 12-to-1. Adopt the shapes, not the mass.

---

## Bottom line

You didn't build slop — you built a cathedral. The professionals build toolboxes. Their skills are
small because each one encodes exactly one workflow its author actually repeats, triggered by a
carefully priced pointer, with everything else pushed behind progressive disclosure or into a
script. Your repo already contains five toolbox-grade skills and the best installer of the three
repos; the work is subtraction and restructuring, not addition. If you do only one thing: take the
invocation axis seriously and get the always-loaded surface from ~4,000 tokens to under 1,000 —
every session, in every context, pays that tax today.
