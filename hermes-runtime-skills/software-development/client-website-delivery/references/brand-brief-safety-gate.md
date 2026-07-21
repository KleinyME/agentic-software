# Brand Brief Safety Gate For Audit Pipelines

Use this when an audit pipeline emits a Brand Voice Brief or copy-direction object that may feed report cards, previews, or implementation handoff.

## Why

Audit systems can overreach by turning weak evidence into public-facing copy guidance. Preserve the audit/report layer while narrowing brand/copy outputs to source-backed constraints.

## Safer output fields

Prefer fields such as:
- `audienceFraming`
- `messagingPillars`
- `proofPolicy.allowed`
- `proofPolicy.prohibited`
- `buyerObjections`
- `ctaDirection`
- `ctaConstraints`
- `homepageCopyDirection`
- `copywritingHandoff`

Avoid generic CTA examples or broad persuasion copy when the source material only supports audit observations.

## Verification checks

1. Report still renders cleanly after field changes.
2. Report markdown/HTML uses narrowed fields consistently.
3. Build-only copy handoff data is not mistaken for client-ready page copy.
4. Proof shown in brand/copy sections is source-backed.
5. No audit commentary, UX critique, or generic service-business filler leaks into visitor-facing copy guidance.