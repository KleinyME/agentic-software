# Hermes runtime skills (versioned mirror)

Canonical, version-controlled copies of skills deployed into the Nous Hermes
agent's own skill tree.

Common runtime roots are:

- Hermes Desktop: `%LOCALAPPDATA%\hermes\skills\`
- Legacy managed runtime: `D:\Hermes\Runtime\karbon\skills\`

That runtime tree is not a git repository — a Hermes reinstall or update
wipes it. This directory is the source of truth; the runtime copy is the
installed instance.

Deploy after editing here, using the runtime root that actually exists on the
machine. For Hermes Desktop:

```powershell
node scripts/sync-skills.mjs --target hermes --hermes-dir "$env:LOCALAPPDATA\hermes\skills"
```

For the legacy managed runtime:

```powershell
node scripts/sync-skills.mjs --target hermes --hermes-dir "D:\Hermes\Runtime\karbon\skills"
```

Set `HERMES_SKILLS_DIR` once and the flag becomes optional. Add `--dry-run` to see
the plan first. The sync is fingerprinted and idempotent: unchanged skills are left
alone, a skill edited directly in the runtime tree is reported as a conflict and is
**not** overwritten without `--force`, and anything it does replace is backed up
first. Run `node scripts/sync-skills.mjs --report --hermes-dir <path>` to see what
the runtime actually holds right now.

The previous instruction here was a manual `Copy-Item` kept in step by
discipline, which is how the two sides drift. Prefer the sync script; a manual
copy records no state, so the next sync cannot tell your edit from ours.

The Hermes target installs two versioned sources without touching unrelated
Hermes skills:

- the canonical Agentic Software suite under
  `agentic-software-steward/<skill-name>`;
- Hermes-only skills under their native paths, such as
  `software-development/client-website-delivery`.

Codex and Claude receive the canonical suite as a flat skill directory. The
Windows-only `scripts/update-installed-skills.ps1` remains available for a
Codex-style flat destination.
