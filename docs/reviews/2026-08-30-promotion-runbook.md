# Promotion runbook: suite 0.16.0

Status: the branch is a validated release candidate. **Nothing below has reached a live
host yet.** Global Codex, Claude, and AbeL/Hermes all still run the previous 29-skill suite.
`sync-skills` tests passing means the synchronization mechanism works, not that any
installation has received this.

## What promotion does and does not change

It upgrades how agents work *on* Karbon. It does not alter Karbon's application, database,
Blueprint workflow, Telegram delivery, or production website.

What improves:

- Automatic prompt overhead falls: 22 skills are automatically selectable instead of all 45.
- Debugging discipline through `diagnosing-bugs`.
- Preview, production, and release judgment through `environment-and-release`.
- Proof through `show-me-your-work` and the verification-map skills.
- Architecture and continuity through `domain-modeling`, `senior-architect`, `handoff`,
  and `writing-for-agents`.

Karbon's existing local design and copy skills are untouched and remain available.

**On "zero cost".** A user-invoked skill costs zero *automatic* prompt tax, because its
description is not in the always-loaded surface. It still consumes context and tokens when
deliberately loaded. The 5,171-character figure is the always-loaded surface only.

## Behavior changes that need an operator decision

`workflow-automation-architect` and `exponential-strategy` are now user-invoked. They will no
longer surface merely because an automation opportunity or strategy angle exists. Karbon's
department architecture routes sales and marketing work to both, so AbeL's department workflow
must now invoke them **explicitly** when designing or evaluating an experiment. This is
workable, but it is a real change in behavior, not just in cost.

## Sequence

1. **Version.** Suite is bumped to 0.16.0. Skill names and invocation behavior changed, so
   the old and new suites must not both answer to "v0.15".
2. **Patch Karbon's renamed skill reference.** `src/server/features/buildPassTelegramDecisions.ts:94`
   asks for the retired `live-environment-steward`:
   ```
   skillHints: ["software-steward", "live-environment-steward", "design-distinctiveness"],
   ```
   becomes
   ```
   skillHints: ["software-steward", "environment-and-release", "design-distinctiveness"],
   ```
   This lands in the Karbon-AI repository, not here.
3. **Document the under-described commit in the PR.** Commit `8c9601c` silently carried the
   `intent-aligned-review` merge and `maintain-verification-skill` because two agents landed
   files between validation and staging. The content is correct and validated; only the message
   is incomplete. Note it in the PR rather than rewriting pushed history.
4. **Merge the branch into `main`.**
5. **Synchronize that exact main commit** into Codex, Claude, and Hermes:
   ```bash
   node scripts/validate-suite.mjs --report
   node scripts/sync-skills.mjs --report
   node scripts/sync-skills.mjs --target codex,claude,hermes --retire
   ```
6. **Retire the removed skills.** `--retire` backs up and removes exactly the folders named in
   `agentic-software-steward/retired-skills.json`: `root-cause-debugging`,
   `live-environment-steward`, `release-steward`. Without it, a host keeps both the retired
   skill and its replacement, recreating the duplication this migration removed. Unrelated
   orphans are never touched. Everything removed is recoverable from the timestamped backup
   directory the run prints.
7. **Restart or reload each host**, then re-run `sync-skills.mjs --report` and confirm the
   resolved paths and fingerprints are the ones you expect at each destination.
8. **Verify against Karbon.** Run the Hermes checks and a real Blueprint-to-preview rehearsal.

## Blocking prerequisite, unrelated to this suite

Hermes reports its terminal at `D:\Karbon-AI` while the canonical checkout is
`D:\Karbon-AI-active`. Reconcile that in `config.yaml` **before** step 5. Installing a correct
suite into a runtime pointed at the wrong checkout produces a clean install that verifies
against the wrong tree.

## Deliberately not done

Namespacing the Karbon operations skills and adapting `reflect` are open judgments about the
business, not mechanical cleanup. Neither blocks promotion.
