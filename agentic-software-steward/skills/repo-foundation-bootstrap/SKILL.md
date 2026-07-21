---
name: repo-foundation-bootstrap
description: Drop the agentic software stewardship foundation into an existing repository. Use for vibe-coded repos, undocumented projects, production-readiness audits, repo rescue, project memory creation, AGENTS.md creation, PRODUCT.md/DESIGN.md setup, module memory, and identifying fake data, stale docs, dead code, duplicate implementations, and risky areas.
---

# Repo Foundation Bootstrap

Create a project-specific foundation inside an existing repo without inventing certainty.

## Active Bootstrap Contract

This skill is not a passive documentation generator.

When asked to run against a repo, do not stop after creating `AGENTS.md`, `PROJECT_MEMORY.md`, or quality docs. A complete bootstrap includes:

1. Foundation docs.
2. A repo audit with findings, severity, evidence, and recommended action.
3. A truthfulness inventory of real, prototype, demo, fixture, and stub behavior.
4. A first remediation recommendation.
5. A clear statement of whether code was changed, and if not, why not.

If the repo has obvious low-risk issues, fix one or more in the same pass after the foundation is established. If the repo is high-risk, stop before risky edits and produce the safest next plan.

## Bootstrap Flow

1. Read existing docs, package files, config, routes, entry points, tests, and deployment files.
2. Identify app type, runtime, framework, storage, auth, integrations, and test commands.
3. Ask only intention questions needed to resolve ambiguity.
4. Create or update minimum useful foundation files. Mark new product and design direction `provisional` unless explicit approval evidence already exists.
5. Mark technical statements as Known from code, Inferred from code, Confirmed by user, Open question, or Risk. Track creative and product decisions separately as provisional, approved, rejected, or superseded.
6. Identify theater software, fake data, dead buttons, duplicate systems, stale docs, and dead code.
7. Search for concrete evidence: `mock`, `fake`, `sample`, `placeholder`, `TODO`, `FIXME`, `later`, `stub`, `dummy`, hard-coded dashboard values, empty handlers, disabled controls, skipped tests, duplicate helpers, commented-out legacy code, and direct secret usage.
8. Create or update `docs/quality/repo-audit.md` using the repo audit template when useful.
9. For web builds, set link-preview metadata in the FIRST iteration — per-page
   `<title>`, meta description, canonical, `og:title/description/url/type/site_name`,
   `og:image` (1200×630 with width/height/alt), and `twitter:card/title/description/image`.
   A first preview shared in chat or social must never render as a bare URL.
   Mark the og:image `provisional` if it is a placeholder; release-steward
   re-verifies all of it at go-live.
10. Produce a prioritized plan: stabilize, clarify, modularize, harden, polish.
11. Take the first safe remediation step or state why implementation should wait.

## Foundation Files

Always consider:

- `AGENTS.md`
- `PROJECT_MEMORY.md`

Create when relevant:

- `PRODUCT.md`
- `DESIGN.md`
- `docs/modules/*.md`
- `docs/quality/definition-of-done.md`
- `docs/quality/no-theater-software.md`
- `docs/security/threat-model.md`
- `docs/ops/live-environment-policy.md`
- `docs/architecture/decisions/*.md`
- `docs/brand/voice.md`
- `CLIENT_REVIEW.md` for a client-review preview.
- `DEPLOYMENT_READINESS.md` when an approved preview is moving toward production.

Do not create docs without a reader and a maintenance rule.

Do not create docs as a substitute for fixing known broken or fake behavior.

Do not make the observed UI or starter template canonical merely because foundation files are being created. Record exact approval scope and evidence before promoting a direction.

## Honesty Labels

Use:

- Known from code
- Inferred from code
- Confirmed by user
- Open question
- Risk

This prevents stale project memory from sounding more certain than it is.

## Finding Format

Use this format for actionable findings:

```text
[Severity] Title
Evidence: file/path:line or search result
Why it matters: plain-language risk
Recommended action: concrete next step
Owner skill: project-steward | creative-director | software-steward | no-theater-software | security-data-safety | senior-architect | design-system-steward | release-steward
```

Severity:

- Critical: can leak/delete/corrupt data, break auth, charge money incorrectly, or block safe release.
- High: production-facing behavior is fake, insecure, or likely to fail.
- Medium: maintainability, duplication, missing verification, confusing module boundary.
- Low: cleanup, naming, docs polish, minor clarity.
