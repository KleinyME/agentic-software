# Context-Aware AI Writing Checklist

This checklist adapts Aaron Makelky's MIT-licensed `ai-writing-audit`, Siqi Chen's MIT-licensed Humanizer, and the MIT-licensed `unslop` skill from cursor/plugins (pstack). Apply judgment; patterns are not proof of authorship.

Every entry carries a default severity: `high`, `medium`, `low`, or `structural`. Severity is a starting point, not a verdict. Raise it when the pattern damages this piece; lower it when the pattern is approved voice.

## Content Patterns

- `[INFLATED]` (high): puffery and empty importance language such as "stands as a testament", "plays a pivotal role", "a pivotal moment", "evolving landscape", "setting the stage for", "indelible mark", "deeply rooted". Fix: cut the frame and state what happened.
- `[SYMBOLISM]` (medium): symbolism asserted instead of demonstrated. Fix: show the thing that carries the meaning.
- `[PROMO-FILLER]` (high): generic superlatives and category clichés such as "nestled", "vibrant", "breathtaking", "groundbreaking", "renowned", "stunning", "must-visit". Fix: replace with a supported concrete description. Approved marketing boldness is not this pattern; unsupported decoration is.
- `[NAME-DROP]` (medium): outlets, logos, partners, or clients listed without context. Fix: pick one and say what it actually said or did.
- `[SUPERFICIAL-ING]` (medium): an `-ing` phrase bolted to a fact without adding substance ("highlighting...", "ensuring...", "reflecting...", "showcasing...", "fostering..."). Fix: delete it, or expand it into a real claim with a source.
- `[VAGUE-ATTR]` (high): unnamed experts, reports, observers, or customers ("experts believe", "industry reports suggest", "some critics argue"). Fix: name the source or delete the claim. Never invent one.
- `[FORMULAIC-CHALLENGE]` (medium): the obligatory adversity beat, "despite challenges, X continues to thrive", or a challenges section that exists because the shape demands one. Fix: state a specific fact or cut the section.
- `[GENERIC-FUTURE]` (medium): vague future optimism such as "the future looks bright". Fix: state a specific plan, date, or commitment, or cut.
- `[REQUIREMENTS-COPY]` (high): copy that narrates implementation, authentication, APIs, page structure, or internal requirements instead of speaking to the audience. Fix: write the reader's outcome.
- `[REPETITION]` (medium): sections restating the same claim without a new job. Fix: merge, or give the second section a different job.
- `[DIFF-ANCHORED]` (medium): durable documentation describing what changed rather than how the thing works now. Fix: rewrite in the present tense of the current system.

## Language Patterns

- `[AI-LEX]` (medium): repeated abstract vocabulary. Common markers: additionally, crucial, delve, enduring, enhance, fostering, garner, interplay, intricate, landscape (abstract), multifaceted, pivotal, realm, showcase, tapestry, testament, transformative, underscore, utilize, vibrant. Fix: the plain word.
- `[FANCY-WORD]` (low): a longer synonym where a common word is clearer. "Utilize" becomes "use", "leverage" becomes "use", "facilitate" becomes "help", "numerous" becomes "many", "in the event that" becomes "if". Fix: prefer the plain word unless the fancier one is the term of art.
- `[COPULA-AVOIDANCE]` (low): ornate verbs standing in for "is" or "has" such as "serves as", "stands as", "boasts", "features". Fix: say "is" or "has".
- `[FALSE-PIVOT]` (medium): formulaic "not just X, but Y" contrasts that manufacture insight. Fix: state Y directly.
- `[METADISCOURSE]` (medium): announcing, signposting, or telling the reader what to conclude instead of making the point. Fix: make the point.
- `[AUTHORITY-TROPE]` (low): "the real question", "at its core", and similar profundity markers. Fix: cut the marker and keep the claim.
- `[RULE-OF-3]` (low): forcing ideas into groups of three as automatic comprehensiveness. Fix: use the number of points the idea actually has.
- `[ELEGANT-VAR]` (low): synonym cycling, where one entity becomes protagonist, main character, central figure, and hero in a paragraph. Fix: pick one name and repeat it.
- `[FALSE-RANGE]` (low): "from X to Y" where the endpoints do not form a meaningful scale. Fix: list the items directly.
- `[WEASEL]` (medium): many, various, some, often, generally, or typically where specificity matters. Fix: the number, the name, or the actual frequency.
- `[HEDGING]` (medium): stacked qualifiers such as "could potentially possibly be argued that it might", or "aims to", "strives to", "may help", "designed to enable" where a supported claim is available. Fix: one qualifier at most, or state the supported claim. Legal and regulated copy may require calibrated hedging; that is not this pattern.
- `[FILLER]` (low): phrases carrying no load. "In order to" becomes "to"; "due to the fact that" becomes "because"; "it is important to note that" is deleted.
- `[STACCATO]` (low): fragments stacked mechanically to manufacture drama. Fix: restore sentences, keep the one fragment that earns its place.
- `[APHORISM]` (medium): slogan-shaped abstractions such as "X is the language of Y" standing in for a concrete claim. Fix: the concrete claim.
- `[FAKE-CANDOR]` (medium): theatrical openers such as "Honestly?", "Real talk", or "Here's the thing" simulating intimacy. Fix: start with the point.
- `[METAPHOR-NOUN]` (medium): abstract metaphor nouns that read technical but have a plainer word. Substrate becomes base; wedge in becomes add; vector becomes way or method; locus, vantage, nexus, primitive (as noun), harness (as metaphor), surface (as in "API surface"), bedrock, scaffolding (as metaphor), modality, paradigm, north star, flywheel, endgame becomes the last phase; gold-plating becomes more than the job needs; ratchet becomes the mechanism's real name or "a limit that only tightens"; evacuate (for moving code) becomes move out. Fix: pick the concrete word.
- `[FEELING-COPY]` (high): a sentence naming a feeling instead of a fact. "The database stays close at hand", "SQL you can read", "types that follow your schema". Fix: name the mechanism, the number, or the instruction: "`.toSQL()` returns the exact string sent to the database", "a column rename fails the build". Ask what the sentence tells the reader to do or know, then write that; if it cannot be restated as a concrete instruction, fact, or number, cut it. Interchangeability test: if the sentence could appear unchanged in another project's or another company's material, it says nothing about this one.
- `[DENSE]` (medium): a sentence the reader has to backtrack to parse. Fix: split it, or drop clauses. One idea per sentence.
- `[PASSIVE]` (low): "is/are/was/were + past participle" hiding the actor. "Queries are validated" becomes "the compiler validates queries". Fix: name the actor. Passive is correct when the actor is unknown or genuinely does not matter, and technical and legal writing often need it.
- `[ADVERB-PROP]` (low): an adverb propping up a weak verb. "Runs quickly" becomes "is fast" or the measured number; "significantly improves" becomes the delta. Fix: the stronger verb or the number.
- `[GENERIC-CONCLUSION]` (medium): a closing paragraph that summarizes without adding anything. Fix: end on the specific plan, fact, or ask.

