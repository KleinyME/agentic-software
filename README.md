# Project Steward

Project Steward is a coordinated Codex skill suite for work that may be creative, product-focused, technical, data-sensitive, hardware-dependent, operational, or a mixture of several disciplines.

It is designed to solve two common problems in AI-built work:

- Generic, literal, over-explained copy and design.
- Interfaces that look finished while their forms, data, authentication, payments, or integrations are not actually connected.

The suite routes each work unit by its requested stage and primary craft. Creative work receives broad freedom. Technical work receives precise invariants and proof. Mixed work connects the two through a narrow contract so engineering caution does not suppress invention and visual freedom does not corrupt identity, protocol, or runtime truth.

## How It Works

```text
intent + existing evidence + reference sites
-> brand direction and business-specific evidence
-> distinctive structure, typography, copy, and imagery
-> complete client-review preview
-> client refinement and approval
-> real services and content connected
-> production verification and release
-> durable project memory
```

The neutral lead skill is `project-steward`. It routes visual and marketing work to `creative-director`, implementation and integrity work to `software-steward`, and activates security, data, hardware, or release overlays only when the affected artifact requires them.

## What the Skill Asks You

Yes. When launched, the skill inspects the prompt, repo, existing site, and supplied references first, then asks for information that is both missing and important to the result.

Typical questions cover:

- Who the experience should speak to.
- What that person should believe, feel, or do.
- What works about the reference sites.
- What must be different in the new experience.
- The primary business outcome and non-negotiables.

It does not force a long branding questionnaire or ask non-technical users to select implementation details. If enough direction is already present, it begins. If a choice is reversible, it states a reasonable assumption and continues. If a missing answer would create a materially different product, incur meaningful cost, or make a dangerous external change, it pauses for that decision.

Production credentials, payment accounts, OAuth applications, domains, and similar resources are normally not required to build the first client-review preview. They are collected during production connection and tracked in `DEPLOYMENT_READINESS.md`.

## The Four Stages

| Stage | What it means |
| --- | --- |
| Concept preview | Complete look, layout, copy, claims, imagery, intended journey, and useful simulations for review. |
| Functional preview | The frontend works with fixtures, local adapters, sandboxes, or limited real services. |
| Production candidate | Required real client-owned resources are connected and production blockers are resolved. |
| Production verified | The official production workflow has been exercised successfully. |

A Vercel preview URL or similar shareable deployment remains a review environment unless the project explicitly identifies it as production.

## Preview Truth Without Creative Handcuffs

The no-theater rules govern how maturity is represented, not what may be designed.

- Bold marketing claims are welcome in concept previews.
- Simulated dashboards, login states, payments, forms, and integrations may be built to approve the intended experience.
- Generated and provisional imagery may be used for review.
- Internal flags never appear inside the customer-facing page.
- Proposed claims, simulated behavior, asset sources, and open decisions go in `CLIENT_REVIEW.md`.
- After creative approval, unresolved production work moves to `DEPLOYMENT_READINESS.md`.
- Production is not called complete until the promised workflow is genuinely connected and exercised.

## Install

Clone the repository, then run these commands from its root in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-skill-suite.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1 -NoPull
```

Restart Codex after syncing. Installed skills are copied into `C:\Users\<you>\.codex\skills`.

If an older installation exists without sync state, review its local changes and use `-NoPull -Force` for the intentional first managed replacement. The updater backs up replaced folders and refuses untracked drift without that explicit flag.

To update later from the remote repository:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-installed-skills.ps1
```

## Use

Invoke the neutral lead skill when a project is mixed or when you want the requested deliverable—not an inherited role label—to determine the posture:

```text
Use $project-steward to build a client-review preview for this business.
Here is the existing site: [URL]
Here are two reference sites: [URL], [URL]
I like [specific qualities]. It must feel [desired feeling].
The main difference is [difference]. The primary action is [action].
Ask me only for missing decisions that would materially change the result.
```

You can also start with less information:

```text
Use $project-steward to redesign this site for high-end builders and designers: [URL].
Our materials each have a story. Inspect what exists, then ask me what you still need.
```

For the review-to-production transition:

```text
The client approved this direction. Preserve the approved boldness and move the project to a production candidate. Resolve CLIENT_REVIEW.md, create or update DEPLOYMENT_READINESS.md, connect the real services, and verify the critical workflow.
```

## Skill Map

- `project-steward`: neutral stage, craft, authority, and risk-overlay router.
- `creative-director`: high-freedom brand, marketing, visual, interface, campaign, and physical-appearance work.
- `design-distinctiveness`: business vernacular, customer-job page structure, typographic specificity, and multi-concept anti-sameness review.
- `software-steward`: implementation, architecture, identity, data, protocol integration, runtime correctness, and technical verification.
- `brand-direction`: references, audience, feeling, differentiation, and anti-anchoring.
- `visual-direction`: business-fit art direction, authorized client imagery, and generated assets.
- `brand-copy-steward`: persuasive copy, brand alignment, and claims workflow.
- `100-year-copywriting-engine`: strong promises, offers, headlines, and persuasive structure.
- `ai-writing-audit`: removes formulaic AI habits without flattening approved voice.
- `no-theater-software`: truthful stage representation and production requirements.
- `live-environment-steward`: preview, sandbox, credentials, and live-environment boundaries.
- `release-steward`: promotion, rollback awareness, and live verification.
- Architecture, security, project-memory, and repo-bootstrap skills support the workflow when needed.

## Repository Layout

```text
agentic-software-steward/
  skills/                 installable skills and their resources
  third_party/            attribution for adapted third-party work
scripts/
  validate-skill-suite.ps1
  update-installed-skills.ps1
agentic-software-steward-definition.md
```

Read [the human guide](agentic-software-steward/README-for-humans.md) for a shorter operational overview. Agents working on this repository must also follow [AGENTS.md](AGENTS.md).

## Validate Changes

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-skill-suite.ps1
```

The validator checks skill structure, required behavior contracts, bundled scripts, templates, and whitespace integrity.
