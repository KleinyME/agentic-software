# Project Memory

## Product Intention

Status: Confirmed | Inferred | Open

[Plain-language description of what this software is for and who it serves.]

## Current Working Truth

- [What currently works end to end.]
- [What is a concept or functional preview.]
- [What is simulated, fixture-backed, sandbox-connected, production-connected, or production-verified.]

## What Must Not Break

- [Critical workflows.]
- [Important data.]
- [Security/privacy promises.]

## Authority And Loading Map

| Artifact | Lane Or Scope | Authority Or Evidence | Load When |
|---|---|---|---|
| `PRODUCT.md` | global product | provisional | Product intention or direction is in scope |
| `DESIGN.md` | global visual | provisional | Visual work is in scope; approved matching scope constrains implementation |
| | | | |

Missing creative authority metadata defaults to provisional. Technical truth uses evidence labels such as verified-from-system, source-backed, user-confirmed, inferred, open, or risk.

## Architecture Map

- UI:
- API/server:
- Domain logic:
- Data/storage:
- Auth/permissions:
- External integrations:
- Background jobs:

## Module Ownership

| Module | Owns | Must Not Own | Depends On | Memory |
|---|---|---|---|---|

## Data And Security Notes

- Sensitive data:
- Secrets/config:
- Backup/rollback notes:
- Permissions model:

## Environments And Release Safety

- Production URL/app/project:
- Client-review preview URL/app/project:
- Sandbox preview URL/app/project:
- Hosting/deployment:
- Production secrets location:
- Dev/test secrets location:
- External API sandbox/test accounts:
- Official production designation:
- Current stage: concept-preview | functional-preview | production-candidate | production-verified
- Live mutation policy:
- Rollback/revert notes:

## Verification Commands

- Install:
- Dev:
- Test:
- Build:
- Lint/typecheck:

## Known Risks

| Risk | Severity | Why It Matters | Mitigation |
|---|---|---|---|

## Open Questions

| Question | Why It Matters | Default Assumption |
|---|---|---|

## Recent Meaningful Changes

- YYYY-MM-DD: [Architecture/product/security/design change.]
- YYYY-MM-DD: [Direction approved, rejected, or superseded; include scope and evidence.]
