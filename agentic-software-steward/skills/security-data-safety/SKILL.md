---
name: security-data-safety
description: Review security, privacy, permissions, secrets, migrations, destructive actions, and external integrations. Use for auth, sensitive data, payments, and deletion. Not a full threat model for regulated work.
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
- Live API mutations when no sandbox/dev environment exists.

## Review Questions

- What data exists?
- Can it be recreated?
- Who can read, create, update, or delete it?
- What happens if it is leaked, corrupted, deleted, or migrated badly?
- Where are secrets stored?
- Is there a backup or rollback path?
- What failure states should users see?
- What logs are useful without leaking sensitive data?
- Is this using production credentials, sandbox credentials, or read-only access?
- Can this be tested with dry-run mode or adapter tests before touching live data?

## High-Risk Requirements

For high-risk changes:

- Work on a branch.
- Produce a short threat model.
- Add tests for allowed and denied paths.
- Avoid hard-coded secrets.
- Document rollback or recovery.
- Update project memory and ADRs when architecture changes.

For critical-risk changes, stop and ask for explicit approval before proceeding.

## Live External API Policy

If a change writes to a live external system, treat it as high risk by default.

Examples:

- Shopify inventory adjustments, order edits, product updates, refunds, fulfillment changes.
- Payment captures, charges, refunds, subscriptions.
- Customer emails, SMS, or notifications.
- Destructive database operations.

Requirements:

- Prefer sandbox/test credentials.
- If sandbox setup is unavailable, build and test the payload path with dry-run mode or mocked adapter tests first.
- Show the target account/store/project, current state, requested change, and expected after-state before live submission.
- Require explicit user confirmation for live mutation behavior.
- Record rollback/undo instructions.
