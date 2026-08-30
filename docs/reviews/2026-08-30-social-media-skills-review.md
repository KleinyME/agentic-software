# Review: charlie947/social-media-skills

Date: 2026-08-30
Source: https://github.com/charlie947/social-media-skills (MIT)
Context: 17 of these skills are vendored into KleinyME/Karbon-AI on
`claude/social-media-marketing-ug3izq`, with a pre-built voice profile under `.claude/voice/`.

## What it is

A content-production system, not an engineering-discipline repo, so it is a different genre
from mattpocock/skills and pstack. One source flows outward: `voice-builder` establishes
`about-me.md` and `voice.md`, `newsletter-voice` turns those into the newsletter, and every
channel skill (post-writer, reels-scripting, quote-post, youtube-thumbnail, and the rest)
reads that shared context before drafting a line.

## Worth stealing

1. **Shared context files as one source of truth for voice.** Every skill reads
   `about-me.md` and `voice.md` rather than restating the voice. This is exactly the fix
   for this suite's three competing claim-status vocabularies, and it is Matt Pocock's
   single-source-of-truth rule applied to brand rather than to code.
2. **Graceful degradation on a soft dependency.** "Pulls from about-me.md and voice.md if
   they exist, otherwise asks for pillars and context." Each skill works with no setup and
   gets better with it, which is the right treatment for a dependency whose absence degrades
   output rather than corrupting it.
3. **A trigger-phrasing lint.** `validate-skills.sh` warns when a description carries no
   "use" or "when" phrasing. That is a description-quality check worth adding beside this
   repo's length budget in `scripts/validate-suite.mjs`.
4. **An explicit auto-start contract.** `post-writer` opens with "CRITICAL: Auto-start on
   load", removing the dead turn where the agent asks what the user would like.

## Where it is weaker than the other two repos

**The always-loaded surface is the heaviest of the three.** 17 skills carry 8,627 characters
of description, averaging 507 each; its own validator only warns past 1,024. For comparison,
after this suite's invocation-axis pass, all 35 skills here cost 5,119 characters. Installing
all 17 therefore adds roughly 2,150 tokens to every session in that repository, including
sessions doing unrelated engineering.

**Two skills are hard-coded to the upstream author.** `pinned-comment` names him and his team
18 times and triggers on their asks, so it will rarely fire and will write in his persona when
it does. `post-scorer` offers his benchmark baseline (1,872 average engagement across 500
posts, from a 415k-follower account) as the scoring fallback, which grades an ordinary draft
as a failure every time. The second one is not a style nit; it is a miscalibrated instrument.

**Bodies run long.** Up to 263 lines, with the validator warning only past 500. Both other
professional repos keep almost everything under 140.

## Recommendation for the Karbon-AI vendoring

The vendoring decision was sound and the voice profile written for it is specific and good.
Two changes before relying on it:

1. **Apply the invocation axis, not just narrower triggers.** The proposed fix of narrowing
   `post-writer`'s description so `brandvoice-adam` keeps the generic "write a post for me"
   works, but the stronger move is to set `disable-model-invocation: true` on nearly all 17.
   A user-invoked skill has no description in the agent's reach at all, so it cannot compete
   for a trigger and costs nothing per turn. That removes the collision and the ~2,150-token
   tax in one edit, and leaves at most one of them model-invoked.
2. **Rewrite `post-scorer`'s baseline to real numbers, and drop or rewrite `pinned-comment`.**
   A scorer calibrated to someone else's audience is worse than no scorer.

Note that this suite's own overlap with those skills is already reduced: as of the invocation
axis pass, `100-year-copywriting-engine` is user-invoked and so no longer competes for "write
a social post", and `brand-copy-steward` is now scoped to UI copy with long-form ads routed
away from it explicitly.
