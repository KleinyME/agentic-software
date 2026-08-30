# Attribution

This skill adapts:

- `interrogate` from cursor/plugins (pstack) by Lauren Tan
  - Source: https://github.com/cursor/plugins/tree/main/pstack
  - Pinned ref: `68836ddaf5697224520f1847d90cdb90ca8babaa` (pstack v0.14.5)
  - Upstream license: MIT
  - Files used as reference: `skills/interrogate/SKILL.md`, `skills/interrogate/references/reviewer-prompt.md`, `skills/interrogate/references/lead-judgment.md`, `skills/interrogate/references/rubric.md`, `skills/interrogate/references/code-quality-review.md`

The frame is this suite's own: Pass One intent and requirement compliance ahead of engineering quality, the `pass | fail | needs_intent` result, the rule that polished work missing intent is not approved, the external-feedback protocol, and the P0-P3 finding format.

Imported from `interrogate`: the slotted reviewer prompt with one identical filled template per reviewer, the Severity / Finding / Evidence / Suggestion finding shape, the legitimacy of an empty review, the synthesis step built on independently repeated findings, the Act on / Consider / Noted / Dismissed categorization, the Agreement Map, and the lead-judgment filtering framework including nitpick gravity, the roughly five-item ceiling on "Act on", and the trust-mechanism rationale for publishing Dismissed.

Changed here: reviewer severities use this suite's P0-P3 scale rather than critical/warning/nit; the rubric slot draws on `references/review-contract.md` rather than an upstream rubric; Dismissed is mandatory rather than optional; host-specific dispatch details (subagent types, read-only flags, named model slugs, and a configured model table) are replaced by "an independent reviewer in a fresh context, on a different model from the producer's where the host offers a choice", with a stated single-reviewer fallback.
