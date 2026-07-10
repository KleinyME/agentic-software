import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { collectSiteImages, extractPageAssets } from "./collect-client-site-images.mjs";

test("extractPageAssets resolves responsive, social, CSS, and linked assets", () => {
  const html = `
    <meta property="og:image" content="/social.jpg">
    <img src="/small.jpg" srcset="/small.jpg 400w, /hero.jpg 1600w" alt="Workshop">
    <div style="background-image:url('/texture.png')"></div>
    <a href="/about">About</a>
  `;
  const result = extractPageAssets(html, "https://client.example/");
  assert.deepEqual(result.images.map((image) => image.url).sort(), [
    "https://client.example/hero.jpg",
    "https://client.example/social.jpg",
    "https://client.example/texture.png",
  ]);
  assert.deepEqual(result.links, ["https://client.example/about"]);
});

test("collectSiteImages crawls same-origin pages and deduplicates downloaded files", async () => {
  const payloads = {
    "/hero.jpg": Buffer.from("hero-image"),
    "/social.jpg": Buffer.from("social-image"),
    "/texture.png": Buffer.from("texture-image"),
  };

  const server = createServer((request, response) => {
    if (request.url === "/") {
      response.setHeader("content-type", "text/html");
      response.end(`
        <meta property="og:image" content="/social.jpg">
        <img src="/hero.jpg" alt="Hero">
        <a href="/about">About</a>
      `);
      return;
    }
    if (request.url === "/about") {
      response.setHeader("content-type", "text/html");
      response.end(`
        <img src="/hero.jpg" alt="Same hero">
        <div style="background-image:url('/texture.png')"></div>
      `);
      return;
    }
    if (payloads[request.url]) {
      response.setHeader("content-type", request.url.endsWith(".png") ? "image/png" : "image/jpeg");
      response.end(payloads[request.url]);
      return;
    }
    response.statusCode = 404;
    response.end("missing");
  });

  await new Promise((resolveServer) => server.listen(0, "127.0.0.1", resolveServer));
  const address = server.address();
  const root = `http://127.0.0.1:${address.port}/`;
  const output = await mkdtemp(join(tmpdir(), "visual-direction-test-"));

  try {
    const manifest = await collectSiteImages({
      siteUrl: root,
      outDir: output,
      maxPages: 4,
      maxAssets: 10,
    });
    assert.equal(manifest.pagesVisited.length, 2);
    assert.equal(manifest.assets.length, 3);
    assert.equal(manifest.warnings.length, 0);
    assert.ok(manifest.assets.every((asset) => asset.localPath));
    const saved = JSON.parse(await readFile(join(output, "asset-manifest.json"), "utf8"));
    assert.equal(saved.assets.length, 3);
  } finally {
    await new Promise((resolveServer) => server.close(resolveServer));
    await rm(output, { recursive: true, force: true });
  }
});

