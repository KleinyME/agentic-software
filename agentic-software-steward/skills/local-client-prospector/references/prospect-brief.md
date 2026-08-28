# Prospect Brief Contract

Use one artifact per resolved business identity. The brief is portable research evidence, not a CRM record and not permission to contact.

```yaml
prospect_brief:
  schema_version: 1
  business_identity:
    display_name: ""
    official_domain: ""
    public_business_phone: ""
    public_business_address: ""
    registered_or_directory_ids: []
    identity_confidence: "low | medium | high"
    collision_notes: []
  geography:
    locality: ""
    region: ""
    distance_from_base: ""
  category: ""
  observed_at: ""
  source_refs: []
  problem_signals:
    - signal: ""
      evidence_status: "observed | inferred | contradicted | unknown"
      source_refs: []
      observed_at: ""
  evidence_coverage:
    required: 0
    observed: 0
    status: "pass | fail | unknown | not_applicable"
  evidence_independence: 0
  owner_operated_signal:
    value: "yes | no | unknown"
    source_refs: []
  public_activity:
    last_observed_at: ""
    source_refs: []
  problem_severity: 0
  economic_relevance: 0
  capability_fit_key: "configured_capability | none | unknown"
  urgency: 0
  public_contactability:
    channels: []
    source_refs: []
    authority: "not_evaluated_here"
  confidence: "low | medium | high"
  disposition: "qualify | research_more | skip | abstain"
  rationale: ""
  unknowns: []
  stop_conditions: []
```

## Contract Rules

- Scores are bounded comparison aids, not truth or contact permission. Explain the scale used in the containing run.
- `capability_fit_key` identifies a configured capability class. Exact offers and prices belong to the downstream business authority.
- Evidence coverage counts distinct required checks; evidence independence counts materially independent sources, not URLs that repeat the same listing.
- `abstain` is a correct outcome when identity, evidence, capability fit, or currentness cannot support a decision.
- Preserve contradictory evidence. Do not average it into false confidence.
- The consuming system must independently join suppression, existing relationships, prior contact, campaign policy, and channel authority immediately before any consequential action.
