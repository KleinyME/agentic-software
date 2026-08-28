# Component Assembly

Own the composition; borrow the mechanics.

Use mature components for solved interaction mechanics while keeping the business-specific composition, hierarchy, content, imagery, and signature behavior authored from the product rather than from a catalog.

## Procedure

1. Establish the customer job, business-specific creative thesis, and real conversion path before browsing components.
2. Inventory the repository's framework, current primitives, tokens, dependencies, licenses, and interaction conventions.
3. Reuse a mature compatible primitive when it improves difficult mechanics such as dialogs, focus management, comboboxes, date selection, menus, and dense data tables.
4. Choose one compatible primitive foundation per surface. Do not mix libraries opportunistically.
5. Adapt incoming code to accepted tokens, density, typography, states, motion, data contracts, and error behavior immediately.
6. Author page composition, information hierarchy, imagery, content structure, and the signature interaction from business evidence.
7. Verify keyboard behavior, focus, semantics, zoom, responsive states, reduced motion, performance, and the actual license after adaptation.

## Decision Record

For nontrivial external component use, record:

```yaml
component_source:
  need: ""
  source: ""
  version_or_commit: ""
  license: ""
  mechanics_reused: []
  project_expression_authored: []
  adaptations: []
  verification: []
```

## Reject Universal Defaults

No library is the default for every React project. Do not apply rules such as “never invent,” mandatory dark mode, one accent color, or a fixed animation duration as general design law. A component source can improve accessibility mechanics, but accessibility is not inherited automatically after composition, styling, data wiring, or behavior changes.
