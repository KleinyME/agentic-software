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
- authority and loading map for deeper artifacts;
- main modules and ownership;
- environment and release truth;
- commands to run, test, build, and verify;
- known risks and open decisions;
- recent meaningful changes.

Put deep design, domain, protocol, security, module, and release material in scoped files. Link them from the front door with a clear `load when` condition.

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

Examples include assembly identity, inventory location, CAN protocol definitions, electrical circuit evidence, authentication, and deployment targets. These should be discoverable without loading them into unrelated creative work.

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

Do not record tiny implementation details or speculative concerns that do not help a future task route correctly.
