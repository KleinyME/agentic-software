# Agentic Software Steward

A Codex skill suite for turning client intention into a bold review preview, then connecting and verifying the real production experience.

## What It Does

The lead `software-steward` routes one cohesive workflow:

```text
intent and references
-> brand and visual direction
-> copy and implementation
-> clean client-review preview
-> production readiness
-> promotion and verification
-> memory
```

The suite supports sites, landing pages, portals, dashboards, applications, repo rescue, architecture, security/data work, preview environments, and releases.

## Starting A Project

Invoke `$software-steward` and provide whatever you already know: an existing site, reference sites, desired audience, feeling, meaningful differences, business goal, or constraints.

The skill inspects those inputs first. It then asks only for missing answers that materially change the work. It does not force a questionnaire. When the direction is sufficiently clear, it begins immediately; when a choice is reversible, it states a reasonable assumption and continues.

Production credentials and integrations normally wait until after concept approval. A first preview can show the complete intended experience while `CLIENT_REVIEW.md` records proposed claims, provisional assets, and simulated behavior outside the page.

Example:

```text
Use $software-steward to reimagine [existing URL] for [new audience].
Use [reference URLs] as a grounding baseline, not templates.
I want it to feel [feeling], and the important difference is [difference].
Inspect what exists and ask me only for missing decisions that would materially change the result.
```

## Important Boundaries

- Prototypes and simulations are encouraged during client review.
- Review notes never bleed into the rendered page.
- Bold proposed claims are allowed in previews and resolved before production.
- A shareable deployment is not production unless the project designates it as the official production target.
- Production is complete only when required services are connected and the promised workflow is exercised.

## Key Skills

- `brand-direction`: references, desired feeling, positioning, and anti-anchoring.
- `visual-direction`: business-fit art direction, client imagery, and generated assets.
- `brand-copy-steward`: persuasive copy and claim review.
- `ai-writing-audit`: remove formulaic AI patterns without bleaching voice.
- `no-theater-software`: stage-aware preview and production truth.
- `live-environment-steward`: preview, sandbox, client resources, and production boundaries.
- `release-steward`: promotion and live verification.

## Updating Installed Skills

Codex loads installed skills from `C:\Users\<you>\.codex\skills` when it starts.

From this repo, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1
```

For local sync without pulling:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1 -NoPull
```

Restart Codex after syncing changed skills.

Validate the complete suite before syncing:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-skill-suite.ps1
```

Auto-update remains optional for a personal installation:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-auto-update.ps1
```

Remove it with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\uninstall-auto-update.ps1
```

The updater uses fast-forward-only pulls and does not resolve conflicts.
