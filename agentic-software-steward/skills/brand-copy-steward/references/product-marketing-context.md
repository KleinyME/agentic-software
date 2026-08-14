# Product Marketing Context

Adapted from the product-context workflow in Corey Haines's MIT-licensed MarketingSkills. See `../NOTICE.md` and the suite's `third_party` records.

Use this when copy quality is constrained by missing audience, positioning, customer language, proof, or conversion intent.

## Reuse Existing Memory

Read before creating anything:

- `PRODUCT.md` for purpose, users, workflows, and product promises;
- `docs/brand/voice.md` for voice and language behavior;
- approved brand/creative direction;
- current landing pages, sales material, reviews, interviews, support tickets, and sales notes;
- any existing `.agents/product-marketing.md` from MarketingSkills.

Do not create a parallel context document when these sources already hold the truth. Update the repository-native source of truth instead.

Create `docs/brand/product-marketing.md` only when competitive positioning, switching dynamics, proof, and customer language are substantial enough to need their own durable record.

## Minimum Context

Capture only what downstream copy actually needs:

1. Product category and one-line description.
2. Primary audience, situation, and job to be done.
3. Desired outcome and one primary conversion action.
4. Current alternatives and why customers switch.
5. Differentiation that the product can support.
6. Objections, anxiety, and adoption friction.
7. Verbatim customer language from attributable sources.
8. Proof points with source and currentness.
9. Voice behavior and language boundaries.
10. Anti-persona or poor-fit customer when useful.

## Switching Forces

Use four forces when the buying decision is unclear:

- `push`: frustration with the current situation;
- `pull`: attraction to the new outcome;
- `habit`: inertia keeping the current behavior in place;
- `anxiety`: risk or uncertainty about switching.

Do not manufacture pain or anxiety. Record only evidence from the user, customers, or credible product context.

## Evidence Status

Tag meaningful facts:

| Status | Meaning | Public use |
|---|---|---|
| `confirmed` | Owner-approved or authoritative current fact | Yes |
| `source_supported` | Published by the business and not contradicted | Concept copy; confirm material currentness before production |
| `inferred` | Derived from context but not approved | No claim without review |
| `open` | Missing or conflicting | Resolve or omit |
| `prohibited` | Private, fabricated, restricted, or unauthorized | Never |

## Context Template

```markdown
# Product Marketing Context

## Product And Category
- One-line description:
- Product category:
- Primary alternative:

## Audience And Job
- Primary audience:
- Situation:
- Job to be done:
- Desired outcome:

## Switching Forces
- Push:
- Pull:
- Habit:
- Anxiety:

## Positioning
- Differentiator:
- Why it matters:
- Anti-persona:

## Customer Language
- Exact phrase:
- Source:

## Proof
| Claim | Evidence | Status | Current As Of |
|---|---|---|---|

## Voice
- Behaviors:
- Words to use:
- Words to avoid:

## Conversion
- Primary action:
- Main objection:
```

Version material positioning changes in the project's existing memory or changelog convention. Do not create process ceremony for typo-only edits.
