# UI Integration Patterns

Use these patterns whenever AI-generated, reviewed, or internally annotated content may enter a UI.

## Required Data Flow

```text
model or internal source
  -> private generation envelope
  -> server-side validation and public projection
  -> public DTO
  -> UI component
```

Never use:

```text
model response -> component props
model response -> JSON API -> browser filtering
internal object -> hidden DOM attributes
```

## Generation Envelope

Keep public content and private process fields distinct at creation time:

```ts
type GenerationEnvelope = {
  publicOutput: {
    title: string;
    body: string;
    actionLabel?: string;
  };
  reviewNotes?: {
    claimsToConfirm?: string[];
    decisions?: string[];
  };
  internalTrace?: {
    promptVersion?: string;
    model?: string;
    diagnosticSummary?: string;
  };
};
```

Do not request or store private chain-of-thought. Use concise decision summaries and evidence references when auditability is needed.

## Public Projection

Project on the server or another trusted boundary:

```ts
type PublicCopy = Readonly<{
  title: string;
  body: string;
  actionLabel?: string;
}>;

function toPublicCopy(value: GenerationEnvelope): PublicCopy {
  return Object.freeze({
    title: value.publicOutput.title,
    body: value.publicOutput.body,
    ...(value.publicOutput.actionLabel
      ? { actionLabel: value.publicOutput.actionLabel }
      : {}),
  });
}
```

In a real application, validate types, lengths, URLs, markup, locale, and content policy with the project's schema library before projection. Prefer a strict schema that rejects unknown keys.

## Component Boundary

Let public components accept only the public type:

```tsx
function PublicMessage({ copy }: { copy: PublicCopy }) {
  return (
    <section>
      <h2>{copy.title}</h2>
      <p>{copy.body}</p>
      {copy.actionLabel ? <button>{copy.actionLabel}</button> : null}
    </section>
  );
}
```

Do not pass the generation envelope through props, context, server-component serialization, page data, query caches, or hydration state.

## Fail Closed

If generation or validation fails:

- use approved static fallback copy when one exists;
- return a user-safe error and correlation ID;
- log only redacted diagnostics;
- do not display the raw provider response;
- do not publish partial fields by guessing which ones are safe.

## Boundary Tests

Test the serialized result, not only the component snapshot:

```ts
const response = await requestPublicCopy();
const serialized = JSON.stringify(response);

expect(response).toEqual({
  title: "Your report is ready",
  body: "Review the results and choose what to share.",
  actionLabel: "Review report",
});
expect(serialized).not.toContain("systemPrompt");
expect(serialized).not.toContain("internalTrace");
expect(serialized).not.toContain("claimsToConfirm");
```

Also inspect:

- actual network responses;
- server-rendered HTML and hydration payloads;
- DOM attributes and accessibility text;
- metadata and structured data;
- analytics events and error reporting;
- emails, notifications, downloads, and exports.

Sentinel-string tests can expose a path: insert a recognizable private value in a test-only internal field and prove it never appears in any public sink.
