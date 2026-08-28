---
name: ai-writing-audit
description: Audit and revise marketing, product, editorial, documentation, UI, and client-facing copy for formulaic AI-writing patterns without flattening approved brand voice, persuasive force, or intentional rhythm. Use to humanize copy, remove assistant residue and AI tells, review a draft before publication, repair robotic or ultra-literal language, match a supplied voice sample, or perform the final editorial pass after brand, copy direction, and public-output boundaries are established.
---

# AI Writing Audit

Identify writing patterns, not authorship. Improve the draft without turning distinctive copy into bland correctness.

Adapted from Aaron Makelky's `ai-writing-audit` and Siqi Chen's Humanizer, both MIT licensed. See `NOTICE.md`, `LICENSE`, and the suite's `third_party` records.

## Before Auditing

Read approved brand direction, product truth, and source material when available. Identify:

- intended audience and action;
- approved boldness and central claim;
- intentional brand mannerisms;
- content type such as marketing, product UI, editorial, technical, or legal;
- facts, phrases, and formatting that must remain unchanged;
- any supplied human writing sample.

When a writing sample exists, its demonstrated rhythm, vocabulary, punctuation, and quirks outrank generic style preferences unless clarity, truth, safety, or accessibility would suffer.

Do not use this audit as a substitute for brand direction, customer research, blank-page copy strategy, or audience-boundary enforcement.

## Workflow

### 1. Diagnose

Read [references/checklist.md](references/checklist.md). Flag only patterns that weaken this specific piece. Quote the shortest useful snippet and explain its effect.

Use severity:

- `high`: damages clarity, credibility, truth, or voice;
- `medium`: repeated or noticeably formulaic;
- `low`: optional refinement;
- `structural`: affects the artifact or page section rather than one phrase.

Pattern matches are evidence for review, not proof that AI wrote the text.

### 2. Protect The Direction

Do not automatically remove strong supported claims, direct address, intentional fragments, rhythmic repetition, unusual syntax, humor, rhetorical questions, purposeful formatting, necessary qualifications, or approved personality.

Do not soften an unverified preview claim into lifeless hedging. Keep the public draft persuasive and place the verification need in the designated review artifact.

### 3. Rewrite Selectively

- Preserve meaning, factual content, persuasive force, and brand voice.
- Preserve every source claim unless the user authorizes a substantive edit.
- Never add a fact, name, number, date, quotation, citation, customer, or result absent from the source or approved context.
- Replace abstract puffery with a supported concrete claim, image, mechanism, or plain statement.
- Remove requirements language, implementation narration, assistant chatter, and empty institutional phrasing.
- Vary cadence without manufacturing fragments or punchlines.
- Prefer natural repetition over synonym cycling.
- Use the number of points the idea needs rather than forcing groups of three.

If the page needs a new concept rather than line editing, stop polishing the anchored draft and route back to `brand-copy-steward`, `creative-director`, or `brand-direction`.

### 4. Run A Second Audit

Confirm that the revision removed the diagnosed effects, introduced no new facts, preserved approved voice and important information, contains no assistant residue or review notes, and fits the actual surface. Do not chase a zero-pattern score; a clean draft may intentionally retain a pattern.

## Public Output Rule

Never place audit tags, warnings, rationales, framework names, verification language, or private working notes inside customer-facing copy.

When copy will enter a UI, email, CMS, or generated artifact, route through `audience-boundary`. Only the clean revised text may enter `public_copy`.

## Output

Provide, as relevant:

1. A concise audit grouped by severity.
2. Corrected public copy.
3. A short changelog.
4. Separate review notes for claims or facts needing confirmation.

If the user asks only for paste-ready copy, lead with the clean copy and keep commentary minimal and separate.
