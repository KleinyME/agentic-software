# Agent Guide

## Start Here

1. Read `PROJECT_MEMORY.md`.
2. For UI work, read `PRODUCT.md` and `DESIGN.md`.
3. For module work, read the matching file in `docs/modules/`.
4. Check git status and current branch before editing.

## Project Rules

- Main/master should stay shippable.
- Prefer small working vertical slices over large fake features.
- Do not present fake data, dead buttons, or unwired UI as complete.
- For live apps, branch by default and use the safest available environment level for the change.
- Do not test new live external mutations first against production data when a sandbox, dry-run, or adapter test can be used.
- Update project memory when architecture, module ownership, data, security, setup, or meaningful product intent changes.
- Remove replaced code when safe. If not safe, record why and create a dated removal plan.

## Verification

Before saying done, report:

- What works now.
- How it was verified.
- Tests or checks run.
- Any fake/demo/stub data remaining.
- Any risks or follow-up items.
