---
name: principle-encode-lessons-in-structure
description: Encode a lesson as a check a script can run, not as more prose.
disable-model-invocation: true
---

# Encode Lessons In Structure

When a run teaches you something, encode it where it cannot be skipped: a type, a lint, a test, a script, a generated check. Only then consider writing it down.

**Why:** Prose instructions are read probabilistically and decay as the thing they describe changes. A check runs every time and fails loudly. Agents also copy whatever the surrounding code already does, so structure teaches more reliably than instruction ever will.

**Pattern:** Take the strongest rung available.

1. Make the illegal state unrepresentable.
2. Fail it in CI with a lint or a test.
3. Route it through one canonical helper.
4. Assert it at runtime.
5. Only then, write prose.

Applied to this repository:

- A rule a script can check belongs in `scripts/validate-suite.mjs`, not in prose repeated across skills.
- Do not copy an instruction into a second file to raise its odds of being followed. That is duplication, and it decays in two places instead of one.
- Pinning exact wording is not a behavior check. It freezes phrasing while the behavior behind it walks away.
