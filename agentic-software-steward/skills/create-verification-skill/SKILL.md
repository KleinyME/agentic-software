---
name: create-verification-skill
description: Generate a project-local verify skill that drives this app the way a user does, with a feature map and captured evidence.
disable-model-invocation: true
---

# Create A Verification Skill

Every serious project needs a scripted way to drive the real app and prove behavior: launch it, exercise a feature the way a user would, and capture evidence. This skill generates that as a project-local skill in the target project's own skills directory (`skills/verify-<app>/`, or wherever that project keeps its skills). Write the generated skill for the next agent, not for a human: it will be read cold, mid-task, by an agent that has never seen the app.

## 1. Interview The Repo, Not The User

Answer these from the codebase, and ask the user only what you cannot observe:

- **Surface:** what does a user actually touch? A website, a web app, a CLI or TUI, a desktop app, an API, a mobile app, a library? A repo can have several; pick the primary one and note the rest.
- **Run:** how does the app start locally? Prefer the repo's own documented dev command: package scripts, Makefile, README quickstart. Note ports, environment variables, seed data, auth.
- **Drive:** how can an agent interact with it programmatically? Existing harnesses first: Playwright or Cypress specs, expect scripts, PTY helpers, curl-able endpoints, a debug port. Only then pick a generic recipe. Default to Playwright or a headless browser for web work; use plain HTTP for services and a PTY or tmux harness for a CLI or TUI.
- **Observe:** what evidence can be captured? Screenshots, accessibility snapshots, terminal transcripts, response bodies, logs, exit codes, database or inbox state.
- **Isolate:** can two instances run side by side (ports, data directories, profiles)? If not, say so in the generated skill: refusing to double-drive a shared instance beats corrupting the user's session.

If the checkout does not build or start as-is, fix that first, or report it precisely, before generating. A skill written against a broken base teaches wrong steps. When an irrelevant missing asset blocks startup (a static directory the API never serves, a sample config), the generated skill may create it, clearly marked as verification scaffolding, and remove it in cleanup.

## 2. Generate The Skill

Write `skills/verify-<app>/SKILL.md` in the target project, with YAML frontmatter (`name: verify-<app>` and a `description` naming the app, the surface, and when to reach for it; without frontmatter the skill never registers) and these sections, each grounded in what the interview actually found. Leave no placeholders.

- **Launch:** the exact command that starts the app for verification, and how to tell it is ready: a log line, a port answering, a prompt. Include teardown. For a short-lived CLI there is no server to keep alive: launch means build the binary or install dependencies once, then start each drive in its own isolated session.
- **Doctor:** one read-only check that answers "is this instance worth driving?" — process up, right version or build, port owned by us, auth valid. An agent runs this first whenever anything looks off.
- **Drive:** the harness recipe with real selectors and commands from this repo, not examples. Prefer stable handles (ARIA roles and accessible names, data attributes, prompt strings, route paths) over coordinates and tab order.
- **Evidence:** what to capture for a proof and where it goes. State the proof standards: exercise the real user path, not internal setters or test-only endpoints; capture the action and the resulting state, not just the final screen; verify side effects (files written, rows inserted, messages delivered) alongside what is visible; use mocks only where a production boundary already isolates the external system. When the safe path is a dry-run or test mode, verify what it actually skips by observing files, network, and git refs, rather than trusting its name.
- **Cleanup:** how to tear down instances the run created. Never kill by process name; kill what you started. Cleanup removes instances and scratch state, never the evidence: proof artifacts survive teardown, in a location the skill names.
- **Helpers:** any script the generated skill ships is executable, and its invocation is shown in the skill body. A helper the reader has to reverse-engineer is not a helper.

## 3. Seed The Feature Map

Create `skills/verify-<app>/features/README.md` plus one file per user-facing feature you can identify, aiming for the top three to five to start, drawn from routes, commands, menus, or docs. Follow the shape in [`references/feature-map-example/README.md`](references/feature-map-example/README.md): a README index and one file per feature. Each file answers, from the user's point of view, what the feature is, how to reach it, how to drive it with the harness, and what observable end state proves it works. The four required H2s are `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, and `Gotchas`, and every feature file ends in the observable end state that proves the feature works. The map is the repo's maintained verification source; a proof that drives one convenient entry point is incomplete when the map lists others.

## 4. Prove The Generated Skill Before Handing It Over

Run its own instructions end to end once: launch, doctor, drive one mapped feature (one is enough; the map exists so later runs cover the rest), capture evidence, clean up. After cleanup, confirm the evidence still exists at the named location — a cleanup that eats the proof fails this step. Fix what fails, and run the generated cleanup after every failed iteration too, so broken attempts do not strand processes and ports. A generated skill that was never executed is a draft, not a deliverable.

## 5. Hand Over

Point the user at `maintain-verification-skill` for keeping the map honest as the app changes. Suggest a cadence only if they ask. Route this run's decision trail through `show-me-your-work` rather than inventing a status format.

## Relation To The Suite

The generated skill is the mechanism `evidence-before-completion` and `no-theater-software` point at for the production-verified stage. A client site reaches production-verified when its verify skill's critical features pass, not when a prose checklist is ticked.
