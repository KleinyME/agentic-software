# Specialist Skill Install And Update Policy

Do not silently install companion skills.

## Detection

Before using a specialist skill, check whether it is available in the current skill list.

Bundled specialists in this package:

- Installed frontend/design craft skills for high-quality implementation and polish.
- `imagegen` for generated or edited raster imagery.
- `ai-brand-voice` for creating brand voice files.
- `100-year-copywriting-engine` for copywriting, ads, emails, landing pages, headlines, and sales copy.
- `brand-copy-steward` for routing product, brand, and marketing copy work.

External companion specialists:

- `impeccable` for high-quality UI/UX craft.

Bundled specialists that should be used directly when this suite is installed:

- `project-steward` for neutral stage, craft, and risk-overlay routing.
- `creative-director` for high-freedom visual, brand, marketing, and physical-appearance work.
- `brand-direction` for reference-led brand direction and anti-anchoring.
- `design-distinctiveness` for business-specific page structure, typography, and cross-concept sameness review.
- `visual-direction` for art direction, client asset collection, and generated imagery.
- `ai-writing-audit` for context-aware final editorial review.

## If Present

Use the specialist skill directly.

## If Missing

For bundled specialists, report that the installed package appears incomplete or stale and continue with the nearest built-in fallback.

For external companion specialists, ask permission before installation. Explain:

- What skill is missing.
- Why it helps this task.
- Where it will be installed from.
- That Codex may need a restart before the skill is available.

Use the `skill-installer` workflow when available.

## Preferred Sources

```text
impeccable:
  repo: pbakaus/impeccable
  path: .agents/skills/impeccable
  license: Apache-2.0
  note: preserve LICENSE and NOTICE if vendored

ai-brand-voice:
  source: bundled in this package
  path: skills/ai-brand-voice

100-year-copywriting-engine:
  source: bundled in this package
  path: skills/100-year-copywriting-engine

brand-copy-steward:
  source: bundled in this package
  path: skills/brand-copy-steward
```

## Pinning

For serious projects, prefer a release tag or commit SHA over pulling from `main`.

## Updates

Do not update vendored or bundled specialist skills during normal product work.

Use a separate update workflow:

1. Record current version/ref.
2. Install or vendor the new version.
3. Preserve license and notice files.
4. Run skill validation.
5. Run at least one relevant validation scenario.
6. Summarize behavior changes.

## Fallback

If a specialist cannot be installed or used:

- Continue with built-in fallback instructions.
- Record that the specialist skill was unavailable.
- Avoid pretending the specialist review occurred.
