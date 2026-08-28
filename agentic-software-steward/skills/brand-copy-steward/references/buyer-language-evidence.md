# Buyer Language Evidence

Profile until the writer can predict the buyer's next material objection, not until the writer can invent a vivid fictional day in their life.

## Source Order

Prefer:

1. consenting first-party owner conversations, replies, intake, objections, edits, and recorded outcomes;
2. relevant public reviews, questions, and comments attributable to the chosen buyer role;
3. industry communities, trade forums, and public interviews;
4. competitor reviews and claims, with buyer speech separated from competitor speech; and
5. broad social material only when the buyer and channel fit are supported.

Exact language is evidence, not automatic permission to publish. Store only the minimum useful phrase or paraphrase plus a source pointer and use boundary. Do not place raw private transcripts, identities, or research corpora in public copy or general memory.

## Evidence Record

```yaml
buyer_language_evidence:
  schema_version: 1
  segment: ""
  speaker_role: ""
  situation_or_job: ""
  exact_quote: ""
  paraphrase: ""
  source_ref: ""
  source_type: "first_party | review | community | public_profile | competitor"
  observed_at: ""
  awareness_stage: "unaware | problem_aware | solution_aware | product_aware | customer"
  switching_force: "push | pull | habit | anxiety"
  emotion_or_stakes: ""
  evidence_status: "observed | inferred | hypothesis | contradicted"
  confidence: "high | medium | low"
  public_use: "quote_with_permission | adapt_non_identifying | research_only"
```

Leave `exact_quote` empty when only a paraphrase is allowed or retained. Do not infer demographics, income, blame, motive, emotion, or personal routines to make the record feel complete.

## Dated Synthesis

```yaml
buyer_model:
  schema_version: 1
  scope: ""
  strongest_confirmed_patterns: []
  contradictions: []
  unknowns: []
  disconfirmed_assumptions: []
  last_reviewed_at: ""
  source_refs: []
```

Preserve disagreements between sources and segments. Copy frameworks are downstream tools: they may shape observed tension and desire but may not manufacture shame, urgency, or cosmetically precise claims.

## Source-To-Hook Handoff

For each important hook, subject line, headline, thumbnail, opening frame, or first seconds, record the packaging surface, audience stage, intended promise and payoff, source provenance, fidelity (`direct_observed_phrase | bounded_adaptation | speculative_test`), and the decision the variant is meant to inform.
