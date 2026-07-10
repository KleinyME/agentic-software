#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_MAX_BYTES = 20 * 1024 * 1024;

function parseAttributes(tag) {
  const attributes = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of tag.matchAll(pattern)) {
    const key = match[1].toLowerCase();
    if (key.startsWith("<")) continue;
    attributes[key] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return attributes;
}

function resolveHttpUrl(value, baseUrl) {
  if (!value || /^(?:data|blob|javascript|mailto|tel):/i.test(value)) return null;
  try {
    const url = new URL(value, baseUrl);
    if (!/^https?:$/.test(url.protocol)) return null;
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function selectLargestSrcset(srcset, baseUrl) {
  const candidates = srcset
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, index) => {
      const [rawUrl, descriptor = ""] = part.split(/\s+/, 2);
      const numeric = Number.parseFloat(descriptor);
      const score = Number.isFinite(numeric) ? numeric : index;
      return { url: resolveHttpUrl(rawUrl, baseUrl), score };
    })
    .filter((candidate) => candidate.url);

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.url ?? null;
}

export function extractPageAssets(html, pageUrl) {
  const images = [];
  const links = [];

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    const primary = selectLargestSrcset(attributes.srcset ?? "", pageUrl)
      ?? resolveHttpUrl(attributes.src, pageUrl);
    if (primary) {
      images.push({
        url: primary,
        kind: "img",
        alt: attributes.alt ?? "",
      });
    }
  }

  for (const match of html.matchAll(/<source\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    const source = selectLargestSrcset(attributes.srcset ?? "", pageUrl);
    if (source) images.push({ url: source, kind: "source", alt: "" });
  }

  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    const key = (attributes.property || attributes.name || "").toLowerCase();
    if (["og:image", "og:image:url", "twitter:image", "twitter:image:src"].includes(key)) {
      const url = resolveHttpUrl(attributes.content, pageUrl);
      if (url) images.push({ url, kind: key, alt: "" });
    }
  }

  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    const rel = (attributes.rel ?? "").toLowerCase().split(/\s+/);
    if (rel.includes("image_src")) {
      const url = resolveHttpUrl(attributes.href, pageUrl);
      if (url) images.push({ url, kind: "image_src", alt: "" });
    }
  }

  for (const match of html.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
    const url = resolveHttpUrl(match[2], pageUrl);
    if (url) images.push({ url, kind: "css-url", alt: "" });
  }

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    const url = resolveHttpUrl(attributes.href, pageUrl);
    if (url) links.push(url);
  }

  return { images, links };
}

