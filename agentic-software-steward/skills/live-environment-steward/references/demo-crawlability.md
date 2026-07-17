# Demo Crawlability

Public concept and client-review deployments must remain shareable and machine-readable while instructing compliant search engines not to index them. De-indexing is not access control.

## Public Demo Policy

- Send `<meta name="robots" content="noindex">` in every HTML page head.
- Verify `X-Robots-Tag: noindex` on the deployed response. Standard Vercel Preview Deployments add it automatically; custom preview domains do not.
- For an unaffiliated public prospect concept, keep a concise visible unofficial or not-affiliated disclosure. For an authorized client preview, keep review status in the surrounding workflow unless the client requests an on-page notice.
- Keep the page available to unauthenticated review tools when public prospect review is the purpose.

Do not use `robots.txt` with `Disallow: /` for a public demo. Crawlers must fetch the page to observe `noindex`; a blocked URL can still appear as a bare search result. Blocking also prevents the AI and QA readers the demo exists to support.

When review must be private, use authentication or deployment protection and share the supported bypass flow. Do not pretend a private review URL is publicly crawlable.

## Standard Files

When `robots.txt` exists for a public demo, allow reading:

```text
User-agent: *
Allow: /
```

For a stable demo deployment or custom preview domain that does not receive Vercel's automatic header, prefer the framework's environment-aware header mechanism. Drive it from an explicit project-owned review mode, not from Vercel's `preview` or `production` label; a stable prospect demo may intentionally use a Vercel production deployment while remaining review infrastructure in this suite.

Example for Next.js, with `SITE_DEPLOYMENT_MODE=public-demo` set only on the intended demo environment:

```js
module.exports = {
  async headers() {
    if (process.env.SITE_DEPLOYMENT_MODE !== "public-demo") return [];

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};
```

Use the same explicit mode to render the HTML meta tag. Remove the mode from canonical production.

When the framework cannot inject headers, use a verified demo-host condition in `vercel.json` as a last resort:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "has": [
        { "type": "host", "value": "demo.example.com" }
      ],
      "headers": [
        { "key": "X-Robots-Tag", "value": "noindex" }
      ]
    }
  ]
}
```

Replace the example host with the verified demo host. Merge the rule into an existing `vercel.json`; do not overwrite unrelated configuration. Never add an unconditional repository-wide header when the same configuration can ship to public production.

## Verify Every Public Demo

- `robots.txt` returns `404` or `200` without `Disallow: /`.
- `/` and one asset return the expected `X-Robots-Tag` header.
- Every HTML entry point contains the meta robots tag.
- An unauthenticated fetch of `/` returns the complete review page.

## Reverse At Production

Remove custom demo de-indexing from response headers, HTML metadata, framework metadata, and platform settings before official production promotion. Verify the canonical production domain itself. Vercel preview and outdated-deployment URLs may correctly retain the platform's automatic `noindex` header.

A canonical public production site with leftover `noindex` is a release blocker.

## Authoritative References

- Google Search Central: [Robots meta tag and X-Robots-Tag specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- Google Search Central: [Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- Vercel: [Preview Deployment indexing behavior](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines)
- Vercel: [Response headers](https://vercel.com/docs/headers/response-headers)

Recheck platform behavior when deployment infrastructure changes.
