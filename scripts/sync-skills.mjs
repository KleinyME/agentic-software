#!/usr/bin/env node
/**
 * Cross-platform skill sync for every execution context that runs this suite.
 *
 * Why this exists alongside update-installed-skills.ps1:
 *   - The PowerShell installer only targets Codex, so Claude Code — now the
 *     primary context for design work — had no lane at all and could not see
 *     design-distinctiveness, creative-director, or project-steward.
 *   - The Hermes runtime was mirrored by a hand-run Copy-Item documented in
 *     hermes-runtime-skills/README.md. A copy step maintained by discipline
 *     drifts; this makes it fingerprinted and idempotent like the others.
 *   - Both existing lanes are Windows-only, so nothing could run in CI, in a
 *     cloud agent session, or on macOS/Linux.
 *
 * Safety semantics are deliberately identical to update-installed-skills.ps1:
 * fingerprint every skill directory, keep a state file at each destination,
 * refuse to clobber a locally edited skill without --force, and back up
 * whatever is replaced.
 *
 * Orphans are left installed, with one deliberate exception: a skill named in
 * retired-skills.json is a skill the suite removed on purpose, usually because
 * something replaced it. Leaving those behind is how a host ends up answering
 * with both the retired skill and its replacement, so --retire backs them up
 * and removes them. Only manifest-listed names are ever deleted.
 *
 * A "skill" is any directory containing SKILL.md. Its path relative to the
 * source root is preserved at the destination, so flat suites stay flat and
 * the Hermes tree keeps its software-development/<skill> shape.
 *
 * Zero dependencies on purpose: this repo has no package.json and must stay
 * runnable with a bare `node scripts/sync-skills.mjs`.
 */

import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RETIRED_MANIFEST = path.join(REPO_ROOT, "agentic-software-steward", "retired-skills.json");

function readRetired() {
  if (!existsSync(RETIRED_MANIFEST)) return [];
  try {
    return JSON.parse(readFileSync(RETIRED_MANIFEST, "utf8")).retired ?? [];
  } catch {
    return [];
  }
}

// A destination key is flat in the Codex and Claude suites but carries a lane
// prefix in the Hermes tree, so match the trailing segment either way.
function matchesRetired(key, name) {
  return key === name || key.endsWith(`/${name}`);
}

const STATE_FILE = ".agentic-software-steward-sync.json";

/**
 * Codex and Claude Code both read a flat skills directory, so they share a
 * source. Hermes runs its own versioned mirror with a nested layout.
 */
const TARGETS = {
  codex: {
    label: "Codex CLI",
    sources: [{ root: "agentic-software-steward/skills", prefix: "" }],
    defaultDir: () => path.join(os.homedir(), ".codex", "skills"),
    envVar: "CODEX_SKILLS_DIR",
    restartHint: "Restart Codex to pick up changed skills.",
  },
  claude: {
    label: "Claude Code CLI",
    sources: [{ root: "agentic-software-steward/skills", prefix: "" }],
    defaultDir: () => path.join(os.homedir(), ".claude", "skills"),
    envVar: "CLAUDE_SKILLS_DIR",
    restartHint: "Start a new Claude Code session to pick up changed skills.",
  },
  hermes: {
    label: "Hermes runtime",
    sources: [
      { root: "agentic-software-steward/skills", prefix: "agentic-software-steward" },
      { root: "hermes-runtime-skills", prefix: "" },
    ],
    // No default: the runtime tree is machine-specific and is not a git repo,
    // so guessing a path risks writing somewhere unintended.
    defaultDir: () => null,
    envVar: "HERMES_SKILLS_DIR",
    restartHint: "The Hermes runtime tree is not version controlled; a reinstall wipes it. Re-run this after any Hermes update.",
  },
};