async function fetchWithTimeout(url, timeoutMs, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "user-agent": "AgenticSoftwareSteward-ClientAssetCollector/1.0",
        ...(options.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

function isLikelyPage(url, siteOrigin) {
  const parsed = new URL(url);
  if (parsed.origin !== siteOrigin) return false;
  const extension = extname(parsed.pathname).toLowerCase();
  return !extension || [".html", ".htm", ".php", ".asp", ".aspx"].includes(extension);
}

function extensionFor(contentType, url) {
  const existing = extname(new URL(url).pathname).toLowerCase();
  if (/^\.[a-z0-9]{2,5}$/.test(existing)) return existing;
  const map = {
    "image/avif": ".avif",
    "image/gif": ".gif",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
  };
  return map[contentType.split(";", 1)[0].toLowerCase()] ?? ".img";
}

function safeBaseName(url) {
  const raw = basename(new URL(url).pathname, extname(new URL(url).pathname)) || "image";
  return raw
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "image";
}

export async function collectSiteImages({
  siteUrl,
  outDir,
  maxPages = 12,
  maxAssets = 100,
  manifestOnly = false,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  maxBytes = DEFAULT_MAX_BYTES,
}) {
  const startUrl = new URL(siteUrl);
  if (!/^https?:$/.test(startUrl.protocol)) throw new Error("siteUrl must use http or https");

  const outputRoot = resolve(outDir);
  const assetDir = join(outputRoot, "images");
  await mkdir(outputRoot, { recursive: true });
  if (!manifestOnly) await mkdir(assetDir, { recursive: true });

  const queued = [startUrl.href];
  const visited = new Set();
  const imageMap = new Map();
  const warnings = [];

  while (queued.length && visited.size < maxPages && imageMap.size < maxAssets) {
    const pageUrl = queued.shift();
    if (visited.has(pageUrl)) continue;
    visited.add(pageUrl);

    try {
      const response = await fetchWithTimeout(pageUrl, timeoutMs);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("text/html")) continue;
      const html = await response.text();
      const { images, links } = extractPageAssets(html, pageUrl);

      for (const image of images) {
        if (imageMap.size >= maxAssets) break;
        const existing = imageMap.get(image.url);
        if (existing) {
          if (!existing.sourcePages.includes(pageUrl)) existing.sourcePages.push(pageUrl);
          if (image.alt && !existing.altTexts.includes(image.alt)) existing.altTexts.push(image.alt);
          if (!existing.kinds.includes(image.kind)) existing.kinds.push(image.kind);
        } else {
          imageMap.set(image.url, {
            sourceUrl: image.url,
            sourcePages: [pageUrl],
            kinds: [image.kind],
            altTexts: image.alt ? [image.alt] : [],
            status: "collected-not-approved",
          });
        }
      }

      for (const link of links) {
        if (!visited.has(link) && !queued.includes(link) && isLikelyPage(link, startUrl.origin)) {
          queued.push(link);
        }
      }
    } catch (error) {
      warnings.push({ url: pageUrl, stage: "page", message: error.message });
    }
  }

  const assets = [];
  const hashes = new Map();
  for (const candidate of imageMap.values()) {
    if (manifestOnly) {
      assets.push(candidate);
      continue;
    }

    try {
      const response = await fetchWithTimeout(candidate.sourceUrl, timeoutMs);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const contentType = response.headers.get("content-type") ?? "application/octet-stream";
      const declaredLength = Number(response.headers.get("content-length") ?? 0);
      if (declaredLength > maxBytes) throw new Error(`asset exceeds ${maxBytes} bytes`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length > maxBytes) throw new Error(`asset exceeds ${maxBytes} bytes`);

      const sha256 = createHash("sha256").update(buffer).digest("hex");
      const duplicatePath = hashes.get(sha256);
      if (duplicatePath) {
        assets.push({
          ...candidate,
          contentType,
          bytes: buffer.length,
          sha256,
          localPath: duplicatePath,
          duplicate: true,
        });
        continue;
      }

      const extension = extensionFor(contentType, candidate.sourceUrl);
      const filename = `${safeBaseName(candidate.sourceUrl)}-${sha256.slice(0, 10)}${extension}`;
      const fullPath = join(assetDir, filename);
      await writeFile(fullPath, buffer);
      const localPath = relative(outputRoot, fullPath).replaceAll("\\", "/");
      hashes.set(sha256, localPath);
      assets.push({
        ...candidate,
        contentType,
        bytes: buffer.length,
        sha256,
        localPath,
        duplicate: false,
      });
    } catch (error) {
      warnings.push({ url: candidate.sourceUrl, stage: "asset", message: error.message });
      assets.push({ ...candidate, error: error.message });
    }
  }

  const manifest = {
    schemaVersion: 1,
    siteUrl: startUrl.href,
    collectedAt: new Date().toISOString(),
    mode: manifestOnly ? "manifest-only" : "download",
    limits: { maxPages, maxAssets, maxBytes },
    pagesVisited: [...visited],
    assets,
    warnings,
  };
  await writeFile(join(outputRoot, "asset-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifest;
}

function parseCli(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--manifest-only") {
      options.manifestOnly = true;
      continue;
    }
    if (!token.startsWith("--")) throw new Error(`Unexpected argument: ${token}`);
    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${token}`);
    index += 1;
    options[key] = value;
  }

  if (!options.url) throw new Error("--url is required");
  return {
    siteUrl: options.url,
    outDir: options.out ?? "./visual-assets",
    maxPages: Number(options["max-pages"] ?? 12),
    maxAssets: Number(options["max-assets"] ?? 100),
    maxBytes: Number(options["max-bytes"] ?? DEFAULT_MAX_BYTES),
    timeoutMs: Number(options["timeout-ms"] ?? DEFAULT_TIMEOUT_MS),
    manifestOnly: Boolean(options.manifestOnly),
  };
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isCli) {
  try {
    const manifest = await collectSiteImages(parseCli(process.argv.slice(2)));
    const downloaded = manifest.assets.filter((asset) => asset.localPath).length;
    console.log(`Visited ${manifest.pagesVisited.length} page(s).`);
    console.log(`Collected ${manifest.assets.length} image candidate(s); ${downloaded} local file(s).`);
    console.log(`Manifest: ${resolve(parseCli(process.argv.slice(2)).outDir, "asset-manifest.json")}`);
    if (manifest.warnings.length) console.log(`Warnings: ${manifest.warnings.length}`);
  } catch (error) {
    console.error(`Image collection failed: ${error.message}`);
    process.exitCode = 1;
  }
}

