# Marketing Experiment Contract

Use this reference when a campaign, message, asset, channel, offer presentation, or buyer hypothesis needs a real decision rather than more activity.

## Pre-register The Decision

```yaml
marketing_experiment:
  schema_version: 1
  hypothesis: ""
  audience_evidence: []
  problem: ""
  promise: ""
  channel: ""
  single_variable: ""
  primary_metric: ""
  decision_rule: ""
  sample_or_time_target: ""
  stop_condition: ""
  evidence_level: "observed | reported | inferred | assumed | unknown"
  what_it_can_support: []
  what_it_cannot_support: []
  cheapest_next_observation: ""
  owner_gate: ""
```

Choose the cheapest observation capable of changing the present decision. Do not prescribe a universal sample size, duration, confidence threshold, open-rate target, or number of variants. A small outreach cohort may test workflow safety and obvious rejection; it cannot establish broad market conversion. A broad research or preparation population does not authorize equally broad outreach.

When causal attribution matters, change one variable. A bundled concept test may compare whole concepts, but its result cannot identify which component caused the difference.

Set collection and attribution before launch. Use provider delivery, replies, qualified conversations, purchases, or another downstream business event when that is the real outcome. Treat opens, clicks, dwell time, and engagement as diagnostics unless the decision is specifically about those events.

## Record The Outcome Separately

```yaml
experiment_outcome:
  schema_version: 1
  experiment_ref: ""
  actual_window: ""
  sample: ""
  observed_result: ""
  evidence_level: "observed | reported | inferred | assumed | unknown"
  attribution_limits: []
  owner_intervention: ""
  decision: "keep | change | stop | insufficient_signal"
  next_observation: ""
```

Do not rewrite the pre-registered hypothesis, target, or decision rule after seeing results. If reality requires a change, close the first experiment honestly and create a new version.

## Authority Boundary

This contract designs and evaluates an experiment. It does not authorize messages, publishing, spend, data acquisition, list changes, or production promotion. Those effects require their own current authority and deterministic checks.
