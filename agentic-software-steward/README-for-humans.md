# Agentic Software Steward

This package is a v1 Codex skill suite for active agent-built software stewardship.

Use `software-steward` as the lead skill. It coordinates architecture, project memory, no-theater software, design, brand/copy, security/data safety, live/dev environment safety, release hygiene, repo audits, and remediation planning.

The suite is intentionally modular. Specialist skills should load only when relevant.

Running the steward against a repo should not stop at documentation. It should create foundation memory, inspect the code, produce findings, classify risk, identify fake/unwired behavior, and recommend or perform the first safe remediation.

For live apps, the suite uses a safety ladder. It prefers production plus live-dev/preview environments from the beginning, asks to connect MCPs/plugins when they can set that up safely, and falls back to branch/local/read-only/dry-run workflows when full staging is too much friction.

## Updating Installed Skills

Codex loads installed skills from `C:\Users\<you>\.codex\skills` when it starts. Restarting Codex picks up whatever is already installed there, but it does not automatically pull fresh changes from GitHub.

From this repo, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1
```

That script:

- pulls the latest repo changes with `git pull --ff-only`
- copies every bundled skill into `~\.codex\skills`
- reminds you to restart Codex

For a local-only sync without pulling:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1 -NoPull
```

Avoid silent auto-updates by default. If the suite later gets a scheduled update job, it should be opt-in and should report what changed.

## Personal Auto-Update

If this skill suite is only for you and you are the person changing the repo, auto-update is reasonable.

Install an auto-update hook that updates installed skills at logon:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-auto-update.ps1
```

The installer tries to create a Windows scheduled task. If Windows denies that, it falls back to a per-user Startup shortcut.

The auto-update hook:

- runs at user logon
- executes `scripts/update-installed-skills.ps1`
- pulls with `git pull --ff-only`
- syncs bundled skills into `~\.codex\skills`
- writes logs to `.\logs\skill-auto-update.log`

It does not merge, rebase, or resolve conflicts. If the repo cannot fast-forward, it fails closed and leaves the installed skills as-is.

Remove it with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\uninstall-auto-update.ps1
```
