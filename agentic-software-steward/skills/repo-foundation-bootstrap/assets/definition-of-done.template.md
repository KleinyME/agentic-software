# Definition Of Done

A feature is done only when:

- Its current stage is declared honestly.
- A client-review preview fulfills its approved visual, copy, and intended-workflow scope.
- Production behavior works end to end against the intended resources.
- Primary actions perform the action they claim.
- Data persists when users would reasonably expect persistence.
- Empty, loading, error, success, disabled, and permission states exist where relevant.
- Newly created user-visible copy reflects product and brand context, states the real action or consequence, and received a contextual writing review.
- Raw model or agent responses never flow directly to public renderers; public payloads exclude prompts, private reasoning, audit state, review notes, debug data, and secrets.
- Tests or checks cover important behavior.
- Security/data risks were reviewed for the change.
- Replaced code, unused imports, duplicate helpers, and stale docs were removed when safe.
- Project memory, design memory, module memory, or ADRs were updated if intent or architecture changed.
- The final handoff says what was verified and what remains risky or unfinished.
- Review annotations and implementation notes remain outside the rendered customer experience.