function parseArgs(argv) {
  const args = { targets: [], dryRun: false, force: false, report: false, dirs: {}, extraRoots: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => argv[++i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--report") args.report = true;
    else if (arg === "--retire") args.retire = true;
    else if (arg === "--target") args.targets.push(...next().split(",").map((t) => t.trim()));
    else if (arg === "--codex-dir") args.dirs.codex = next();
    else if (arg === "--claude-dir") args.dirs.claude = next();
    else if (arg === "--hermes-dir") args.dirs.hermes = next();
    else if (arg === "--extra-root") args.extraRoots.push(next());
    else if (arg === "--help" || arg === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (args.targets.length === 0 || args.targets.includes("all")) {
    args.targets = Object.keys(TARGETS);
  }
  for (const target of args.targets) {
    if (!TARGETS[target]) throw new Error(`Unknown target "${target}". Known: ${Object.keys(TARGETS).join(", ")}, all`);
  }
  return args;
}

function resolveDir(target, args) {
  const explicit = args.dirs[target];
  if (explicit) return path.resolve(explicit);
  const fromEnv = process.env[TARGETS[target].envVar];
  if (fromEnv) return path.resolve(fromEnv);
  const fallback = TARGETS[target].defaultDir();
  return fallback ? path.resolve(fallback) : null;
}

/** Every directory containing SKILL.md, keyed by its path relative to root. */
function discoverSkills(root) {
  const found = new Map();
  if (!existsSync(root)) return found;
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    if (entries.some((entry) => entry.isFile() && entry.name === "SKILL.md")) {
      const relative = path.relative(root, dir).split(path.sep).join("/");
      if (relative) found.set(relative, dir);
      return; // skills do not nest inside skills
    }
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
      walk(path.join(dir, entry.name));
    }
  };
  walk(root);
  return found;
}

/**
 * Content hash over sorted relative paths plus bytes, so a rename or a
 * one-character edit both change the fingerprint. Returns null when absent,
 * which is how "not installed" is distinguished from "installed but empty".
 */
function fingerprint(dir) {
  if (!existsSync(dir)) return null;
  const hash = createHash("sha256");
  const files = [];
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) files.push(full);
    }
  };
  walk(dir);
  files.sort();
  for (const file of files) {
    hash.update(path.relative(dir, file).split(path.sep).join("/"));
    hash.update(readFileSync(file));
  }
  return hash.digest("hex");
}

function readState(targetDir) {
  const statePath = path.join(targetDir, STATE_FILE);
  if (!existsSync(statePath)) return {};
  try {
    return JSON.parse(readFileSync(statePath, "utf8")).skills ?? {};
  } catch {
    return {};
  }
}

/**
 * add            destination absent
 * unchanged      destination already matches source
 * update         we installed it, it is untouched, source moved on
 * conflict       we installed it and someone edited it since
 * unknown-drift  something is there that we never recorded installing
 */
function classify(name, sourceDir, destDir, saved) {
  const sourceFp = fingerprint(sourceDir);
  const destFp = fingerprint(destDir);
  if (destFp === null) return { action: "add", sourceFp, destFp };
  if (destFp === sourceFp) return { action: "unchanged", sourceFp, destFp };
  if (Object.prototype.hasOwnProperty.call(saved, name)) {
    return { action: saved[name] === destFp ? "update" : "conflict", sourceFp, destFp };
  }
  return { action: "unknown-drift", sourceFp, destFp };
}

