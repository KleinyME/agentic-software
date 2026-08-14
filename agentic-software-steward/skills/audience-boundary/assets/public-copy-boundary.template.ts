export type PublicCopy = Readonly<{
  title: string;
  body: string;
  actionLabel?: string;
}>;

export type GenerationEnvelope = Readonly<{
  publicOutput: {
    title: unknown;
    body: unknown;
    actionLabel?: unknown;
  };
  reviewNotes?: unknown;
  internalTrace?: unknown;
}>;

function requireText(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== "string") {
    throw new TypeError(`${field} must be a string`);
  }

  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) {
    throw new RangeError(`${field} must contain 1-${maxLength} characters`);
  }

  return normalized;
}

export function projectPublicCopy(envelope: GenerationEnvelope): PublicCopy {
  const publicCopy: {
    title: string;
    body: string;
    actionLabel?: string;
  } = {
    title: requireText(envelope.publicOutput.title, "title", 160),
    body: requireText(envelope.publicOutput.body, "body", 10_000),
  };

  if (envelope.publicOutput.actionLabel !== undefined) {
    publicCopy.actionLabel = requireText(
      envelope.publicOutput.actionLabel,
      "actionLabel",
      80,
    );
  }

  return Object.freeze(publicCopy);
}
