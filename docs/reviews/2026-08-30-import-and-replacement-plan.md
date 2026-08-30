# Import and replacement plan: what to bring in from mattpocock/skills and pstack

Date: 2026-08-30
Companion to: `2026-08-30-professional-skills-repos-review.md` (the comparative review).
Scope: which external skills are better than ours and should replace or merge with ours,
which fill holes we have, which to skip — planned against the broader removal/replacement
picture, not as additions on top of the current 28.

## Ground rules

- **Licensing**: both repos are MIT (Matt Pocock 2026; Lauren Tan 2026). Import freely with
  attribution via the existing `third_party/` convention (LICENSE + NOTICE in-skill, source
  pinned in `third_party/`), same as we did for ai-writing-audit and the 100-year engine.
- **Net reduction**: every import must replace, merge into, or retire something. The suite's
  problem is mass, not missing content. Skill *count* may stay similar (principle cards are
  tiny); always-loaded surface and total markdown must drop.
- **Adaptation tax**: Matt's skills are near harness-agnostic (he ships the same
  `agents/openai.yaml` convention we already use — his imports are cheap). pstack skills need
  Cursor-isms stripped: `mode:`/`reminder:` frontmatter, Task-tool params
  (`subagent_type`, `readonly`, `environment: "cloud"`), hard-coded model slugs,
  `~/.cursor/rules/*.mdc` paths, Graphite. The *shapes* transfer; the plumbing doesn't.

---

## Tier 1 — import, because theirs is better or we have nothing

### 1. `diagnosing-bugs` (Matt) replaces `root-cause-debugging` — **clear upgrade**

