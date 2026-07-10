# Stage-Aware No-Theater Policy

No-theater governs how maturity is represented, not what may be designed or simulated.

## Stages

- `concept-preview`: complete visual, copy, claims, and intended workflow for client approval.
- `functional-preview`: frontend behavior using fixtures, local adapters, or sandbox services.
- `production-candidate`: required production resources are connected.
- `production-verified`: the official workflow has been exercised in production.

## Preview Rules

- Build the complete intended experience.
- Realistic fixtures and simulated flows are allowed.
- Keep internal labels, claim flags, and implementation notes in `CLIENT_REVIEW.md`, not in the page.
- Do not call a preview production.

## Production Rules

- Visible controls perform their stated actions.
- Data comes from the designated real source or an approved permanent demo mode.
- Auth, forms, payments, APIs, workers, and integrations use intended production resources.
- Claims, proof, links, and documentary assets are verified or removed.
- Required behavior is exercised after promotion.

## Deferred Production Work

Record intended behavior, current state, required resource, owner, implementation step, verification method, and whether it blocks promotion.

