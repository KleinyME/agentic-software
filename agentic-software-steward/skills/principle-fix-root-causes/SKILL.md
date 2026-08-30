---
name: principle-fix-root-causes
description: Trace each symptom to its cause and fix it there.
disable-model-invocation: true
---

# Fix Root Causes

Reproduce first, ask why until you reach the cause, and fix it at the source.

**Why:** A guard that silences a crash moves the failure somewhere later and less legible, and it spends the one clear reproduction you had. Symptom patches also compound: each one adds a place the next debugger has to rule out.

**Pattern:**

- Reproduce before theorising. A cause you cannot demonstrate is a guess.
- Resist the nil check, the raised timeout, the added retry, and the swallowed error. Reach for them only when evidence shows that is the correct root-level treatment.
- If a workaround needs a paragraph-long comment to justify it, the code is wrong, not the comment.
- Restart bugs: suspect state before code.
- After three rejected fix attempts, stop patching and reassess the reproduction, the boundary, and the architecture.

This card is the steering handle. The full procedure, including how to build a red-capable feedback loop before forming any hypothesis, is the `diagnosing-bugs` skill.
