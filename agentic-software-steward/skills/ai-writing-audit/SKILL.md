---
name: ai-writing-audit
description: Audit and revise marketing, product, editorial, documentation, and client-facing copy for formulaic AI-writing patterns without flattening approved brand voice, persuasive claims, or intentional rhythm. Use for requests to humanize copy, remove AI tells, review a draft before publication, fix robotic or ultra-literal language, or perform the final editorial pass after brand and copy direction are approved.
---

# AI Writing Audit

Identify writing patterns, not authorship. Improve the draft without turning distinctive copy into bland correctness.

Adapted from Aaron Makelky's MIT-licensed `ai-writing-audit`; see `NOTICE.md` and `LICENSE` in this skill folder.

## Before Auditing

Read the approved brand direction and source material when available. Identify:

- Intended audience and action.
- Approved boldness and central claim.
- Intentional brand mannerisms.
- Content type: marketing, product UI, editorial, technical, or legal.
- Facts and phrases that must remain unchanged.

Do not use the audit as a substitute for brand direction or blank-page reimagination.

## Workflow

### 1. Audit

Read `references/checklist.md`. Flag only patterns that weaken this specific piece. Quote the shortest useful snippet and explain the effect.

Use severity:

- `high`: damages clarity, credibility, or voice.
- `medium`: repeated or noticeably formulaic.
- `low`: optional refinement.
- `structural`: affects the document or page section, not one phrase.

### 2. Protect The Approved Direction

Do not automatically remove:

- Strong marketing claims.
- Direct address.
- Intentional fragments.
- Repetition used for rhythm.
- Unusual syntax or humor.
- Purposeful formatting.
- Approved personality.

Do not soften an unverified preview claim into hedged copy. Keep the rendered draft strong and place the verification need in `CLIENT_REVIEW.md`.

### 3. Rewrite Selectively

When asked to rewrite:

- Preserve meaning, factual content, persuasive force, and brand voice.
- Replace abstract puffery with a more specific claim or image.
- Remove requirements-language, implementation narration, and empty institutional phrasing.
- Vary cadence without manufacturing fragments.
- Prefer concrete human language.
- Do not add claims, citations, or evidence that were not requested.

If the page needs reimagination rather than line editing, stop polishing the anchored draft and route back to `creative-director` and `brand-direction`.

## Output

Provide:

1. A concise audit grouped by severity.
2. Corrected text when requested.
3. A short changelog.
4. Separate client-review notes for claims or facts needing confirmation.

Never place audit tags, warnings, or verification language inside the customer-facing page.
