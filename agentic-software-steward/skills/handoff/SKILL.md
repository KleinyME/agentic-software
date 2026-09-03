---
name: handoff
description: Compact this session into a handoff note for the next agent.
disable-model-invocation: true
---

Write a handoff document summarising the current conversation so a fresh agent can continue the work.

Save it outside the workspace, in a directory only the current user can read. A handoff summarises a whole session, so a world-readable location hands that session to every account on a shared machine.

- Linux: `$XDG_STATE_HOME/agent-handoff`, defaulting to `~/.local/state/agent-handoff`.
- macOS: `$TMPDIR/agent-handoff`, which is per-user, not `/tmp`.
- Windows: `%LOCALAPPDATA%\agent-handoff`.

Create the directory `0700` and the file `0600`. Do not write to the shared system temp directory: `/tmp` is world-readable on most Linux systems, and a file written there keeps default permissions unless you set them.

Include a "suggested skills" section in the document, naming which skills the next agent should call the Skill tool for.

Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.

Durable intent, architecture, and operational facts belong in project memory through `project-memory-steward`, not in a handoff note that expires with the session.
