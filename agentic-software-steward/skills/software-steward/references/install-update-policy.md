# Companion Skill Install And Update Policy

Do not silently install companion skills.

## Detection

Before using a companion skill, check whether it is available in the current skill list.

Expected companions:

- Installed frontend/design craft skills for high-quality implementation and polish.
- `imagegen` for generated or edited raster imagery.
- `100-year-copywriting-engine` for copywriting, ads, emails, landing pages, headlines, and sales copy.

Bundled specialists that should be used directly when this suite is installed:

- `project-steward` for neutral stage, craft, and risk-overlay routing.
- `creative-director` for high-freedom visual, brand, marketing, and physical-appearance work.
- `brand-direction` for reference-led brand direction and anti-anchoring.
- `visual-direction` for art direction, client asset collection, and generated imagery.
- `ai-writing-audit` for context-aware final editorial review.

## If Present

Use the companion skill directly.

## If Missing

Ask permission before installation. Explain:

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

100-year-copywriting-engine:
  source: bundled in this package when present
```

## Pinning

For serious projects, prefer a release tag or commit SHA over pulling from `main`.

## Updates

Do not update vendored companion skills during normal product work.

Use a separate update workflow:

1. Record current version/ref.
2. Install or vendor the new version.
3. Preserve license and notice files.
4. Run skill validation.
5. Run at least one relevant validation scenario.
6. Summarize behavior changes.

## Fallback

If a companion cannot be installed or used:

- Continue with built-in fallback instructions.
- Record that the specialist skill was unavailable.
- Avoid pretending the specialist review occurred.

