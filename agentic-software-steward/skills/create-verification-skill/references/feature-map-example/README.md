# Northgate Plumbing verification map

This directory is the maintained source for verifying the user-facing behavior of the Northgate Plumbing client site. Read the index before driving the site, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch the site at `http://127.0.0.1:4321` from the repo's own dev command.
- Set `LEAD_SINK=file:./.verify/leads-$RUN_ID.jsonl` so runs do not post to the live inbox or CRM.
- Point form delivery at the disposable sink above and confirm it is empty before the run.
- Run `node scripts/verify/doctor.mjs` and require the expected URL, build revision, and lead sink.
- Never drive an instance that was not started by this verification run.

## Driving conventions

- Start every recipe from the baseline state unless its preconditions say otherwise.
- Prefer ARIA roles and accessible names over CSS selectors or DOM position.
- Run browser actions through Playwright: `node scripts/verify/drive.mjs <recipe>`.
- Treat every command as literal. Keep quoted names and values unchanged.
- Reset the lead sink after a mutating recipe. Never remove proof artifacts during cleanup.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- Page proof includes an ARIA snapshot and a screenshot with the site identity visible.
- Delivery proof includes the stored record read back from the destination, not the on-page message.
- Record the feature ID and entry point used with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with <harness>` starts with `Preconditions:` and uses labeled bullets pairing each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Request a quote](./request-a-quote.md) covers the quote form's entry points, validation, submission, delivery, and cleanup.
