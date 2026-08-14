---
name: project-memory-steward
description: Maintain concise, lane-scoped repo memory with explicit evidence and decision authority. Use when creating or updating PROJECT_MEMORY.md, AGENTS.md, PRODUCT.md, DESIGN.md, module or protocol memory, ADRs, known risks, setup/test commands, approval status, superseded direction, or preserving intention across agents without letting provisional aesthetics or unrelated technical history become universal constraints.
---

# Project Memory Steward

Make memory a routing front door, not a personality transplant or an archive dump.

## Front Door

`PROJECT_MEMORY.md` should remain compact and explain:

- product purpose and current working truth;
- protected invariants and what they apply to;
- authority owners, scopes, and loading map for deeper artifacts;
- main modules and ownership;
- environment and release truth;
- commands to run, test, build, and verify;
- known risks and open decisions;
- recent meaningful changes.

Put deep design, domain, protocol, security, module, and release material in scoped files. Link them from the front door with a clear `load when` condition.

For meaningful active work, preserve the durable parts of the intent and situation decision: actor, outcome, success evidence, prohibited outcomes, current architecture mode, risk overlays, sources of truth, and specific reclassification triggers. Keep transient task mechanics out of project memory.

`AGENTS.md` tells future agents how to work in the repo.

For repositories with meaningful cross-module, temporal, or supersession relationships, add a compact typed relationship map to `PROJECT_MEMORY.md` or a linked small YAML/JSON file. Prefer edges such as `OWNS`, `DEPENDS_ON`, `IMPLEMENTS`, `VERIFIED_BY`, `DECIDED_BY`, `SUPERSEDES`, `AFFECTS`, and `RUNS_IN` over vague "related to" links. Include a source pointer and effective/observed time for facts that can change. Do not add a graph database when a Markdown table is sufficient; use `graph-engineering` when the relationship model or retrieval path needs design.

For qualified automation opportunities, keep a compact `Automation Opportunities` section or export the portable record from `workflow-automation-architect`. Record only `could_automate`, `should_automate`, or `architecture_input` candidates with a stable key, evidence source, observed time, status, method/topology recommendation, and next decision. Do not store speculative `watch` items or duplicate dismissed suggestions. Keep the user's standing automation preference in user-level memory such as OB1/OpenBrain rather than copying it into every repository.

## Two Independent Truth Systems

Do not mix factual evidence with decision approval.

Use evidence labels for technical or operating claims:

- `verified-from-system`
- `source-backed`
- `user-confirmed`
- `inferred`
- `open`
- `risk`

Use authority states for product and creative decisions:

- `disposable`
- `provisional`
- `approved`
- `rejected`
- `superseded`

A technically verified implementation may still express a provisional or rejected design. An approved visual direction does not prove its backend is connected.

When authority is distributed, record who or what governs each affected decision or fact and its scope. Do not assume one global approver or load unrelated authority maps.

## Authority Metadata

Use this file-level contract for `PRODUCT.md`, `DESIGN.md`, and scoped direction files:

```yaml
x-authority:
  state: provisional
  scope: global
  basis: owner-brief
  approval: null
```

When approved:

```yaml
x-authority:
  state: approved
  scope: route:/dashboard
  basis: client-review-preview-2026-07-17
  approval:
    by: owner-name
    at: 2026-07-17
    ref: CLIENT_REVIEW.md
```

Rules:

- A direction constrains new work only when its state is `approved` and its scope matches.
- Missing authority metadata defaults to `provisional` for creative work.
- Existing UI, screenshots, commits, lint success, repeated reuse, and detailed prose are evidence, not approval.
- Split partial approval into scoped files rather than marking a mixed document globally approved.
- Rejected and superseded directions may remain as anti-reference memory but cannot constrain implementation.
- Technical invariants and aesthetic direction must be approved or verified independently.

## Progressive Loading

1. Read `AGENTS.md` and the compact `PROJECT_MEMORY.md` front door.
2. Select the current stage, primary craft, and activated overlays.
3. Load only the matching approved direction, module, domain, protocol, security, or release material.
4. Load `CLIENT_REVIEW.md` for direction review; load deployment readiness only when connecting or releasing.
5. Follow deeper links only when the work crosses a boundary or a conflict requires them.

Precedence:

1. Explicit current user instruction.
2. Narrower matching approved scope.
3. Approved global direction.
4. Provisional same-lane direction as inspiration.
5. Observed UI, template, archive, or reference as evidence only.

Do not blend conflicting approved directions. Record a decision conflict and request owner direction when the conflict materially changes the outcome.

This precedence orders discretionary decisions. It does not allow an approval to override an externally binding requirement or verified domain fact; those constrain only their matching scope.

## Approval Promotion

Promote a decision transactionally in one change:

1. Record the approval and exact scope in `CLIENT_REVIEW.md` or equivalent evidence.
2. Update the artifact's `x-authority` metadata.
3. Update the `PROJECT_MEMORY.md` authority and loading map.
4. Mark replaced direction `superseded` or `rejected`.
5. Add a dated meaningful-change entry.

Never promote a draft because it was implemented, published to a preview, or expensive to create.

## Module And Domain Memory

Create scoped memory only for meaningful ownership boundaries. Record:

- what the module or domain owns and must not own;
- public interfaces and canonical data;
- protected invariants;
- dependencies and failure modes;
- evidence level and tests;
- common mistakes.

Examples include persistent identity, location semantics, device-protocol definitions, electrical evidence, authentication, and deployment targets. These should be discoverable without loading them into unrelated creative work.

## Update Triggers

Update memory when any of these change:

- product intention or primary workflow;
- approval, rejection, replacement, or supersession of direction;
- architecture or module responsibility;
- protected identity, data shape, or persistence behavior;
- auth, privacy, security, protocol, or physical-control behavior;
- external integrations or environment ownership;
- setup, test, build, deploy, or verification commands;
- known risks or removed behavior.
- Load-bearing dependency, verification, supersession, environment, or temporal relationships.
- Accepted, dismissed, implemented, measured, or retired automation opportunities.
- Product intent, prohibited outcomes, source-of-truth, architecture mode, or risk-overlay changes.
- New verification commands, regression evidence, or known verification gaps future agents must understand.

Do not record tiny implementation details or speculative concerns that do not help a future task route correctly.
