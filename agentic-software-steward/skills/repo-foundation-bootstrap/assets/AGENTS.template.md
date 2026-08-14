# Agent Guide

## Start Here

1. Read the compact front door in `PROJECT_MEMORY.md`.
2. Select the current work stage and primary craft, then load only matching memory.
3. For UI work, inspect `PRODUCT.md` and `DESIGN.md` authority metadata before loading the full files. Only approved matching scope constrains implementation.
4. For client-review work, read `CLIENT_REVIEW.md`; read `DEPLOYMENT_READINESS.md` only when connecting or releasing.
5. For module, domain, protocol, security, or release work, read only the matching scoped memory.
6. Check git status and current branch before editing.
7. State the intended actor, outcome, success evidence, and prohibited outcome before meaningful architecture work.

## Project Rules

- Main/master should stay shippable.
- Build the complete intended client-review experience with documented simulations when useful.
- Use a narrow real vertical slice to prove production architecture.
- Do not confuse preview simulations with production-verified behavior.
- Keep review notes and implementation status outside the rendered customer experience.
- For live apps, branch by default and use the safest available environment level for the change.
- Do not test new live external mutations first against production data when a sandbox, dry-run, or adapter test can be used.
- Update project memory when architecture, module ownership, data, security, setup, or meaningful product intent changes.
- Record creative and product direction as provisional, approved, rejected, or superseded with scope and approval evidence. Existing UI is not approval.
- Remove replaced code when safe. If not safe, record why and create a dated removal plan.
- Reclassify risk and architecture when code, tests, or review reveal a boundary-crossing change.
- Diagnose root cause before applying bug fixes; test one hypothesis at a time.
- Review meaningful work for intent compliance before engineering quality.
- Surface exponential-strategy ideas only when evidence shows a compounding learning, context, ecosystem, or coordination mechanism; never force an MTP or Intelligence Stack onto ordinary feature work.
- Before shipping any user-facing artifact, keep system/developer instructions, private reasoning, audit state, claim flags, simulation notes, secrets, and implementation commentary out of rendered output and client payloads. Enforce an explicit public DTO or view-model boundary when internal and public data share a path.
- Treat every newly created user-visible string as product work. Read product and brand context, avoid generic filler, review material claims, and never render a raw model or agent response.
- Do not claim completion without fresh evidence for the actual user outcome.

## Verification

Before saying done, report:

- What works now.
- How it was verified.
- Tests or checks run.
- Current stage and any simulated, fixture, sandbox, connected, or unverified capability.
- Any risks or follow-up items.
