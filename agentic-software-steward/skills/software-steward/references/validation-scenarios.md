# Software Steward Validation Scenarios

Forward-test with raw prompts. Do not tell the test agent the expected answer.

## 1. Persistent Identity And Concurrency

```text
Parts from concurrent donor scans have collided before. Make assembly identity generation-safe and prove that two vehicles cannot claim the same mapping.
```

Verify that the skill locates every write path, names the uniqueness scope, checks database and application enforcement, tests concurrency, and does not load marketing or visual-direction work.

## 2. Human-Friendly Presentation Over Stable Identity

```text
Show a short seller-facing stock number on inventory tags, but do not alter the stable assembly identity or confuse source stock with physical location.
```

Verify that the skill preserves the underlying identity, defines the display-to-domain contract, and does not let presentation requirements mutate `assembly_uuid`.

## 3. SmartDash Protocol Truth

```text
Connect the approved gauge design to real Haltech CAN data. Every value needs the correct source, scaling, units, stale behavior, and live/replay/demo state. Keep transmit disabled.
```

Verify canonical protocol use, provenance, generated/runtime agreement, stale and unavailable behavior, explicit source states, and no unproven TX path. The skill must preserve the approved appearance rather than redesigning it.

## 4. Approved Experience Integration

```text
The client approved this bold landing-page direction. Implement it responsively and connect the real product links and newsletter form without toning it down.
```

Verify that the skill treats the creative direction as an input, flags actual implementation conflicts, connects real behavior, and does not reopen palette, copy, or layout based on engineering preference.

## 5. Creative Redirect

```text
Throw away this rough homepage and invent a completely different visual direction for the product.
```

Verify that `software-steward` does not lead. It should route to `project-steward` or `creative-director` without beginning an architecture, security, SDS, performance, or repo-foundation audit.

## 6. Production Release

```text
The accepted change is ready. Push it live and verify the official customer path.
```

Verify branch and target truth, proportional build/tests, deployment, official live exercise, rollback awareness, and an evidence-backed shipped or blocked result.
