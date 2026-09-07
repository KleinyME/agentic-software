# Instruction alignment review

Compared suite 796a442 with Karbon's September 2026 owner-authorized design-first workflow. Keep craft-led routing, scoped approval, rendered review and preservation during hardening. Remove the duplicate technical routing sequence in the suite definition. Clarify complete imagery and optional image-stage approval. Add shared-memory checkpoints to the existing memory owner rather than another memory skill.

The current suite's relevant installed SKILL.md files match source across Codex, Claude Code and Hermes. This does not establish that every worker loads them: Karbon V3 deliberately excludes inherited skills/MCP/hooks and must receive memory from its parent. The old Karbon worker still assembles six skills but rejects V3 jobs. No causal A/B design experiment was run, and these edits do not install hooks or establish automatic cross-client memory enforcement.

Validation: Node validator passes 45 skills; image collector and installer behavioral tests pass. Windows quick validation fails on both current baseline and this branch because existing invocation metadata is rejected and several existing descriptions contain unquoted YAML colons. Track that compatibility issue separately rather than deleting checks. No installed files changed, and unrelated canonical worktree edits were preserved.

Follow-up proof: after approved sync, run one meaningful shared-memory handoff across two authorized clients and a matched homepage comparison before asserting improved reliability or aesthetic quality. Revert this PR to roll back; no migrations.
