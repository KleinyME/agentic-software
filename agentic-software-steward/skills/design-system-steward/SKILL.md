---
name: design-system-steward
description: Fallback UI/UX and design-memory workflow when Impeccable is unavailable, and companion workflow for PRODUCT.md and DESIGN.md. Use for UI/UX planning, design system setup, visual consistency, interaction states, accessibility, responsive behavior, and design-memory updates.
---

# Design System Steward

Use this when UI/UX work is needed and Impeccable is not available, or when maintaining project-local design memory.

## Design Memory

Use:

- `PRODUCT.md` for product users, workflows, brand personality, anti-references, and design principles.
- `DESIGN.md` for visual source of truth: tokens plus prose.

Before UI work, read both if present. If missing, create minimal versions from existing UI and user intention.

For client-facing work, use `brand-direction` for positioning and `visual-direction` for business-appropriate art direction, existing client asset reuse, and generated imagery before locking the design system.

## UI Quality Rules

- Build the actual usable experience, not a landing page unless requested.
- Prefer real workflows over decorative surfaces.
- Include empty, loading, error, success, disabled, and permission states where relevant.
- Use consistent components, spacing, typography, and color.
- Keep text inside containers at mobile and desktop sizes.
- Do not introduce fake data unless clearly labeled demo/fixture.
- Use browser or screenshot verification when available.
- Verify imagery, typography, hierarchy, and responsive crops against the approved visual direction, not only against generic consistency rules.

## DESIGN.md Minimum

Include:

- Overview.
- Colors.
- Typography.
- Layout.
- Elevation and depth.
- Shapes.
- Components.
- Do's and don'ts.

When possible, validate with `npx @google/design.md lint DESIGN.md`.

