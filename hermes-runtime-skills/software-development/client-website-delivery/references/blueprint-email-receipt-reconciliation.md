# Blueprint Email Receipt Reconciliation

Use this when Karbon records a Blueprint email as sent or delivered but the client says it never appeared.

## Delivery states are not the same

Keep these claims separate:

1. **Provider accepted** — the sending API accepted the request and returned an email id.
2. **Recipient server accepted** — a provider event such as `delivered` means the recipient's mail server accepted the message.
3. **Client found it** — only the recipient can confirm inbox visibility or receipt.

Never translate provider `delivered` into “it is in the inbox.” It does not prove Gmail/Outlook placement, category, threading, quarantine, or which account the client is viewing.

## Proactive owner copy and evidence archive

When the owner wants to monitor results, configure this **before** the send attempt finishes:

1. Watch durable application state for the exact capture/job, not only the launcher process.
2. Require the durable sent timestamp, sent delivery state, and provider message ID before announcing success.
3. Retrieve the exact provider email by message ID; do not reconstruct the body from a template that may have changed.
4. Preserve both the provider HTML and an `.eml` copy with sender, recipient, subject, date, and provider ID.
5. Extract the PDF/report URL from the exact sent HTML, download it, and validate its file signature before attaching it for owner review.
6. Preserve a sanitized evidence record linking application record IDs, provider ID/timestamps, artifact URL, and archive files.
7. Notify the owner in chat with the email copy and PDF only after all evidence checks pass. If blocked, retry-scheduled, failed, or uncertain, report that state instead and attach nothing as “sent.”

The client email may link to a PDF rather than attach one. The owner’s archive can still include a verified downloaded copy, but describe it accurately as the exact report linked in the sent message.

See the watcher lifecycle and archive mechanics in `windows-native-process-automation/references/durable-completion-watchers-and-delivery-archives.md`.

## Investigation order

1. Retrieve the exact sent-email record from the provider, not only Karbon's local completion state.
2. Verify recipient, sender, subject, creation time, and latest provider event.
3. Verify the sending domain is currently authenticated/enabled.
4. Compare the recipient with the client record and the address the client says they are checking.
5. If the event is `bounced`, `failed`, `complained`, or delayed, handle that provider state before retrying.
6. If the event is `delivered`, tell the owner precisely that the recipient server accepted it—not that the inbox received it.

Give the recipient exact searches rather than generic “check spam” advice:

- Search **All Mail** as well as Inbox and Spam.
- Search the exact `from:` address.
- Search a distinctive exact subject phrase.
- Check Promotions, Updates, quarantine, focused/other inboxes, and message threads.

## One controlled fallback

When the owner already authorized sending the Blueprint and reports non-receipt, one controlled fallback send is appropriate. Do not loop or resend the identical marketing-formatted message.

Use:

- the confirmed recipient address;
- a new, personal subject naming the recipient/business and saying the PDF is attached;
- concise plain text plus simple HTML;
- the real PDF attachment, after fetching and validating it;
- direct web-report, PDF, and portal links;
- a request to reply `received`;
- a new idempotency key specific to the fallback attempt.

After sending, retrieve the new provider record and report the exact event. If the second message is accepted by the recipient server but remains invisible, stop automatic retries. Confirm the client is checking the exact account, offer the direct links through the owner, and ask for an alternate address before another send.

## Reporting language

Good:

> Resend reports that Gmail accepted the message for `client@example.com`. That proves delivery to Gmail's server, not inbox placement. I sent one simpler fallback with the PDF attached and asked for a receipt reply.

Bad:

> The email was delivered, so it must be in the inbox.

## Verification checklist

- [ ] Exact provider email record retrieved
- [ ] Recipient, sender, subject, time, and event verified
- [ ] Domain authentication/enabled state checked
- [ ] Provider acceptance distinguished from human receipt
- [ ] Fallback uses a new subject and idempotency key
- [ ] PDF attachment and all links were validated before fallback
- [ ] Provider event for fallback was retrieved
- [ ] No repeated retries after a second server-accepted message
