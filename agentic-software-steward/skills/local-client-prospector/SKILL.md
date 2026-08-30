---
name: local-client-prospector
description: Find and qualify local businesses from public evidence.
disable-model-invocation: true
---

# Local Client Prospector

Find nearby owner-operated businesses with a source-backed problem that the configured capability can actually solve. Produce a reusable research artifact, not contact permission, a CRM row, or a volume-first lead dump.

## When to Use

Use this skill for local prospect discovery, coverage rotation, evidence checks, and first-pass qualification for shops, trades, clinics, restaurants, professional services, and other owner-operated businesses.

Do not use it to send outreach, bypass platform controls, infer private contact details, or turn a weak score into a claim that the business needs a particular service.

## Prerequisites

Establish:

- the base location and reasonable radius;
- one or more business categories;
- the configured capability or offer family to test for fit;
- permitted public sources;
- the maximum discovery batch and verification budget; and
- the system that owns identity, suppression, prior contact, and contact authority.

Infer a practical radius and category only when the user's intent is still preserved. Never infer authority to contact.

## How to Run

Use browser and search tools as assisted research, then cross-check material facts against an official business source or a second independent public source when available.

Read [references/prospect-brief.md](references/prospect-brief.md) before qualifying or handing results to another system.

## Quick Reference

- Rotate through stale geography/category/source coverage instead of repeating fresh cells.
- Resolve identity before scoring; ambiguous collisions become `research_more` or `abstain`.
- Separate observation, inference, and unknowns.
- Prefer a smaller verified set over a larger speculative list.
- Treat public contactability as a fact, not permission to use the channel.
- Return a typed `prospect_brief`; let the owning business system join it to suppression, offers, campaigns, and outcomes.

## Procedure

1. Select one geography/category/source scope and record the observation time.
2. Build candidates from permitted public sources without bypassing login walls, CAPTCHAs, rate limits, paywalls, or platform terms.
3. Resolve business identity using the strongest available public identifiers: official domain, registered identity, public business phone, address, and exact name plus locality.
4. Check current operating evidence, owner-operated signals, public activity recency, public business contactability, and the relevant digital or operational surface.
5. Record problem signals only when a source supports them. A missing search result is not proof that a website or capability does not exist.
6. Estimate problem severity, economic relevance, urgency, and configured capability fit without inventing revenue impact.
7. Count evidence coverage and independence. Preserve contradictions and material unknowns.
8. Choose `qualify`, `research_more`, `skip`, or `abstain` and explain why.
9. Return the typed artifact and source pointers. Do not create a CRM record or contact action unless a separate authorized integration owns that mutation.

For truly independent source scopes and only when parallel work is explicitly useful, separate workers may verify non-overlapping candidates. One accountable assembler resolves conflicts and produces the final briefs.

## Pitfalls

- Treating a directory or map listing as both identity proof and an independent problem source.
- Calling a business owner-operated because the name sounds personal.
- Treating social-only, booking-only, or marketplace presence as automatically bad.
- Inventing urgency, economic impact, buying intent, or a private owner email.
- Conflating capability fit with a specific product or price that belongs to the downstream business system.
- Returning only `hot`, `warm`, or a numerical score with no evidence or abstention path.
- Allowing a research tool's result count to become the pipeline ceiling; discovery may be broad while verified outreach remains separately capped.

## Verification

Before returning results, verify:

- duplicates and material identity collisions are resolved or flagged;
- every important signal has a dated source pointer;
- evidence status and unknowns are explicit;
- public contact facts do not imply channel authority;
- no private personal data or unsupported economic claim was added;
- the disposition follows from the artifact fields; and
- the output can be consumed without importing product, suppression, or campaign policy into this skill.
