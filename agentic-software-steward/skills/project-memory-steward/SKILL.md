---
name: project-memory-steward
description: Maintain repo-local project memory for agent-built software. Use when creating or updating PROJECT_MEMORY.md, AGENTS.md, module memory files, ADRs, known risks, setup/test commands, architecture notes, or preserving intention across agent sessions.
---

# Project Memory Steward

Treat project memory as living infrastructure, not scattered docs.

## Required Memory

`PROJECT_MEMORY.md` is the front door. It should explain:

- What the software is for.
- Who it serves.
- What currently works.
- What is prototype/demo/stub only.
- What must not break.
- Main modules and how they connect.
- Data/security assumptions.
- Commands to run, test, build, and verify.
- Known risks and open questions.
- Recent meaningful changes.

`AGENTS.md` tells future agents how to work in the repo.

Module memory files should exist only for meaningful modules and explain:

- What this module owns.
- What it must not own.
- Public interfaces.
- Dependencies.
- How it can break the system.
- Tests.
- Common mistakes to avoid.

## Update Triggers

Update memory when any of these change:

- Product intention.
- Architecture or module responsibility.
- Data shape or persistence behavior.
- Auth/security behavior.
- External integrations.
- Setup, test, build, or deploy commands.
- Known risks.
- Removed/refactored behavior.

Do not log tiny implementation details that do not affect future understanding.

