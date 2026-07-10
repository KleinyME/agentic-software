# Agent Guide

## Start Here

1. Read `PROJECT_MEMORY.md`.
2. For UI work, read `PRODUCT.md` and `DESIGN.md`.
3. For client-review work, read `CLIENT_REVIEW.md` and `DEPLOYMENT_READINESS.md` when present.
4. For module work, read the matching file in `docs/modules/`.
5. Check git status and current branch before editing.

## Project Rules

- Main/master should stay shippable.
- Build the complete intended client-review experience with documented simulations when useful.
- Use a narrow real vertical slice to prove production architecture.
- Do not confuse preview simulations with production-verified behavior.
- Keep review notes and implementation status outside the rendered customer experience.
- For live apps, branch by default and use the safest available environment level for the change.
- Do not test new live external mutations first against production data when a sandbox, dry-run, or adapter test can be used.
- Update project memory when architecture, module ownership, data, security, setup, or meaningful product intent changes.
- Remove replaced code when safe. If not safe, record why and create a dated removal plan.

## Verification

Before saying done, report:

- What works now.
- How it was verified.
- Tests or checks run.
- Current stage and any simulated, fixture, sandbox, connected, or unverified capability.
- Any risks or follow-up items.
