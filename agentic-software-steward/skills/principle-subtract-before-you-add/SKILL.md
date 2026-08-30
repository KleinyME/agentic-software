---
name: principle-subtract-before-you-add
description: Remove dead weight first, then build on the simpler base.
disable-model-invocation: true
---

# Subtract Before You Add

Delete dead weight, redundant validators, and stub references before adding anything. Prefer the smallest change that solves the actual problem.

**Why:** Every layer added to a confused base has to be maintained, read, and worked around forever. Small products die of accumulated ceremony far more often than they die of missing features. If a human maintainer would find the result exhausting to keep alive, it is the wrong solution however clever it is.

**Pattern:**

- Prefer one working vertical loop over platform architecture waiting for a user.
- Keep a complexity budget and spend it deliberately; new moving parts are withdrawals.
- Watch for proof ceremony: dashboards nobody opens, gates nobody reads, systems built around the system.
- Collapse one-caller wrappers; shrink mutable scope; delete the compatibility layer with its last caller.
- When a change needs a paragraph of justification, the design is usually wrong, not the explanation.

The full complexity budget and the small-product posture are in the `lean-product-architect` skill.
