---
name: visual-direction
description: Select a business-appropriate visual style, collect and audit imagery from an existing client site, decide what to reuse/edit/replace, and generate a cohesive image set for client-facing sites, pages, and apps. Use for art direction, mood and style selection, reference-site analysis, image inventories, existing-site redesigns, hero or supporting imagery, AI image generation, and prompts such as "use images from their current site" or "what visual style fits this business?"
---

# Visual Direction

Own imagery and art direction before frontend implementation. Build a visual system that serves the audience, positioning, desired feeling, and real business evidence.

## Inputs

Read the brand direction when present. Otherwise infer from:

- Business type and offer.
- Audience and buying context.
- Price, trust, and consideration level.
- Value source: craft, provenance, expertise, performance, community, convenience, or transformation.
- Desired feeling and differentiation.
- Reference sites and anti-references.
- Existing client imagery and content.

Business category is a prior, not a template. Positioning and desired difference outrank category convention.

## Workflow

### 1. Recommend The Visual Register

Choose one primary direction and, when useful, one stretch direction. Define:

- Photography, illustration, 3D, diagram, texture, or mixed-media approach.
- Subject treatment.
- Lighting and mood.
- Composition and cropping.
- Palette and material texture.
- Image density and page rhythm.
- Motion treatment when relevant.
- One memorable visual idea.
- Category cliches and generated-image tells to avoid.

Read `references/style-selection.md` when the appropriate style is not obvious.

### 2. Collect Existing Client Assets

For an authorized client site, inspect important pages and collect useful image candidates. Prefer original-resolution `srcset`, Open Graph, gallery, product, team, place, process, and background assets over thumbnails.

Use `scripts/collect-client-site-images.mjs` for a bounded public-site collection when appropriate:

```powershell
node scripts/collect-client-site-images.mjs --url https://client.example --out ./visual-assets --max-pages 12 --max-assets 100
```

The script writes local files plus `asset-manifest.json`. Review its output; collection is not approval.

Classify every useful asset as:

- `use`
- `crop-or-optimize`
- `edit`
- `generation-reference`
- `replace`
- `client-confirmation`

Do not hotlink production assets. Do not collect competitor imagery for reuse; analyze competitor style only.

### 3. Fill The Gaps

Choose the correct source per placement:

- Existing client-owned asset.
- Edited or color-treated client asset.
- AI-generated preview or production-approved asset.
- Licensed stock.
- New client photography or rendering.
- Code-native SVG, CSS, or diagram.

Use the `imagegen` skill for raster generation or edits. Use frontend/code tools for vectors, icons, diagrams, and native interface graphics.

Generate one anchor image first. Once approved, derive supporting assets from the same visual DNA rather than producing unrelated one-off images.

The shared visual DNA should define medium, subject, camera/composition, lighting, palette, texture, emotional register, negative space, invariants, and avoid items.

### 4. Design For The Page

For every selected image, consider:

- Intended section and narrative job.
- Desktop and mobile crop behavior.
- Focal point and copy-safe negative space.
- Contrast behind text.
- Loading and performance.
- Useful alt text.
- Whether the image proves something real or establishes atmosphere.

Do not generate text inside images when HTML text is more accessible and responsive.

### 5. Keep Review Metadata Off The Page

The rendered preview stays clean. Put source, approval, generation status, replacement needs, and factual concerns in the separate `CLIENT_REVIEW.md` image plan.

Read `references/image-use-and-truth.md` for people, products, materials, documentary evidence, and reference-site boundaries.

## Outputs

Provide:

1. Primary visual direction and rationale.
2. Optional stretch direction.
3. Asset inventory with use/edit/generate/replace decisions.
4. Cohesive prompt specification for generated assets.
5. Placement and responsive-crop plan.
6. Client-review image table outside the page.
7. Production asset requirements for deployment readiness.

Hand the selected direction and assets to frontend design, then verify the rendered result with screenshots before client review.

