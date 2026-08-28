# Workflow Automation Contract

Use this contract as an intermediate representation before choosing an implementation runtime.

```yaml
schema_version: 1
workflow:
  id: invoice-intake
  intent: "When an invoice arrives, help accounting create an accurate payable without duplicate payment."
  actor: accounting
  trigger: invoice_received
  completion_evidence:
    - validated_accounting_entry
  prohibited_outcomes:
    - duplicate_payment
  current_path: "Inbox -> manual extraction -> policy check -> entry"
  evidence:
    frequency: unknown
    pain: "Manual extraction and exception routing"

decision:
  classification: could_automate
  topology: hybrid_state_machine
  simpler_baseline: "Script plus review queue"
  initiative_ceiling: draft
  confidence: medium
  open_intent_questions:
    - "Who may approve an exception?"

nodes:
  - id: extract_fields
    method: model
    reads: [invoice_document]
    returns: invoice_fields
    confidence_threshold: 0.92
    verifier: schema_and_total_check
    fallback: human_review
    side_effects: none

  - id: validate_invoice
    method: deterministic
    reads: [invoice_fields, vendor_directory]
    returns: validation_result
    verifier: contract_tests
    side_effects: none

  - id: create_entry
    method: integration
    reads: [approved_invoice]
    returns: accounting_entry_id
    writes: [accounting_system]
    authority: accounting_policy
    idempotency_key: invoice_fingerprint
    fallback: stop_and_report

controls:
  source_of_truth: accounting_system
  human_gates: [policy_exception, payment]
  authority_to_raise_initiative: accounting_owner
  retries: 2
  wall_clock: 15m
  cost_cap: defined_before_pilot
  cancellation: "Stop before external write"

pilot:
  scope: "Read-only shadow mode on representative cases"
  success_metrics:
    - extraction_accuracy
    - exception_recall
    - time_saved_per_case
    - false_action_rate
```

## Contract Rules

- Give every mutable external resource one writer.
- Give every intelligent node a typed output, verifier, threshold, and fallback.
- Preserve source pointers for decisions and extracted facts.
- Declare the initiative ceiling independently from model capability and tool availability.
- Run high-risk automations in read-only or shadow mode before enabling writes.
- Compare the selected topology with the simpler baseline.
- Require explicit user authority before creating scheduled or live execution.
