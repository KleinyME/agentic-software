# Competitive Evidence

Use this reference to build a dated public-source market brief without inventing market size, competitor intent, or private intelligence.

## Procedure

1. Name the customer's real alternatives: direct competitors, a manual workaround, an incumbent tool or agency, doing nothing, and delaying the decision.
2. Use dated public sources. Prefer official offer pages, public product material, current public profiles, and buyer-visible artifacts.
3. Capture exact customer-visible wording only when necessary and within source-use limits. Otherwise paraphrase and retain the source pointer.
4. Separate `observed_claim`, `buyer_report`, `inference`, `contradiction`, and `unknown`.
5. Compare the proposed positioning against repeated category language. If it can be pasted onto an alternative's page unchanged, it is not yet a credible difference.
6. Record available proof and missing proof independently from how attractive the claim sounds.

## Market Brief

```yaml
market_brief:
  schema_version: 1
  scope: ""
  observed_at: ""
  customer_alternatives: []
  repeated_category_claims: []
  credible_differences: []
  proof_available: []
  proof_missing: []
  contradictions: []
  language_to_avoid: []
  source_refs: []
  confidence: "low | medium | high"
  unknowns: []
```

## Boundaries

- Public claims are evidence that the alternative says something, not proof that the claim is true or effective.
- Buyer speech and competitor speech are different evidence classes.
- Search position, ad duration, post engagement, or visible popularity are discovery signals, not portable causal proof.
- Do not collect private data, infer protected or sensitive traits, or attribute motives to a competitor.
- Do not make a comparison claim public until the owning claim process verifies its accuracy, currentness, scope, and required substantiation.
