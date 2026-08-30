# Attribution

This skill adapts:

- `create-verification-skill` from the pstack plugin by Lauren Tan
  - Source: https://github.com/cursor/plugins/tree/main/pstack
  - Pinned ref: `68836ddaf5697224520f1847d90cdb90ca8babaa` (pstack v0.14.5)
  - Upstream license: MIT
  - Files used as reference: `skills/create-verification-skill/SKILL.md`, `skills/create-verification-skill/references/feature-map-example/README.md`, `skills/create-verification-skill/references/feature-map-example/create-note.md`

This adaptation keeps upstream's mechanism whole: interview the repo rather than the user, generate a project-local `verify-<app>` skill with Launch, Doctor, Drive, Evidence and Cleanup sections, seed a `features/` map with a README index and one file per feature carrying the four required H2s and ending in the observable end state that proves the feature works, and prove the generated skill end to end once before handover ("A generated skill that was never executed is a draft, not a deliverable"). The changes are host and business fit: the generated skill lands in the target project's own skills directory instead of `.cursor/skills/`, the driving harness defaults to Playwright or a headless browser with HTTP and PTY as alternatives instead of Cursor's control adapters, the worked example is retargeted from upstream's note-taking app to a client-website quote form (upstream's "a save status alone is insufficient proof, reopen the note from the list" becomes "a success message alone is not proof, confirm the submission arrived at its destination"), the run trail routes to `show-me-your-work`, and a "Relation to the suite" section ties the generated skill to the production-verified stage that `evidence-before-completion` and `no-theater-software` gate on.
