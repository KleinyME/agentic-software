---
name: principle-guard-the-context-window
description: Route bulk to fresh contexts; keep summaries in the main thread.
disable-model-invocation: true
---

# Guard The Context Window

Send bulk reading, sweeps, and wide searches to a dispatched agent in a fresh context. Bring back conclusions, never raw payloads.

**Why:** Attention thins across a crowded window, and the material that gets crowded out is usually the task itself. A fresh context also reviews without inheriting the producer's reasoning, which is what makes an independent check independent.

**Pattern:**

- Give a dispatched agent a bounded brief: the goal, the scope, what counts as done, and the shape of the return.
- Require a typed return. One accountable owner assembles the results and remains answerable for the whole.
- Keep summaries and pointers in the main thread; leave transcripts and dumps in the subagent.
- Give an independent reviewer the requirement and the artifact, not the producer's reasoning history.
- Dispatch in parallel when the slices are genuinely independent, and say so when they are not.
