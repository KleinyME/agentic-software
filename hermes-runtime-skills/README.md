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
machine. This example targets Hermes Desktop:

```powershell
$source = Join-Path $PWD "hermes-runtime-skills\software-development\client-website-delivery"
$hermesSkills = Join-Path $env:LOCALAPPDATA "hermes\skills\software-development"

if (-not (Test-Path -LiteralPath $hermesSkills -PathType Container)) {
  throw "Hermes skill root not found: $hermesSkills"
}

Copy-Item -Recurse -Force -LiteralPath $source -Destination $hermesSkills
```

For an existing target, compare or back it up before replacement. Restart
Hermes after adding or changing a runtime skill.

Keep both sides in sync in the same change. These are distinct from
`agentic-software-steward/skills/`, which install into Codex skill roots via
`scripts/update-installed-skills.ps1`; runtime skills live inside the Hermes
agent's own layout instead.
