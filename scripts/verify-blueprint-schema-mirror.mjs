#!/usr/bin/env node
/**
 * Checks this repo's copy of visibility-blueprint.v3.schema.json against
 * Karbon-AI's, the decided source of truth (docs/plans/2026-08-27-vault-to-
 * execution-plan.md, Karbon-AI Task 0.4: "Karbon-AI `contracts/` owns it").
 *
 * The two Git blobs are expected to contain identical JSON text. Working-tree
 * line endings may differ across repositories on Windows, so the comparison
 * normalizes CRLF/LF without normalizing any other content. It is a comparison,
 * not a sync: Karbon-AI's copy is never written here, and this repo's mirror is
 * never written back to Karbon-AI.
 *
 * Zero dependencies on purpose, matching sync-skills.mjs: this repo has no
 * package.json and must stay runnable with a bare `node scripts/....mjs`.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIRROR_PATH = path.join(
  REPO_ROOT,
  "agentic-software-steward",
  "skills",
  "site-scorecard",
  "references",
  "visibility-blueprint.v3.schema.json",
);
const RELATIVE_KARBON_PATH = path.join("contracts", "visibility-blueprint.v3.schema.json");

/** Common sibling-checkout locations, same pattern as sync-skills.mjs --hermes-dir defaults. */
const DEFAULT_CANDIDATES = ["../Karbon-AI", "../karbon-ai", "../../Karbon-AI"];

function parseArgs(argv) {
  const args = { karbonAiPath: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--karbon-ai-path") {
      args.karbonAiPath = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function resolveKarbonAiRepo(explicitPath) {
  if (explicitPath) {
    const resolved = path.resolve(explicitPath);
    if (!existsSync(path.join(resolved, RELATIVE_KARBON_PATH))) {
      console.error(`--karbon-ai-path ${explicitPath} has no ${RELATIVE_KARBON_PATH}.`);
      process.exit(1);
    }
    return resolved;
  }
  for (const candidate of DEFAULT_CANDIDATES) {
    const resolved = path.resolve(REPO_ROOT, candidate);
    if (existsSync(path.join(resolved, RELATIVE_KARBON_PATH))) return resolved;
  }
  return null;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!existsSync(MIRROR_PATH)) {
    console.error(`Mirror missing: ${path.relative(REPO_ROOT, MIRROR_PATH)}`);
    process.exit(1);
  }

  const karbonAiRoot = resolveKarbonAiRepo(args.karbonAiPath);
  if (!karbonAiRoot) {
    console.log(
      "Karbon-AI checkout not found (checked " +
        DEFAULT_CANDIDATES.join(", ") +
        "; pass --karbon-ai-path <path>). " +
        "Cannot verify the mirror against its source of truth here — this is not a failure, " +
        "it just means the check did not run. CI or a machine without that sibling checkout " +
        "should skip this script rather than report a false pass or fail.",
    );
    process.exit(0);
  }

  const canonicalPath = path.join(karbonAiRoot, RELATIVE_KARBON_PATH);
  const canonical = readFileSync(canonicalPath, "utf8");
  const mirror = readFileSync(MIRROR_PATH, "utf8");
  const normalizeLineEndings = (value) => value.replace(/\r\n?/g, "\n");

  if (normalizeLineEndings(canonical) === normalizeLineEndings(mirror)) {
    console.log(`OK: mirror matches ${canonicalPath} after line-ending normalization.`);
    process.exit(0);
  }

  console.error(
    `MISMATCH: ${path.relative(REPO_ROOT, MIRROR_PATH)} differs from the canonical copy at ` +
      `${canonicalPath}. Karbon-AI's contracts/ is the source of truth (decision recorded in ` +
      "both repos' Task 0.4 notes) — copy its content here, never the other direction.",
  );
  process.exit(1);
}

main();
