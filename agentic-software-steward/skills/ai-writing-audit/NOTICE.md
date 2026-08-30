# Attribution

This skill adapts:

- `ai-writing-audit` by Aaron Makelky
  - Source: https://github.com/a-makelky/ai-writing-audit
  - Upstream license: MIT
  - Files used as reference: `SKILL.md` and `references/checklist.md`
- Humanizer by Siqi Chen
  - Source: https://github.com/blader/humanizer
  - Pinned research ref: `523374dee72d67c7b2b5f858ea0094ffda49c3ac`
  - Upstream license: MIT
  - Files used as reference: `SKILL.md`
- `unslop` from cursor/plugins (pstack) by Lauren Tan
  - Source: https://github.com/cursor/plugins/tree/main/pstack
  - Pinned ref: `68836ddaf5697224520f1847d90cdb90ca8babaa` (pstack v0.14.5)
  - Upstream license: MIT
  - Files used as reference: `skills/unslop/SKILL.md`

This adaptation changes absolute pattern bans into context-aware editorial checks, gives supplied voice samples precedence over generic style preferences, prohibits factual invention, adds a second audit, protects approved persuasive force, and routes internal review state outside public output.

From `unslop` it takes the named pattern catalog and its fixes into `references/checklist.md`, each entry given a severity in this suite's model, and the "adding soul" step into the rewrite phase, subordinated to approved brand voice. Upstream's absolutist style bans are not imported as bans: the em-dash prohibition, curly-quote rule, title-case rule, and emoji rule become low-severity or structural items, and the checklist states that typography alone is house taste rather than evidence.