## Structural And Formatting Patterns

- `[TITLE-CASE]` (structural): title case applied everywhere without a design or venue reason. Fix: sentence case, unless the brand system or publication specifies otherwise.
- `[INLINE-BOLD]` (structural): bold on every proper noun, acronym, or key phrase, making every idea look equally important. Fix: bold what the reader must not miss, nothing else.
- `[INLINE-LIST]` (structural): repetitive bold-label-plus-colon lists where the label restates the line, as in "**Performance:** Performance improved...". Fix: convert to prose. A bold lead-in that names the item and is followed by genuinely new detail ("**Schema in TypeScript.** Tables live in one file.") is a real structure, not a tell.
- `[DECOR-EMOJI]` (structural): decorative emoji in headings and bullets of client-facing copy. Fix: remove. Keep emoji only where the brand system or the platform's own conventions call for them.
- `[DASH-HABIT]` (low): repeated dash constructions used as default sentence architecture. Do not flag every dash automatically; dashes are legitimate punctuation.
- `[COLON-CONNECTOR]` (low): colons used as mid-sentence connectors rather than before a list or example. Fix: let the point stand as its own sentence.
- `[FRAGMENT-HABIT]` (low): repeated one-line fragments creating synthetic drama.
- `[GENERIC-SECTION]` (medium): interchangeable headings such as "Why Choose Us", "Our Solutions", or "Quality You Can Trust" without a specific point of view. Fix: a heading that only this business could write.
- `[UNIFORMITY]` (structural): every paragraph, sentence, or section the same length and shape. Fix: vary the rhythm on purpose.

## Communication And Citation Artifacts

- `[COLLAB]` (high): assistant residue such as "Would you like me to", "I hope this helps", "Let me know if", "Of course!", "Certainly!".
- `[SYCOPHANCY]` (medium): "Great question!", "You're absolutely right!", and other flattery aimed at the reader or the requester. Fix: respond directly.
- `[KNOWLEDGE-CUTOFF]` (high): model limitation language such as "while specific details are limited". Fix: find the fact or remove the sentence.
- `[PLACEHOLDER]` (high): unresolved bracketed instructions, TBDs, or dates in production copy.
- `[OAICITE]` (high): internal citation artifacts.
- `[VAGUE-SOURCE]` (medium): trivial or unsupported source emphasis.
- `[REFERENCE-BUG]` (medium): malformed or unused references.
- `[INTERNAL-STATE]` (high): prompt version, confidence, claim status, reviewer note, fixture label, model name, debug field, or workflow state exposed as public copy.

## Context Rules

- Marketing may use direct address, claims, fragments, repetition, contrast, and bold formatting intentionally.
- Product UI should prioritize clarity, consequence, action, and recovery.
- Technical writing may need signposting, passive voice, repeated terminology, and precise qualifications.
- Legal and regulated copy may require exact language and calibrated hedging.
- An approved voice mannerism is not an AI tell merely because it appears on this list.
- A single token or punctuation mark rarely proves a problem; judge repetition, context, and effect.
- Typographic preferences are house taste, not evidence: em dashes, curly versus straight quotes, and title case in a system that specifies it are not tells on their own. Flag them only when the project's style guide says so or when repetition makes them a habit.
- A clean draft may intentionally retain a pattern. Do not chase a zero-pattern score.

Flag the effect, not the token.
