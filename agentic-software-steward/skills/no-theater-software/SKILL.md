---
name: no-theater-software
description: Prevent fake, unwired, or demo-only software from being presented as complete. Use for dashboards, charts, settings, buttons, forms, integrations, auth screens, generated UI, analytics, or any feature that might look done without real behavior or data.
---

# No Theater Software

A feature is not done because it looks done. Build real behavior or clearly label it as prototype/demo/stub.

## Banned As Done

- Analytics dashboard with hard-coded production-looking numbers.
- Settings page that does not save.
- Button that does nothing.
- Form that does not submit, validate, or persist as expected.
- Chart not connected to real data or a labeled fixture.
- Auth UI without real auth boundaries.
- Integration screen with no integration.
- "Coming later" feature that looks shipped.

## Truthfulness Levels

Use one of:

- `real`: wired to real behavior/data.
- `prototype`: exploratory and not production.
- `demo`: sample mode, clearly labeled.
- `fixture`: dev/test data, isolated from production paths.
- `stub`: unfinished and not presented as complete.

Default to `real`.

## Vertical Slice Rule

Prefer the smallest working version over a larger pretend version.

For analytics, one real event stored and displayed is better than twelve fake charts.

## Deferred Work Rule

Any deferred item must include:

- What is unfinished.
- Why it is deferred.
- What must be built to make it real.
- Where it should be wired.
- How to verify it works.
- Risk if it remains unfinished.

