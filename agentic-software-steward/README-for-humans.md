# Agentic Software Steward

This package is a v1 Codex skill suite for active agent-built software stewardship.

Use `software-steward` as the lead skill. It coordinates architecture, project memory, no-theater software, design, brand/copy, security/data safety, live/dev environment safety, release hygiene, repo audits, and remediation planning.

The suite is intentionally modular. Specialist skills should load only when relevant.

Running the steward against a repo should not stop at documentation. It should create foundation memory, inspect the code, produce findings, classify risk, identify fake/unwired behavior, and recommend or perform the first safe remediation.

For live apps, the suite uses a safety ladder. It prefers production plus live-dev/preview environments from the beginning, asks to connect MCPs/plugins when they can set that up safely, and falls back to branch/local/read-only/dry-run workflows when full staging is too much friction.
