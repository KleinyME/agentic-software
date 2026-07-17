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

When behavior changes, update all affected surfaces:

- Root `README.md` for users and contributors.
- `agentic-software-steward/README-for-humans.md` for installation and everyday operation.
- The owning `SKILL.md` for agent behavior.
- A focused reference file for detailed workflow guidance.
- `agents/openai.yaml` when a skill's user-facing description or default prompt becomes stale.
- Templates when projects created by the suite need the changed contract.

Avoid duplicating long instructions. Keep core commands and the user contract in the README; keep executable agent behavior in skills; keep details in directly linked references.

## Verification

Run before reporting completion:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-skill-suite.ps1
```

Also run focused tests for any changed script. Report the current stage, what was verified, and anything still simulated or unresolved.
