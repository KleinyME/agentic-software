# Request a quote

The quote form lets a visitor describe a job and send it to the business, see field-level errors before sending, and have the request actually arrive at the destination the site is configured to deliver to.

## Sub-features

- `quote-open` opens the form from each site entry point.
- `quote-validate` blocks an incomplete submission and names the offending field.
- `quote-submit` sends a complete request and shows the confirmation state.
- `quote-deliver` puts the request into the configured destination with every submitted value intact.
- `quote-failure` shows a real failure state when delivery is rejected.

## How to get to it (user POV)

- Choose `Get a quote` in the site header from any page.
- Choose `Request a quote` in the footer call-to-action block.
- Open `/quote` directly, including from a search result or a pasted link.

## Driving it with Playwright

Preconditions:

- The site is healthy at `http://127.0.0.1:4321`.
- `node scripts/verify/doctor.mjs` reports the expected URL, build revision, and lead sink.
- The lead sink is empty and no request exists for `verify+quote@example.test`.

- **Header entry.** Choose `Get a quote` from the home page. Run `page.getByRole('link', { name: 'Get a quote' }).click()`. The URL is `/quote` and a form named `Request a quote` is visible with focus in the `Name` textbox.
- **Direct entry.** Load `/quote` cold. Run `page.goto('http://127.0.0.1:4321/quote')`. The same form renders with no error summary present.
- **Validation.** Submit with the email left blank. Fill `Name` with `Verify Runner`, leave `Email` empty, then run `page.getByRole('button', { name: 'Send request' }).click()`. The form stays on screen, an alert names the `Email` field, and the lead sink is still empty.
- **Complete submission.** Fill every required field. Run `page.getByRole('textbox', { name: 'Email' }).fill('verify+quote@example.test')`, `page.getByRole('textbox', { name: 'Phone' }).fill('555-0142')`, `page.getByRole('combobox', { name: 'Service' }).selectOption('Leak repair')`, and `page.getByRole('textbox', { name: 'Describe the job' }).fill('Kitchen sink dripping since Monday')`, then `page.getByRole('button', { name: 'Send request' }).click()`. A status named `Request sent` appears and the form is replaced by the confirmation panel.
- **Delivery.** Read the destination back, not the page. Run `node scripts/verify/read-sink.mjs --email verify+quote@example.test`. Exactly one record exists, and its name, email, phone, service, and description match what was typed.
- **Failure state.** Point delivery at a rejecting endpoint and resubmit. Run `LEAD_SINK=http://127.0.0.1:4321/__verify/reject node scripts/verify/drive.mjs quote-failure`. An alert tells the visitor the request did not send and offers the business phone number; the confirmation panel does not appear.
- **Proof.** Capture the confirmed submission and its delivered record. Run `page.getByRole('status', { name: 'Request sent' }).screenshot({ path: 'artifacts/request-a-quote/confirmation.png' })`, save the ARIA snapshot to `artifacts/request-a-quote/confirmation.aria.txt`, and write the sink record to `artifacts/request-a-quote/delivered.json`. The feature works when the confirmation panel is visible **and** the delivered record in the destination carries every value the visitor typed.

## Gotchas

- A success message alone is not proof. Confirm the submission actually arrived at its destination and matches what was typed.
- The header link is hidden behind the mobile menu below 768px. Open the menu first or drive at a desktop viewport.
- Whitespace is trimmed on send. Assert the delivered record, not the draft input value.
- The submit button stays disabled during the request. Wait for the confirmation status or the error alert, never a fixed sleep.
- Delete the run's sink file during cleanup, but retain everything under `artifacts/`.
