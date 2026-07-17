# Project Steward Skill Suite

This Codex skill suite routes creative, product, technical, data, hardware, and release work without making one professional role the temperament of every task.

Use `project-steward` as the neutral lead for mixed or ambiguous projects. It selects the current work stage, primary craft, freedom zone, protected invariants, and only the risk overlays that actually apply.

Key roles:

- `creative-director`: blank-page invention, brand, marketing, copy, visual and industrial design, campaigns, interfaces, and instrument appearance.
- `design-distinctiveness`: evidence-backed business specificity, customer-job page structure, typography, and cross-concept sameness review.
- `software-steward`: implementation, architecture, data identity, concurrency, integrations, runtime behavior, tests, and technical hardening.
- `project-memory-steward`: progressive lane-scoped memory, technical evidence, and explicit provisional/approved/rejected/superseded decision authority.
- `release-steward`: production promotion and live verification after the result is accepted.

The suite also includes focused brand, visual, copy, frontend-memory, security, environment, no-theater, lean architecture, senior architecture, and repo-foundation specialists. For evidence-grounded client-facing redesigns and concept batches, `design-distinctiveness` runs after positioning and before visual/frontend execution. Load specialists only when the routed work needs them.

## Updating Installed Skills

Codex loads installed skills from `C:\Users\<you>\.codex\skills` at startup. Restart Codex after a sync.

From the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1
```

The updater:

- pulls with `git pull --ff-only` and stops on a nonzero native exit;
- validates skill frontmatter before changing the installed suite;
- tracks the fingerprint of the last synced version;
- refuses to overwrite local installed drift by default;
- stages replacements before swapping them into place;
- backs up every replaced installed skill;
- reports add, update, unchanged, and conflict states.

For a local source checkout without pulling:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1 -NoPull
```

For the first managed sync, or after intentionally promoting installed changes back into the source repository, use:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1 -NoPull -Force
```

`-Force` is an explicit replacement decision. Existing installed skill folders are backed up before replacement.

Preview actions without pulling or writing:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1 -NoPull -DryRun
```

## Personal Auto-Update

The optional logon updater is safe after one managed sync establishes the fingerprint state:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-auto-update.ps1
```

It will stop rather than overwrite if installed skill files were edited outside the source repository. Promote intended local changes into the source, validate them, and run a managed sync before restoring unattended updates.

Remove the hook with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\uninstall-auto-update.ps1
```
