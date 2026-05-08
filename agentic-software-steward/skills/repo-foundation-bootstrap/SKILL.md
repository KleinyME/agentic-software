---
name: repo-foundation-bootstrap
description: Drop the agentic software stewardship foundation into an existing repository. Use for vibe-coded repos, undocumented projects, production-readiness audits, repo rescue, project memory creation, AGENTS.md creation, PRODUCT.md/DESIGN.md setup, module memory, and identifying fake data, stale docs, dead code, duplicate implementations, and risky areas.
---

# Repo Foundation Bootstrap

Create a project-specific foundation inside an existing repo without inventing certainty.

## Bootstrap Flow

1. Read existing docs, package files, config, routes, entry points, tests, and deployment files.
2. Identify app type, runtime, framework, storage, auth, integrations, and test commands.
3. Ask only intention questions needed to resolve ambiguity.
4. Create or update minimum useful foundation files.
5. Mark each statement as Known from code, Inferred from code, Confirmed by user, Open question, or Risk.
6. Identify theater software, fake data, dead buttons, duplicate systems, stale docs, and dead code.
7. Produce a prioritized plan: stabilize, clarify, modularize, harden, polish.

## Foundation Files

Always consider:

- `AGENTS.md`
- `PROJECT_MEMORY.md`

Create when relevant:

- `PRODUCT.md`
- `DESIGN.md`
- `docs/modules/*.md`
- `docs/quality/definition-of-done.md`
- `docs/quality/no-theater-software.md`
- `docs/security/threat-model.md`
- `docs/architecture/decisions/*.md`
- `docs/brand/voice.md`

Do not create docs without a reader and a maintenance rule.

## Honesty Labels

Use:

- Known from code
- Inferred from code
- Confirmed by user
- Open question
- Risk

This prevents stale project memory from sounding more certain than it is.

