# Attribution

This skill adapts:

- `architect` from cursor/plugins (pstack) by Lauren Tan
  - Source: https://github.com/cursor/plugins/tree/main/pstack
  - Pinned ref: `68836ddaf5697224520f1847d90cdb90ca8babaa` (pstack v0.14.5)
  - Upstream license: MIT
  - Files used as reference: `skills/architect/SKILL.md`, `skills/architect/references/design-red-flags.md`, `skills/architect/references/rationale-template.md`, `skills/architect/references/runner-prompt.md`

This suite's own frame is kept: the role boundary against brand, copy, and visual work; the redirect to `lean-product-architect`; the architecture plan output; the taste rules; and Decision Cards, which explain the human tradeoff and recommend a default rather than asking a non-technical client for technology names.

Imported from `architect`: the Ground / Sketch / Agree / Implement / Scrap spine, usage-first sketching where the caller's usage is the spec, the opt-in checkpoint with proceeding as the default, deviations from the sketch as signal rather than silent drift, the rewrite triggers as patterns of repeated friction, `references/design-red-flags.md`, and `references/rationale-template.md`.

Changed here: the upstream dependency on the `arena` skill is dropped, so competing sketches are an optional move rather than a phase and the rationale's synthesis section becomes a plain Decision section; model runner tables, model slugs, and per-runner worktrees are removed; the inline intake question lists are replaced by a single routing line to `grilling` naming only the decisions that change the architecture; the rationale template's open-questions section routes client-facing technical decisions through Decision Cards.
