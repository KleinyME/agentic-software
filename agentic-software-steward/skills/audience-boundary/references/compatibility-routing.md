# Writing-Skill Compatibility Routing

Use external writing skills as optional specialists. Do not let them override product truth, approved voice, or audience separation.

## Precedence

When instructions conflict, apply this order:

1. User intent, law, safety, privacy, and explicit publishing authority.
2. Verified product truth, current stage, and approved brand voice.
3. Artifact audience contract.
4. Task-specific specialist guidance.
5. Generic style cleanup.

## Candidate Repositories

### Humanizer

Source: https://github.com/blader/humanizer

Use for a final humanization pass on general prose when the user asks for it or the output shows formulaic patterns. Useful ideas include voice-sample precedence, no fabrication, pattern diagnosis, and a second audit after revision.

Do not make its token-level preferences universal. Preserve intentional punctuation and project voice when they work.

### Stop Slop

Source: https://github.com/hardikpandya/stop-slop

Use only when the user wants its stricter style. Its compact rules can be a useful stress test, but blanket bans on adverbs, passive voice, em dashes, fragments, or particular sentence openings can damage technical clarity and distinctive brand writing.

Treat pattern matches as review leads, not automatic violations.

### Agent Style

Source: https://github.com/yzhao062/agent-style

Use for technical prose such as documentation, runbooks, papers, commit messages, and error messages. Its own scope excludes marketing copy, fiction, and narrative prose, so do not route landing-page or campaign writing through it by default.

### MarketingSkills

Source: https://github.com/coreyhaines31/marketingskills

Use the smallest relevant specialist rather than loading the whole collection. Examples include copywriting, copy editing, page CRO, offers, pricing, onboarding, email sequences, launches, and product marketing.

Establish project product/brand context first. Marketing specialization may improve persuasion or conversion structure; it does not authorize new claims, fabricated proof, hidden limitations, or publication of internal notes.

## Suite Sequence

For user-facing copy:

1. Establish intent, product truth, current stage, and audience.
2. Use brand direction or creative direction when the concept is unresolved.
3. Use `brand-copy-steward` and the smallest relevant copy/marketing specialist.
4. Use `audience-boundary` to keep internal material out of public sinks.
5. Use `ai-writing-audit` or an explicitly requested humanizer for the final prose pass.
6. Use `no-theater-software` and completion evidence for claims about behavior or readiness.

Never install, vendor, or copy a third-party skill silently. Preserve its license and notice requirements, pin serious dependencies when possible, and validate behavior after an update.
