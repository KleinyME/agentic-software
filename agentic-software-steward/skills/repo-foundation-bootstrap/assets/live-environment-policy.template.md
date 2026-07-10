# Live Environment Policy

## Current Environment Setup

| Environment | Purpose | URL/App/Project | Data Source | Secrets | Notes |
|---|---|---|---|---|---|
| Official production | Real users/data |  |  |  |  |
| Client-review preview | Look, feel, copy, and intended workflow approval |  | Fixture/simulated as documented | Preview only |  |
| Sandbox preview | Functional integration testing |  | Sandbox/test | Test credentials |  |
| Local | Developer/agent work |  |  |  |  |

## Safety Level

Current level:

- 0 direct-main
- 1 branch plus local checks
- 2 branch plus preview deploy
- 3 preview plus sandbox/test API credentials
- 4 full staging

## Rules

- Branch by default for live apps.
- Keep main/master shippable.
- Do not call a shareable preview production unless the project designates it as the official production target.
- Use read-only first slices for risky live systems.
- Do not test new write behavior first against production when sandbox, dry-run, or adapter tests are possible.
- Hide unfinished features behind internal routes or feature flags.
- Show exact before/after state before live mutations.
- Keep rollback or undo notes for risky changes.

## External APIs

| API/Service | Production Credential | Dev/Test Credential | Write Policy | Notes |
|---|---|---|---|---|

## MCPs / Connectors

| Connector | Purpose | Connected? | Notes |
|---|---|---|---|
| GitHub | Branches, PRs, checks |  |  |
| Vercel | Preview deploys, logs |  |  |
| Supabase | Dev/prod database separation |  |  |
| Shopify or commerce API | Dev store/test credentials |  |  |

## Next Safety Upgrade

[The smallest practical step that makes releases safer.]