function syncTarget(target, args) {
  const config = TARGETS[target];
  const targetDir = resolveDir(target, args);

  if (!targetDir) {
    return {
      target,
      skipped: true,
      reason:
        `No destination for ${config.label}. Pass --${target}-dir <path> or set ${config.envVar}. ` +
        "This path is machine-specific and is never guessed.",
    };
  }
  const skills = new Map();
  for (const source of config.sources) {
    const sourceRoot = path.join(REPO_ROOT, source.root);
    if (!existsSync(sourceRoot)) {
      return { target, skipped: true, reason: `Source ${source.root} not found in this repo.` };
    }
    for (const [name, sourceDir] of discoverSkills(sourceRoot)) {
      const targetName = [source.prefix, name].filter(Boolean).join("/");
      if (skills.has(targetName)) {
        throw new Error(`Duplicate skill destination for ${target}: ${targetName}`);
      }
      skills.set(targetName, sourceDir);
    }
  }
  if (skills.size === 0) {
    return { target, skipped: true, reason: "No SKILL.md directories under the configured sources." };
  }

  const saved = readState(targetDir);
  const plan = [];
  for (const [name, sourceDir] of [...skills].sort()) {
    const destDir = path.join(targetDir, ...name.split("/"));
    plan.push({ name, sourceDir, destDir, ...classify(name, sourceDir, destDir, saved) });
  }

  const retiredManifest = readRetired();
  const installedElsewhere = Object.keys(saved).filter((name) => !skills.has(name));
  // A retired skill can be present without appearing in the state file, e.g. it
  // was installed by the PowerShell lane, so check the filesystem too.
  const retired = [];
  for (const entry of retiredManifest) {
    const candidates = new Set(installedElsewhere.filter((key) => matchesRetired(key, entry.name)));
    if (existsSync(path.join(targetDir, entry.name))) candidates.add(entry.name);
    for (const key of candidates) {
      if (existsSync(path.join(targetDir, ...key.split("/")))) {
        retired.push({ ...entry, key, dir: path.join(targetDir, ...key.split("/")) });
      }
    }
  }
  const retiredKeys = new Set(retired.map((r) => r.key));
  const orphans = installedElsewhere
    .filter((name) => !retiredKeys.has(name))
    .filter((name) => existsSync(path.join(targetDir, ...name.split("/"))));

  const blocked = plan.filter((item) => item.action === "conflict" || item.action === "unknown-drift");
  const changed = plan.filter((item) => item.action !== "unchanged");

  return { target, label: config.label, targetDir, plan, orphans, retired, blocked, changed, restartHint: config.restartHint };
}

