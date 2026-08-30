# Agent Guide

## Purpose

This repository maintains a cohesive skill suite, not a loose collection of prompts. Preserve the end-to-end contract: understand client intention, create a bold clean preview, document unresolved truth outside the page, connect real production resources, verify behavior, and leave durable memory.

## Before Editing

1. Read the root `README.md` and `agentic-software-steward-definition.md`.
2. Read the complete `SKILL.md` for every skill being changed.
3. Follow `agentic-software-steward/skills/project-steward/SKILL.md` as the neutral routing contract.
4. Read only task-relevant referenced resources, but read selected instruction files completely.
5. Check the current branch and working tree. Preserve unrelated user changes.

## Behavioral Contract

- Inspect the prompt, repo, current site, and supplied references before asking questions.
- Ask only for missing information whose answer materially changes the result.
- Ask about audience, desired outcome, feeling, differences, constraints, approval, and real-world consequences.
- Do not ask non-technical users to select libraries or architecture unless they introduced that decision.
- State a reasonable default and continue for reversible choices.
- Pause when an unresolved decision would materially alter the product, create meaningful cost, or authorize a risky external action.
- Do not require production credentials to create a concept preview unless the user specifically requests real connection at that stage.
- Keep claim flags, simulation notes, provenance, implementation status, and developer commentary out of rendered customer experiences.
- Track preview decisions in `CLIENT_REVIEW.md` and production dependencies in `DEPLOYMENT_READINESS.md`.
- Permit strong proposed marketing claims in preview; prove, build, adjust, or remove them before production.
- Treat reference sites as direction, never as sources to copy wording, layouts, or imagery.
- Never call a capability production-ready until its promised workflow has been exercised.
- Let the primary craft chair the current pass. Supporting disciplines may protect named invariants but must not take over the task.
- Treat creative direction as provisional, approved, rejected, or superseded with explicit scope. Existing files and implementations are not approval.
- Load memory progressively by current stage, craft, and activated overlay instead of preloading the project's entire risk history.

## Documentation Responsibilities

Each meaning has one home. When behavior changes, edit that home and let the
pointers stand:

- Executable agent behavior lives in the owning `SKILL.md`.
- Doctrine cited by more than one skill lives in one principle card and is
  referenced by name, never restated.
- Detail lives in a directly linked reference file.
- The root `README.md` carries the user contract and the install commands only.
- `agents/openai.yaml` keeps the same invocation setting as its `SKILL.md`.

Do not copy an instruction into a second file to make it more visible. A rule a
script can check belongs in `scripts/validate-suite.mjs`, not in prose.

## Authoring Standard

Follow `agentic-software-steward/skills/writing-for-agents/SKILL.md`. Its bar is
enforced mechanically: skills default to `disable-model-invocation: true`, a
model-invoked description stays under 350 characters and names what does not
trigger it, and the always-loaded surface stays inside its budget.

## Verification

Run before reporting completion:

```bash
node scripts/validate-suite.mjs --report
```

On Windows the full suite validator runs the same checks plus the Codex-specific ones:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-skill-suite.ps1
```

Also run focused tests for any changed script. Report the current stage, what was verified, and anything still simulated or unresolved.
