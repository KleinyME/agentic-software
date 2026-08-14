# Copy-System Research Sources

The suite adapts selected ideas rather than vendoring these repositories wholesale.

## Adapted Sources

### Humanizer

- Source: https://github.com/blader/humanizer
- Research ref: `523374dee72d67c7b2b5f858ea0094ffda49c3ac`
- License: MIT; preserved in `licenses/humanizer-MIT.txt`
- Adapted ideas: supplied-voice precedence, no fabrication, contextual pattern diagnosis, and a second audit after revision.
- Destination: `skills/ai-writing-audit` and `skills/brand-copy-steward`.

### MarketingSkills

- Source: https://github.com/coreyhaines31/marketingskills
- Research ref: `7868cb9251fad80a73d26e488a5ad5f6c4a9f335`
- License: MIT; preserved in `licenses/marketingskills-MIT.txt`
- Adapted ideas: shared product-marketing context, customer-language capture, switching forces, focused copy-editing sweeps, and task-specific capability routing.
- Destination: `skills/brand-copy-steward/references`.

## Evaluated But Not Vendored

### Stop Slop

- Source: https://github.com/hardikpandya/stop-slop
- Research ref: `8da1f030185bdfe8471220585162991eaeb970e9`
- Decision: keep as an optional strict stress test. Do not make its blanket bans the suite default.

### Agent Style

- Source: https://github.com/yzhao062/agent-style
- Research ref: `05fc6c8a77d4a8efc08ddfdc4d01534cb98ed2c8`
- License note: prose/rules use CC BY 4.0; enforcement code uses MIT.
- Decision: use as an optional technical-writing companion. Do not route marketing or brand copy through it by default.

## Update Policy

Do not silently pull upstream changes. Before adapting a newer version:

1. Record the new commit.
2. Review license and structural changes.
3. Compare behavior against the suite's approved voice, truth, stage, and audience rules.
4. Run copy and leakage validation scenarios.
5. Update this record and the affected skill notices.