function applyTarget(result, args) {
  const { targetDir, changed } = result;
  const retiring = args.retire ? (result.retired ?? []) : [];
  if (changed.length === 0 && retiring.length === 0) return { backupDir: null, retired: [] };

  mkdirSync(targetDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(targetDir, ".agentic-software-steward-backups", stamp);
  let usedBackup = false;

  for (const item of changed) {
    if (existsSync(item.destDir)) {
      // Move the old copy aside rather than deleting it: a --force run should
      // never be the reason someone loses a local edit permanently.
      const backupPath = path.join(backupDir, ...item.name.split("/"));
      mkdirSync(path.dirname(backupPath), { recursive: true });
      renameSync(item.destDir, backupPath);
      usedBackup = true;
    }
    mkdirSync(path.dirname(item.destDir), { recursive: true });
    cpSync(item.sourceDir, item.destDir, { recursive: true });
  }

  for (const entry of retiring) {
    // Same rule as a replaced skill: move it aside, never delete outright.
    const backupPath = path.join(backupDir, ...entry.key.split("/"));
    mkdirSync(path.dirname(backupPath), { recursive: true });
    renameSync(entry.dir, backupPath);
    usedBackup = true;
  }

  const retiredKeys = new Set(retiring.map((entry) => entry.key));
  const skills = {};
  for (const item of result.plan) skills[item.name] = fingerprint(item.destDir);
  for (const name of result.orphans) skills[name] = fingerprint(path.join(targetDir, ...name.split("/")));
  writeFileSync(
    path.join(targetDir, STATE_FILE),
    `${JSON.stringify({ version: 1, repo_root: REPO_ROOT, synced_at: new Date().toISOString(), skills }, null, 2)}\n`,
  );

  return { backupDir: usedBackup ? backupDir : null, retired: retiring.map((e) => e.key) };
}

function report(args) {
  console.log("Skill reachability — what each execution context can actually load\n");
  const roots = [];
  for (const target of Object.keys(TARGETS)) {
    const dir = resolveDir(target, args);
    roots.push({ label: TARGETS[target].label, dir, kind: "target" });
  }
  for (const spec of args.extraRoots) {
    const [label, dir] = spec.includes("=") ? [spec.slice(0, spec.indexOf("=")), spec.slice(spec.indexOf("=") + 1)] : [spec, spec];
    roots.push({ label, dir: path.resolve(dir), kind: "extra" });
  }

  for (const root of roots) {
    if (!root.dir) {
      console.log(`${root.label}: no path configured (pass --hermes-dir or set HERMES_SKILLS_DIR)`);
      continue;
    }
    if (!existsSync(root.dir)) {
      console.log(`${root.label}: ${root.dir}\n   MISSING — nothing loadable here`);
      continue;
    }
    const skills = [...discoverSkills(root.dir).keys()].sort();
    console.log(`${root.label}: ${root.dir}\n   ${skills.length} skill(s)${skills.length ? `: ${skills.join(", ")}` : ""}`);
  }
  console.log(
    "\nA skill is only loadable by a context whose directory contains it. Absent here means" +
      "\nthat context cannot use it, whatever any document or registry says.",
  );
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(String(error.message ?? error));
    process.exitCode = 1;
    return;
  }

  if (args.help) {
    console.log(
      "Usage: node scripts/sync-skills.mjs [--target codex,claude,hermes|all] [--dry-run] [--force] [--retire]\n" +
        "       node scripts/sync-skills.mjs --report [--extra-root Label=/path]\n\n" +
        "Destinations: --codex-dir / --claude-dir / --hermes-dir, or CODEX_SKILLS_DIR /\n" +
        "CLAUDE_SKILLS_DIR / HERMES_SKILLS_DIR. Hermes has no default and must be given one.",
    );
    return;
  }

  if (args.report) {
    report(args);
    return;
  }

  const results = args.targets.map((target) => syncTarget(target, args));
  let blockedAnywhere = false;

  for (const result of results) {
    console.log(`\n=== ${TARGETS[result.target].label} ===`);
    if (result.skipped) {
      console.log(`skipped: ${result.reason}`);
      continue;
    }
    console.log(`destination: ${result.targetDir}`);
    for (const item of result.plan) console.log(`  [${item.action}] ${item.name}`);
    for (const entry of result.retired ?? []) {
      const fix = entry.replacedBy ? `replaced by ${entry.replacedBy}` : "removed from the suite";
      console.log(`  [retired] ${entry.key} (${fix}; run with --retire to back up and remove)`);
    }
    for (const orphan of result.orphans) {
      console.log(`  [orphan] ${orphan} (left installed; no longer in the source suite)`);
    }

    if (result.blocked.length > 0 && !args.force) {
      blockedAnywhere = true;
      console.error(
        `\nRefusing to overwrite locally changed or unrecognised skills: ${result.blocked
          .map((item) => item.name)
          .join(", ")}.\nReview the differences and promote intended changes into this repo, then re-run.` +
          "\nUse --force only for a deliberate replacement; the existing copies are backed up first.",
      );
      continue;
    }

    if (args.dryRun) {
      console.log("\ndry run — nothing was written.");
      continue;
    }

    const { backupDir, retired } = applyTarget(result, args);
    console.log(`\nsynced ${result.changed.length} skill(s).`);
    if (retired?.length) console.log(`retired and removed: ${retired.join(", ")}`);
    if (backupDir) console.log(`replaced copies backed up to: ${backupDir}`);
    if (!args.retire && result.retired?.length) {
      console.log(`still installed: ${result.retired.map((e) => e.key).join(", ")} — re-run with --retire to remove`);
    }
    console.log(result.restartHint);
  }

  if (blockedAnywhere) process.exitCode = 1;
}

main();
