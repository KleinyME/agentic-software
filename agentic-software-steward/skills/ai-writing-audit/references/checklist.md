# Context-Aware AI Writing Checklist

This checklist adapts Aaron Makelky's MIT-licensed `ai-writing-audit` and Siqi Chen's MIT-licensed Humanizer. Apply judgment; patterns are not proof of authorship.

## Content Patterns

- `[INFLATED]`: empty importance language such as "stands as a testament", "plays a pivotal role", or "underscores the importance".
- `[SYMBOLISM]`: symbolism asserted instead of demonstrated.
- `[PROMO-FILLER]`: generic superlatives, category clichés, or unsupported promotional language.
- `[SUPERFICIAL-ING]`: an `-ing` phrase attached to a fact without adding substance.
- `[GENERIC-FUTURE]`: vague future optimism or obligatory challenges sections.
- `[REQUIREMENTS-COPY]`: copy that narrates implementation, authentication, APIs, page structure, or internal requirements instead of speaking to the audience.
- `[REPETITION]`: sections restating the same claim without a new job.
- `[DIFF-ANCHORED]`: durable documentation describing what changed rather than how the thing works now.

## Language Patterns

- `[AI-LEX]`: repeated abstract words such as delve, landscape, multifaceted, pivotal, realm, tapestry, transformative, utilize, or vibrant.
- `[COPULA-AVOIDANCE]`: ornate verbs such as "serves as" or "stands as" replacing a clearer "is" or "has".
- `[FALSE-PIVOT]`: formulaic "not X, but Y" contrasts that manufacture insight.
- `[METADISCOURSE]`: announcing, signposting, or explaining what the reader should conclude instead of making the point.
- `[AUTHORITY-TROPE]`: phrases such as "the real question" or "at its core" implying profundity without adding precision.
- `[RULE-OF-3]`: repeated three-part phrasing used as automatic comprehensiveness.
- `[STACCATO]`: fragments stacked mechanically to manufacture drama.
- `[APHORISM]`: slogan-shaped abstractions such as "X is the language of Y" standing in for a concrete claim.
- `[FAKE-CANDOR]`: theatrical openers such as "Honestly?", "Real talk", or "Here's the thing" used to simulate intimacy.
- `[VAGUE-ATTR]`: unnamed experts, reports, observers, or customers.
- `[WEASEL]`: many, various, some, often, generally, or typically where specificity matters.
- `[ELEGANT-VAR]`: unnecessary synonyms for the same entity.
- `[FALSE-RANGE]`: "from X to Y" where the endpoints do not form a meaningful range.
- `[HEDGING]`: aims to, strives to, may help, can support, or designed to enable when a clearer supported claim is available.

## Structural And Formatting Patterns

- `[TITLE-CASE]`: title case used everywhere without a design or venue reason.
- `[INLINE-BOLD]`: excessive bold fragments that make every idea look equally important.
- `[INLINE-LIST]`: repetitive bold-label-plus-description lists.
- `[DASH-HABIT]`: repeated dash constructions used as default sentence architecture. Do not flag every dash automatically.
- `[FRAGMENT-HABIT]`: repeated one-line fragments creating synthetic drama.
- `[GENERIC-SECTION]`: interchangeable headings such as "Why Choose Us", "Our Solutions", or "Quality You Can Trust" without a specific point of view.
- `[UNIFORMITY]`: every paragraph, sentence, or section following the same length and shape.

## Communication And Citation Artifacts

- `[COLLAB]`: "Would you like me to", "I hope this helps", or other assistant residue.
- `[PLACEHOLDER]`: unresolved bracketed instructions or dates in production copy.
- `[KNOWLEDGE-CUTOFF]`: model limitation language.
- `[OAICITE]`: internal citation artifacts.
- `[VAGUE-SOURCE]`: trivial or unsupported source emphasis.
- `[REFERENCE-BUG]`: malformed or unused references.
- `[INTERNAL-STATE]`: prompt version, confidence, claim status, reviewer note, fixture label, model name, debug field, or workflow state exposed as public copy.

## Context Rules

- Marketing may use direct address, claims, fragments, repetition, contrast, and bold formatting intentionally.
- Product UI should prioritize clarity, consequence, action, and recovery.
- Technical writing may need signposting, passive voice, repeated terminology, and precise qualifications.
- Legal and regulated copy may require exact language and calibrated hedging.
- An approved voice mannerism is not an AI tell merely because it appears on this list.
- A single token or punctuation mark rarely proves a problem; judge repetition, context, and effect.

Flag the effect, not the token.
