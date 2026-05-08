---
name: security-data-safety
description: Review and plan security, privacy, data safety, permissions, secrets, migrations, destructive actions, and external integrations. Use for auth, roles, sensitive data, payments, credentials, deletion, data model changes, backups, rollback, threat modeling, and high-risk changes.
---

# Security And Data Safety

Treat data and trust as first-class architecture.

## Trigger Areas

Use this skill for:

- Auth and sessions.
- Roles and permissions.
- Private or sensitive data.
- Payments.
- Secrets and credentials.
- External integrations.
- Data migrations.
- Deletion or destructive actions.
- Public APIs.
- Deployment or environment changes.

## Review Questions

- What data exists?
- Can it be recreated?
- Who can read, create, update, or delete it?
- What happens if it is leaked, corrupted, deleted, or migrated badly?
- Where are secrets stored?
- Is there a backup or rollback path?
- What failure states should users see?
- What logs are useful without leaking sensitive data?

## High-Risk Requirements

For high-risk changes:

- Work on a branch.
- Produce a short threat model.
- Add tests for allowed and denied paths.
- Avoid hard-coded secrets.
- Document rollback or recovery.
- Update project memory and ADRs when architecture changes.

For critical-risk changes, stop and ask for explicit approval before proceeding.

