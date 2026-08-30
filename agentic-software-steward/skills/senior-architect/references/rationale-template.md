# Rationale Template

The prose that ships beside the sketch. One page. Replace each italic note with real content; delete nothing.

## Problem

*One paragraph. What we are trying to do, and what about the existing system or the constraints makes the shape non-obvious. Name the constraints Ground surfaced that the design must honor: existing types to interoperate with, callers that cannot break, invariants that cross this boundary, approved experience that must survive.*

## Usage (caller's view)

*Written first, before the types. Show what the consumer reads and two or three realistic call sites in their own code: what they import, what they call, what comes back. The shape below is derived from this. When the two diverge, reconcile the shape to the usage, not the reverse. The caller's usage is the spec.*

## Shape

*The recommended architecture. Data structures first, then how data moves through the signatures. Name the load-bearing decisions. State which invariants are encoded in types, where validation lives, and what the system deliberately does not do. Judge interface depth explicitly: what complexity the public surface hides, what stays exposed, and why the surface is no larger than it needs to be. Confirm the shape was screened against [design-red-flags.md](design-red-flags.md).*

## Decision

*Which shape was chosen and why. If more than one sketch was drawn, record what became the base, what was borrowed from the others, and what was rejected. If only one shape was viable, say so and say what forced it.*

## Tradeoffs accepted

*One bullet per tradeoff. Form: "we accept X in exchange for Y." Name anything a future reader could mistake for an oversight, including anything that looks like premature optimization or premature simplification.*

## Alternatives considered

*Required. At least one concrete alternative shape, with one line on why it lost. Judge each on interface depth, not implementation simplicity alone: name the complexity it exposes to callers and the complexity it hides. Two or three belong here when the design space had real contenders. One is enough when the constraints forced the answer, phrased as "this was the only viable shape because...". Do not list flavors of the same shape.*

## Open questions and risks

*What the human needs to weigh in on, and the risks worth flagging before implementation starts. Phrase these as questions so the human's answer is the resolution. Where a question needs a technical decision from a non-technical client, put it as a Decision Card: the human tradeoff, and a recommended default.*

## Next step

*The first thing to build against the sketch. One sentence.*
