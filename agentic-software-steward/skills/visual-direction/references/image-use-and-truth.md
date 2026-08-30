# Image Use And Truth

## Client Assets

- Reuse imagery from an authorized client site when it supports the new direction.
- Preserve source URLs and original filenames in the asset manifest.
- Prefer local project copies over production hotlinks.
- Treat existing-site ownership as likely but not certain when provenance is unclear; request confirmation in the review document.
- Treat a fact stated on the client site as source-supported for concept copy, but do not treat its publication as automatic permission to extract and republish every photo, badge, logo, or third-party mark.

## Prospect Previews

A prospect's published imagery may appear in a concept built to show that business its own possible future. Publication state decides how:

- Always allowed in any mode: analyzing prospect imagery as evidence. Extract palette, scenes, subjects, equipment, lighting, and material texture to drive the visual direction. Analysis is not reproduction, and it is how the concept inherits the business's real visual world.
- Access-protected preview shared with the owner through a revocable link: prospect imagery may be reproduced in the design, including the owner, team, and bio photography - the people are part of the business's authenticity and belong in the pitch. Use local project copies, never production hotlinks.
- Publicly reachable URL before the owner engages: do not reproduce the prospect's imagery or people. Keep public demos imagery-light or use generated, owned, or code-native assets.
- Minors are the exception in every mode: never reproduce a real child's image in any preview, protected or not. Use the stand-in rules below.

Owner engagement is the authorization event. Once the owner requests or approves the work, adult and business imagery follows the client-asset rules above; imagery of children waits for authentic client-supplied photos obtained through the client's own consent relationship.

## Preview Stand-Ins And Replacement Flags

When a real image cannot be used yet - a child, suspected stock, or a missing asset - generate a stand-in that fits the scene and the visual DNA:

- For minors, compose stand-ins the way childcare and dance marketing already protects privacy: from behind, mid-motion, wide framing, or detail shots. Avoid photoreal synthetic child faces. Never model a stand-in on a specific real child, and never caption any stand-in as a specific real person.
- Name every stand-in and generated replacement with the reserved prefix `ai-preview--` and record it in the asset manifest and image plan with status `preview-replacement`, including what authentic asset should replace it.
- Production promotion swaps every `ai-preview--` asset for authentic client-supplied imagery. A flagged filename surviving into a production release is a release blocker, verified alongside routes in `environment-and-release`.

The flag lives in filenames and internal records, never as a badge or caveat on the customer-facing page.

## Stock Detection And Replacement

Small-business sites often carry stock or vendor-supplied imagery the business may not hold rights to redistribute. Treat these as stock tells: stock-library filenames or URL paths, watermarks, scenes inconsistent with the business's geography, equipment, or season, generic model photography, and reverse-search hits on licensing libraries.

Do not reuse suspected stock in any preview. Replace it under the stand-in and flag rules above, and record the substitution in the image plan. Generated replacements follow the documentary-truth rules below; a stock swap is also a finding worth telling the owner about.

## Reference And Competitor Sites

- Analyze visual language, composition, density, and mood.
- Do not copy their photography, illustrations, logos, or distinctive visual expression into the client site.

## Generated Imagery

Generated imagery can be a final production asset when the client approves it. It is not automatically a placeholder.

Use extra care when an image could imply documentary truth:

- Do not silently present generated people as actual customers, staff, students, testimonial authors, or community members.
- Use real photography when the identity of people or place is part of the proof.
- Use actual product or material photography when exact appearance, inventory, finish, or construction matters.
- Use real certification marks, lab records, documents, and evidence. Confirm current association and authorized asset use before production; preserve a source-supported certification in concept copy while that asset check remains open.
- Generated atmospheric, editorial, conceptual, and abstract imagery is appropriate when it accurately supports the intended brand.

Record these decisions in `CLIENT_REVIEW.md`, never as badges or warnings inside the page.
