# Hermes runtime skills (versioned mirror)

Canonical, version-controlled copies of skills that are DEPLOYED into the
Nous Hermes agent's own skill tree at `D:\Hermes\Runtime\karbon\skills\`.

That runtime tree is not a git repository — a Hermes reinstall or update
wipes it. This directory is the source of truth; the runtime copy is the
installed instance.

Deploy after editing here (or after editing live and mirroring back):

```bash
node scripts/sync-skills.mjs --target hermes --hermes-dir "D:\Hermes\Runtime\karbon\skills"
```

Set `HERMES_SKILLS_DIR` once and the flag becomes optional. Add `--dry-run` to see
the plan first. The sync is fingerprinted and idempotent: unchanged skills are left
alone, a skill edited directly in the runtime tree is reported as a conflict and is
**not** overwritten without `--force`, and anything it does replace is backed up
first. Run `node scripts/sync-skills.mjs --report --hermes-dir <path>` to see what
the runtime actually holds right now.

The previous instruction here was a manual `Copy-Item` kept in step by discipline,
which is how the two sides drift. Prefer the sync script; the copy still works in a
pinch but records no state, so the next sync cannot tell your edit from ours. These are distinct from
`agentic-software-steward/skills/`, which install into Codex skill roots via
`scripts/update-installed-skills.ps1`; runtime skills live inside the Hermes
agent's own layout instead.
