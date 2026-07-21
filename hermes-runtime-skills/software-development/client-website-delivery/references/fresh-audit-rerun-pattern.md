# Fresh Audit Rerun Pattern

Use this when the owner asks for the newest audit result for a managed client/test site.

## Goal

Produce a genuinely fresh current-site baseline plus the current paid/report-style Blueprint artifact, then return only the reviewable links and the measured snapshot. Do not treat the rerun as approval for implementation, launch, DNS, production promotion, client send, spend, deletion, or final completion.

## Pattern

1. **Confirm the target and scope.** Identify whether the owner wants the free baseline, paid Blueprint/report, or both. If they say "newest audit result" for a known project, default to refreshing the current public-site baseline and generating the owner-review Blueprint/report from it.
2. **Run safety/readiness checks first.** Use the repo's current guarded check before starting local backend/report work when available.
3. **Use a fresh baseline path, not cache.** Exercise the protected current-site baseline endpoint or equivalent audit command so the current public URL is inspected again. Avoid relying on an existing report, cached audit payload, or old preview audit.
4. **Generate the report from that baseline.** Create the paid/Blueprint-style report from the fresh baseline record and include source context when source notes exist. Keep project-specific claims source-backed.
5. **Verify the deliverable surface.** Check both local and public print/PDF routes when public owner review is expected. A report id is not enough; the web report and PDF must return successfully.
6. **Summarize with measured evidence.** Include generated time, report/PDF links, finding count, severity count, and key score values. Use the report's actual finding fields (`severity`, `plainEnglish`, `title`) rather than guessing from older summary conventions such as `priority`.
7. **State the boundary once.** Say the rerun refreshed audit/report evidence only and did not approve implementation/launch/client-send actions.

## Common Pitfalls

- **Counting the wrong field.** Some report findings use `severity`, not `priority`; using the wrong field can falsely report 0 high/medium findings.
- **Returning stale report links.** If the user asks for the newest result, generate and verify a new report instead of sending a previous artifact.
- **Confusing preview audits with baseline audits.** Preview audits are after-state evidence. They do not replace current-site baseline evidence for a new audit result.
- **Exposing internals in chat.** Do not include local paths, commands, ports, process ids, backend keys, or raw diagnostic payloads in the owner-facing reply.
- **Over-approving.** A fresh audit/Blueprint rerun does not authorize hardening, DNS, production, client outreach, spend, deletion, or final completion.

## Owner-Facing Output Shape

Keep the final message phone-readable:

- Project tag/name.
- One sentence confirming a fresh audit/report was generated.
- Web report link and PDF link.
- Finding/severity snapshot.
- Key score bullets, with "not measured" where appropriate.
- Three to six top issues in plain English.
- One boundary/next-decision line.
