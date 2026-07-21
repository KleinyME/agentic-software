# Hermes runtime skills (versioned mirror)

Canonical, version-controlled copies of skills that are DEPLOYED into the
Nous Hermes agent's own skill tree at `D:\Hermes\Runtime\karbon\skills\`.

That runtime tree is not a git repository — a Hermes reinstall or update
wipes it. This directory is the source of truth; the runtime copy is the
installed instance.

Deploy after editing here (or after editing live and mirroring back):

```powershell
Copy-Item -Recurse -Force `
  "D:\Projects\agentic-software\hermes-runtime-skills\software-development\client-website-delivery" `
  "D:\Hermes\Runtime\karbon\skills\software-development\"
```

Keep both sides in sync in the same change. These are distinct from
`agentic-software-steward/skills/`, which install into Codex skill roots via
`scripts/update-installed-skills.ps1`; runtime skills live inside the Hermes
agent's own layout instead.