Head-to-head, ours is a competent generic checklist; his is a discipline with teeth. Where ours
says "Reproduce consistently when safe," his Phase 1 declares "**This is the skill.** Everything
else is mechanical," lists ten loop-construction strategies in preference order (failing test →
curl → CLI diff → headless browser → trace replay → harness → fuzz → bisection → differential →
HITL script), tells you to tighten the loop (faster, sharper, deterministic), handles flaky bugs
by raising reproduction rate, and gates everything on a checkbox completion criterion: one named
command, already run once, red-capable / deterministic / fast / agent-runnable. "No red-capable
command, no Phase 2," plus the self-interrupt: "If you catch yourself reading code to build a
theory before this command exists, stop." Then minimise-until-every-element-is-load-bearing,
3–5 falsifiable ranked hypotheses shown to the user (non-blocking), `[DEBUG-a4f2]`-tagged
instrumentation so cleanup is one grep, regression test only at a *correct seam* ("If no correct
seam exists, that itself is the finding"), and a cleanup checklist. Ours has none of that
mechanism.

**Carry over from ours into the adapted import** (three things worth keeping):
- The live-incident/safety routing line (route to live-environment and security overlays before
  intrusive diagnostics) — his skill has redaction but not environment-safety routing.
- The circuit breaker: "After three rejected fix attempts… stop patching symptoms" and reassess
  with the user.
- The hard rule against weakening tests/timeouts/retries to make symptoms disappear (his Phase 6
  implies it; ours states it — keep the statement, positively phrased).

Also import his `scripts/hitl-loop.template.sh` (44 lines, harness-agnostic bash).

### 2. `grilling` + `grill-me` (Matt) — **fills a hole; replaces intake prose in three skills**

We have no interviewing mechanism, only prose about interviewing (project-steward's questions
list, brand-direction's intake, senior-architect's "Inputs To Gather", README's "What the Skill
Asks You"). Grilling is 28 lines and is a *mechanism*: model the interview as a design tree, ask
the **frontier** (every question whose prerequisites are settled) in numbered rounds, give a
recommended answer per question so the user can accept in a word, and — the line that pays for
the whole import — "Finding *facts* is your job, never the user's" (dispatch lookups, never ask
the user for anything discoverable). Done when the frontier is empty.

Import near-verbatim (it is fully harness-agnostic). Add `grill-me` as the 7-line user-invoked
alias. Then **delete** the intake sections from project-steward, brand-direction, and
senior-architect and replace each with one line: invoke grilling with the domain's decision
list. That's three duplications retired by one 28-line import.

### 3. `writing-for-agents` + `SKILL-MECHANICS.md` (Matt) — **the authoring standard for the whole migration**

Nothing in our repo governs how skills themselves are written; AGENTS.md governs surfaces and
mandates duplication. Import both files as our authoring skill and make them the acceptance bar
for every rewrite in the migration: pointer rules for descriptions, the two loads, the
information-hierarchy ladder, completion-criteria clarity/demand, leading words,
positive-over-negation, the no-op test, and the invocation-axis mechanics
(`disable-model-invocation`, router skills). This import is what keeps the rest of the plan from
regressing.

### 4. `create-verification-skill` + `maintain-verification-skill` (pstack) — **highest business value**

This pair turns our two doctrine skills (`no-theater-software`, `evidence-before-completion`)
into a mechanism. It generates a project-local `verify-<app>` skill (Launch / Doctor / Drive /
Evidence / Cleanup) plus a feature map — one file per feature ending in "what observable end
state proves it works" — proven once end-to-end before handover ("A generated skill that was
never executed is a draft, not a deliverable"). The maintain skill re-syncs the map with three
exact outcomes (clean/changed/blocked).

For the Karbon business this is the professional version of what client-website-delivery's
checklist is reaching for: every client site gets a `verify-<slug>` skill, and "production
verified" becomes "the verify skill's critical features pass," not a 30-item prose checklist.
Adaptation: replace Cursor control-adapter references with Playwright/headless-browser driving
(already our stack), strip model slugs. `evidence-before-completion` then shrinks to a short
gate card that *points at* the project's verify skill.

### 5. `handoff` (Matt) — **16 lines, no counterpart, import verbatim**

Session handoff notes to the OS temp dir, tailored to what the next session is for, referencing
artifacts by path instead of duplicating them, secrets redacted. We have project memory but no
session-to-session handoff. Zero adaptation needed.

### 6. `domain-modeling` + `CONTEXT-FORMAT` + `ADR-FORMAT` (Matt) — **fills a hole, shrinks two of ours**

Nothing in our suite maintains a domain glossary; vocabulary drift is exactly the failure our
multi-skill copy chain suffers from (three claim-status vocabularies for one policy). Import the
skill: challenge terms, sharpen fuzzy language, update CONTEXT.md inline, lazily created files,
ADRs gated by a three-condition test and capped at "1–3 sentences." Consequences:
- `project-memory-steward` shrinks to its genuinely original part (the `x-authority`
  approval-metadata contract) and delegates glossary/decision records to domain-modeling's
  formats.
- `repo-foundation-bootstrap`'s ADR template gets replaced by the minimal ADR-FORMAT.

### 7. `blast-radius` (pstack) — **50 lines, no counterpart**

"You have a small-looking change and want to know what else it could break." The 5-rung evidence
ladder (you said so → file:line → walked the failure → ran it → reproduced in the app) and the
central move — "find the one fact it's safe because of," then prove it by running code — give
our review/completion chain something none of our skills has: a calibrated sureness scale.
Mostly host-agnostic; light adaptation.

### 8. `unslop` (pstack) merges into `ai-writing-audit` — **merge, don't run both**

These are different jobs and ours is the right frame for client copy: `ai-writing-audit`
protects approved voice, persuasive force, and the claims workflow — unslop would happily flatten
a bold marketing claim. But unslop's numbered 31-pattern catalog (AI vocabulary, fancy-ways-to-
say-"is", inline-header lists, "say what it does, not how it feels", the could-appear-in-any-
project's-docs test) is more concrete than our `references/checklist.md`. Merge unslop's catalog
into ai-writing-audit's reference (attributed), keep our skill as the brand-aware wrapper, and
drop unslop's absolutist style bans (its em-dash prohibition is house taste, not craft).

---

## Tier 2 — merge their mechanics into ours (no wholesale import)

### 9. `interrogate` mechanics into `intent-aligned-review`

Keep ours as the frame — its Pass One (intent and requirement compliance before engineering
quality, `pass | fail | needs_intent`, "Do not perform agreement" on external feedback) is
genuinely good and **neither professional repo has it**. Import from interrogate:
- The reviewer prompt as a slotted reference file (same prompt to all reviewers; diversity from
  independent fresh contexts, not personas).
- Lead-judgment buckets: **Act on / Consider / Noted / Dismissed**, Dismissed mandatory with
  per-item rationale ("a trust mechanism"), plus "If your 'Act On' list has more than 5 items,
  you're probably not filtering hard enough."
- The agreement map for multi-reviewer runs.
Adaptation: fan-out only where the host supports subagents (Claude Code: yes, with model
choices; Codex: degrade to a single independent-context review). Our "Independence And Graph
Use" section is replaced by this mechanism.

### 10. `architect` (pstack) mechanics into `senior-architect`

Adopt the spine — Ground (how/why the area works) → Sketch (usage-first: "The caller's usage is
the spec") → Agree (opt-in checkpoint, default proceed) → Implement (deviations are signal) →
Scrap (rewrite triggers are *patterns* of friction, not vibes) — plus two references worth
taking nearly verbatim: `design-red-flags.md` (Ousterhout: shallow modules, information leakage,
pass-through methods) and `rationale-template.md` (Alternatives-considered is required). Keep
our lean-redirect rule and decision-cards ("explain the human tradeoff, recommend a default,
never ask for technology names unless the user introduced them" — that's better than anything in
either repo for non-technical clients). Drop the arena dependency; make competing sketches
optional.

### 11. pstack principle cards drive the doctrine conversion (P1 of the main review)

Import the *format* (16–30 lines, `disable-model-invocation: true`, description = "Apply when X",
body Rule → Why → Pattern, indexed inline by the router) and adapt these specific cards, each
retiring restated doctrine of ours:

| Adapted card | Retires |
|---|---|
| `never-block-on-the-human` | Reckless AI's five restatements (README, README-for-humans, definition, project-steward, software-steward) — one card, one home |
| `prove-it-works` | evidence-before-completion's exhortative half (the gate logic survives as a short card pointing at the project verify skill) |
| `subtract-before-you-add` + `laziness-protocol` (merged into one card) | lean-product-architect's doctrine half (its complexity budget survives as the card's reference) |
| `encode-lessons-in-structure` | AGENTS.md's "update all affected surfaces" culture; also becomes the standing rule that retires phrase-pinning validation |
| `guard-the-context-window` | scattered subagent-dispatch advice in software-steward/graph-engineering |
| `fix-root-causes` | becomes the index pointer to the new diagnosing-bugs skill |

### 12. `show-me-your-work` (pstack), adapted

One TSV decision log + a stamp script, an end-of-run log-vs-transcript audit ("Fix the log, not
the story"), and the rule "Other skills route their audit trail here instead of inventing one."
Adopt as the single audit-trail mechanism; site-scorecard and client-website-delivery point at it
instead of maintaining bespoke status prose. Keep its formula-injection guard in the script.

### 13. `reflect` (pstack), adapted, later

The continual-improvement loop we lack: post-task reviewers over the session, Accepted /
Rejected / Backlog, a structural-enforcement pass (anything a lint could enforce moves to
Backlog), and mandatory human approval before skill edits. Cursor-coupled (transcript paths), so
schedule after the structural work; in Claude Code, run it against the session summary or a
handoff doc instead of raw transcripts.

---

## Explicit skips (and why)

- **poteto-mode + playbooks wholesale** — adopt only the pattern (steps copied verbatim into
  todos with `skip: <reason>`) inside our own delivery workflows. The full stack is Cursor/
  Graphite/multi-model plumbing, and its own orchestrate playbook documents losing 12-to-1 to a
  plain agent when the ceremony outweighs the task.
- **why / how / recall / teach (pstack)** — good skills, but heavy (why is 229 lines + 12
  references), transcript/MCP-coupled, and they fill no current gap in the client-delivery
  business. Revisit after the diet if investigation work becomes a lane.
- **arena / swarm** — host-specific parallelism; in Claude Code the Agent tool covers the need
  ad hoc. Not worth permanent catalog slots now.
- **babysit / shipping** — Graphite stack operations manuals; our release-steward + host PR
  automation covers the lane.
- **no-comments / Comment Sicko** — entertaining and sound, but our codebase-comment volume
  isn't a live problem; optional later.
- **technical-writing (pstack)** — 130 lines of doc standards; our writing lane is brand-side,
  already covered by the copy chain.
- **Matt's triage / to-tickets / wayfinder / implement flow** — built around a GitHub-issues
  operating model we don't run. His `.out-of-scope/` rejection-knowledge-base *convention* is
  worth copying for the repo (documentation-by-refusal), without the skills.
- **Matt's setup-matt-pocock-skills / teach / course tooling, pstack's make-bot-ui /
  setup-pstack** — environment- or business-specific. Our sync tooling is already better than
  both repos' installers; keep it.
- **benny (pstack automations)** — not now, but flag it: a triage-then-reproduce automation pack
  with fail-closed Slack posture is a credible future shape for Karbon client-request intake.
  Its FOR_AGENTS.md convention (first-person intent doc as setup entry point, config outside the
  pack) is worth copying whenever we build any automation pack.

---

## Where every current skill lands

| Current skill | Disposition |
|---|---|
| project-steward | Keep, rewritten as a thin router card + grilling for intake |
| software-steward | Keep, slimmed to technical contract + routing; harness doctrine → principle cards |
| creative-director | Keep (no counterpart anywhere — our moat) |
| brand-direction | Keep; intake section → grilling |
| design-distinctiveness | Keep (move the SEO/answer-engine content to site-scorecard's domain) |
| visual-direction | Keep as-is (already has a tested script — best-practice shape) |
| design-system-steward | Fold into visual-direction/design references; retire the skill |
| brand-copy-steward | Keep, trimmed; decide explicitly whether the Automatic UI Rule survives as one of the few model-invoked triggers |
| 100-year-copywriting-engine | Keep, gated harder; drop `platform-specs.md`, gate or drop the 53KB ad bible |
| ai-writing-audit | Keep as brand-aware wrapper; **merge unslop catalog** into its checklist (attributed) |
| ai-brand-voice | Keep as-is (already the model format) |
| audience-boundary | Keep as-is (best generic skill we have) |
| no-theater-software | Convert to principle card; enforcement moves to **verify skills** |
| evidence-before-completion | Convert to short gate card pointing at project verify skill (**prove-it-works** adaptation) |
| intent-aligned-review | Keep Pass One; **merge interrogate mechanics** (buckets, slotted reviewer prompt) |
| root-cause-debugging | **Replace with adapted diagnosing-bugs** (+ our 3 carried-over elements) |
| lean-product-architect | Convert to principle card + complexity-budget reference |
| senior-architect | **Merge with pstack architect** spine + red-flags/rationale references |
| repo-foundation-bootstrap | Keep; ADR template → Matt's minimal ADR-FORMAT |
| project-memory-steward | Shrink to x-authority contract; glossary/ADRs → **domain-modeling** |
| security-data-safety | Keep as short overlay card (it's already only a checklist; make it honest about that) |
| live-environment-steward | **Merge with release-steward** into one environments-and-promotion skill (they share the safety ladder nearly verbatim) |
| release-steward | ↑ merged |
| workflow-automation-architect | Retire; extract topology-vs-method and the friction-observer idea into a graph-engineering reference |
| graph-engineering | Trim to the Loop Test + node/edge contracts as a card + reference |
| exponential-strategy | Remove (or one principle card if the lens is still wanted) |
| local-client-prospector | Keep (Karbon namespace); fix its 9-word description |
| request-triage | Keep, move to `karbon/` namespace |
| site-scorecard | Keep, move to `karbon/` namespace; audit trail → show-me-your-work |
| client-website-delivery (Hermes) | Keep; SKILL.md becomes index, pitfalls → references with cost annotations; verification → per-client **verify skills** |

**New imports:** grilling, grill-me, writing-for-agents, handoff, domain-modeling,
diagnosing-bugs (as replacement), blast-radius, create-verification-skill,
maintain-verification-skill, show-me-your-work, ~6 principle cards, reflect (later).

Net effect: similar skill count (~30), but principle cards and aliases are 7–30 lines,
nearly everything goes user-invoked, and the always-loaded surface drops from ~13.8k chars
toward the sub-1k-token target while total markdown falls by more than half.

---

## Sequencing

1. **Import `writing-for-agents` first** — it is the standard the rest is graded against.
2. **Structural pass** (P0 from the main review): invocation axis, meta-doc collapse, `karbon/`
   namespace split. Imports land into the new structure, not the old one.
3. **Drop-in imports** (cheap, independent): grilling + grill-me, handoff, blast-radius,
   diagnosing-bugs replacement, domain-modeling.
4. **Merges** (touch existing skills): unslop→ai-writing-audit, interrogate→intent-aligned-review,
   architect→senior-architect, live+release merge.
5. **Mechanism conversions**: principle cards (retiring the doctrine restatements),
   create/maintain-verification-skill + first real `verify-<client>` generated for an active
   Karbon site as the proving run, show-me-your-work adoption.
6. **Later**: reflect adaptation, benny-shaped intake automation, `.out-of-scope/` convention.

Attribution for every import: NOTICE in-skill + entry in `third_party/` with source repo,
commit, and MIT license text — same treatment ai-writing-audit already has.
