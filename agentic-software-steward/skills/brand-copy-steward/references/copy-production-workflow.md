# Copy Production And Review Workflow

This workflow adapts the focused-pass approach from Corey Haines's MIT-licensed MarketingSkills and the voice-preserving audit loop from Siqi Chen's MIT-licensed Humanizer. See `../NOTICE.md` and the suite's `third_party` records.

## Production Sequence

1. Read product truth, audience, voice, and proof.
2. Define one message and one primary action.
3. Choose a concept and, when useful, a persuasion framework.
4. Draft clean public copy separately from rationale and review notes.
5. Review claims and product-stage truth.
6. Run focused editorial sweeps.
7. Run the AI-writing audit.
8. Project only approved public copy into the implementation.
9. Verify rendered UI, payload, accessibility, and all states.

## Focused Sweeps

### 1. Strategy

- Is the audience recognizable?
- Does the piece advance one central promise?
- Is the primary action obvious?
- Does each section earn a place in the argument?

### 2. Clarity

- Can an informed outsider understand it once?
- Are the actor, action, and consequence explicit?
- Is internal jargon translated where needed?
- Does product UI explain the next step and recovery path?

### 3. Voice

- Does it follow approved voice behavior rather than generic tone adjectives?
- Are rhythm, humor, boldness, and restraint intentional?
- Does the intensity fit the surface—campaign, product UI, error, or legal notice?

### 4. Value

- Does every material feature connect to a customer consequence?
- Does each section add a new reason to care?
- Is the customer the actor rather than an audience for company self-description?

### 5. Proof

- Are material facts supported and current?
- Are testimonials, numbers, comparisons, deadlines, and guarantees traceable?
- Are unresolved dependencies kept in review artifacts rather than public copy?

### 6. Specificity

- Does specificity come from real facts or customer language?
- Can generic phrases be replaced by a concrete situation, mechanism, or outcome?
- Did the draft invent precision to sound persuasive?

### 7. Friction And Flow

- Does each sentence make the next easy to read?
- Are qualifications placed where they matter?
- Are CTA scope, cost, consequence, and commitment clear?
- Can anything be removed without reducing meaning or voice?

After every sweep, confirm that improvements did not damage earlier passes.

## UI Copy Matrix

| Surface | Must answer | Avoid |
|---|---|---|
| Button | What happens? | Vague `Submit` when a clearer action exists |
| Helper text | What uncertainty blocks progress? | Requirements narration |
| Empty state | Why is it empty, and what next? | Decorative marketing filler |
| Loading | What is happening now? | Guarantees about timing or success |
| Error | What failed, what was preserved, what next? | Stack traces and blame |
| Confirmation | What changed and what consequence follows? | Generic `Success!` |
| Permission | Why access is needed and its scope | Security internals |
| Destructive action | Exact scope and reversibility | Soft or ambiguous verbs |

## Review Output

```yaml
audit:
  strategy: []
  clarity: []
  voice: []
  value: []
  proof: []
  specificity: []
  friction: []
public_copy: {}
review_notes: {}
```

Never pass the `audit` or `review_notes` objects to a customer renderer.
