# Output Contract

Use this reference when a feature renders, sends, exports, or serializes content.

## Minimum Contract

```yaml
audience_contract:
  artifact: account-status-email
  intended_audience: public
  allowed_sources:
    - account.display_name
    - account.user_status
  prohibited_sources:
    - internal_reasoning
    - review_notes
    - raw_provider_error
    - secrets
  public_fields:
    - subject
    - body
    - action_url
  internal_fields:
    - template_version
    - claim_evidence
    - correlation_id
  restricted_fields:
    - system_prompt
    - access_token
  sinks:
    - email HTML
    - email text
  verifier: email preview test plus serialized payload assertion
```

Use repository-native types, schemas, or policy objects when available. The contract can remain a concise design note for a small change; it does not require a new platform.

## Generated-Content Boundary

Prefer a schema such as:

```yaml
public_output:
  title: string
  body: string
  action_label: string
review_notes:
  claim_evidence: string[]
  unresolved_questions: string[]
internal_trace:
  prompt_version: string
  model: string
  diagnostic_summary: string
```

Only `public_output` may reach the public renderer. Review and trace data should use separate storage, permissions, transport, and interfaces where the risk warrants it.

The model response is not the public DTO. Parse or transform it on a trusted boundary, reject unexpected fields, and send only the public projection to the client.

Do not request, store, or expose private chain-of-thought. When auditability is needed, store inputs, outputs, tool events, evidence references, concise decision rationales, policy decisions, and outcome signals instead.

## Safe Error Contract

Public response:

```json
{
  "message": "We could not save that change. Try again or contact support.",
  "correlationId": "req_123"
}
```

Internal log:

```json
{
  "correlationId": "req_123",
  "errorClass": "ProviderTimeout",
  "provider": "example",
  "operation": "save_change"
}
```

Keep stack traces, request bodies, prompts, tokens, and private records out of public responses. Redact sensitive values in logs as well.

## Stage Matrix

| Content | Public surface | Client review | Deployment readiness | Internal memory/logs |
|---|---|---|---|---|
| Approved product copy | Yes | Yes | Optional | Optional |
| Preview limitation | Only if users must know | Yes | Yes when launch-relevant | Yes |
| Fixture/simulation detail | Only as deliberate demo disclosure | Yes | Yes when still present | Yes |
| Claim evidence | Usually no | Yes | Yes when required | Yes |
| Audit finding | No | Summarized when actionable | Yes when blocking | Yes |
| System/developer instruction | No | No | No | Restricted only |
| Private reasoning/scratch work | No | No | No | Do not request or persist |
| Secret/token | No | No | No | Restricted secret store only |

## Verification Checklist

- Inspect server-side field selection and serialization.
- Inspect the actual network payload, not only the visible UI.
- Inspect server-rendered HTML, hydration state, DOM, and accessibility tree.
- Inspect metadata, JSON-LD, alternate text, localization bundles, and public source maps.
- Render PDFs, CSVs, emails, notifications, and other exports.
- Exercise validation, authorization, timeout, and provider-failure paths.
- Assert forbidden fields and representative sentinel values are absent.
- Confirm authorized reviewers can still access the internal truth they need.
- Confirm logging is useful without storing secrets or private raw content.

String scans can find candidates such as `prompt`, `reasoning`, `debug`, `claim`, `fixture`, `internal`, or `TODO`. A matching token is not automatically a leak, and a clean scan does not prove the boundary. Trace source to sink.
