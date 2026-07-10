# Deployment Readiness

Project:
Official production target:
Production branch:
Owner:
Target promotion date:

## Status Vocabulary

Use `simulated`, `fixture`, `sandbox`, `connected`, `verified`, or `not-required`.

## Promotion Blockers

| Capability | Preview behavior | Status | Production requirement | Owner | Verification | Blocks promotion? |
|---|---|---|---|---|---|---|
| Authentication | | | Client-owned provider, roles, protected routes, recovery | | | yes / no |
| Backend and data | | | Production project, schema, migrations, permissions, backup | | | yes / no |
| Forms | | | Endpoint, storage/delivery, validation, consent, spam protection | | | yes / no |
| Payments | | | Client account, products/prices, webhooks, tax, refunds | | | yes / no |
| APIs and OAuth | | | Client keys/apps, redirect URLs, rate limits, rotation | | | yes / no |
| Workers and jobs | | | Runtime, schedule, retries, logs, monitoring | | | yes / no |
| Email and messaging | | | Sender/domain, templates, delivery, unsubscribe, failure path | | | yes / no |

## Content, Claims, And Assets

| Item | Preview status | Production source or evidence | Owner | Resolution | Verified? |
|---|---|---|---|---|---|
| Testimonials/customers | | | | verify / replace / remove | |
| Metrics/comparisons | | | | verify / revise / remove | |
| Certifications/legal claims | | | | verify / revise / remove | |
| Product/service links | | | | connect | |
| Photography/imagery | | | | approve / replace | |

## Hosting And Ownership

- [ ] Client-owned production hosting/team established when appropriate.
- [ ] Domain and DNS ownership confirmed.
- [ ] Production and preview environment variables separated.
- [ ] Secret owners and rotation path recorded.
- [ ] Database/storage/auth/payment ownership confirmed.
- [ ] Analytics, consent, privacy, and legal requirements resolved.

## Experience Verification

- [ ] Client-approved direction remains intact.
- [ ] Desktop and mobile layouts verified.
- [ ] Loading, empty, error, denied, success, and recovery states verified.
- [ ] Accessibility checks completed.
- [ ] Performance checks completed.
- [ ] Forms and links exercised.
- [ ] Auth and permission boundaries exercised.
- [ ] Payments/integrations/workers exercised where required.
- [ ] Rollback or recovery path recorded.

## Production Verification

- [ ] Correct branch and official target confirmed.
- [ ] Build and tests passed.
- [ ] Deployment promoted.
- [ ] Official production URL checked.
- [ ] Critical workflow exercised against production resources.
- [ ] Evidence recorded.

## Remaining Non-Blocking Work

| Item | Why deferred | Owner | Target date | Risk |
|---|---|---|---|---|
| | | | | |
