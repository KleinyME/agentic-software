import assert from "node:assert/strict";
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
const { tmpdir } = os;
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const SCRIPT = path.join(path.dirname(fileURLToPath(import.meta.url)), "sync-skills.mjs");

function run(args) {
  return spawnSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8" });
}

test("Hermes sync installs the canonical suite and runtime-specific skills", () => {
  const target = mkdtempSync(path.join(os.tmpdir(), "agentic-hermes-sync-"));
  try {
    const first = run(["--target", "hermes", "--hermes-dir", target]);
    assert.equal(first.status, 0, first.stderr || first.stdout);
    assert.equal(
      existsSync(path.join(target, "agentic-software-steward", "workflow-automation-architect", "SKILL.md")),
      true,
    );
    assert.equal(
      existsSync(path.join(target, "software-development", "client-website-delivery", "SKILL.md")),
      true,
    );

    const second = run(["--target", "hermes", "--hermes-dir", target, "--dry-run"]);
    assert.equal(second.status, 0, second.stderr || second.stdout);
    assert.match(second.stdout, /\[unchanged\] agentic-software-steward\/workflow-automation-architect/);
    assert.match(second.stdout, /\[unchanged\] software-development\/client-website-delivery/);
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});

test("Hermes sync refuses local drift without overwriting it", () => {
  const target = mkdtempSync(path.join(os.tmpdir(), "agentic-hermes-conflict-"));
  try {
    const first = run(["--target", "hermes", "--hermes-dir", target]);
    assert.equal(first.status, 0, first.stderr || first.stdout);

    const skillPath = path.join(target, "agentic-software-steward", "site-scorecard", "SKILL.md");
    appendFileSync(skillPath, "\nlocal runtime note\n", "utf8");

    const conflict = run(["--target", "hermes", "--hermes-dir", target]);
    assert.equal(conflict.status, 1, conflict.stderr || conflict.stdout);
    assert.match(conflict.stderr, /Refusing to overwrite locally changed or unrecognised skills: .*site-scorecard/);
    assert.match(readFileSync(skillPath, "utf8"), /local runtime note/);
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});

test("selected sync preserves unrelated local changes and their recorded baselines", () => {
  const target = mkdtempSync(path.join(tmpdir(), "agentic-selected-sync-"));
  try {
    assert.equal(run(["--target", "claude", "--claude-dir", target]).status, 0);
    const statePath = path.join(target, ".agentic-software-steward-sync.json");
    const before = JSON.parse(readFileSync(statePath, "utf8"));
    const localPath = path.join(target, "software-steward", "SKILL.md");
    appendFileSync(localPath, "\nlocal instruction to preserve\n");
    const localBytes = readFileSync(localPath);
    const selectedDir = path.join(target, "project-memory-steward");
    rmSync(selectedDir, { recursive: true });

    const sync = run(["--target", "claude", "--claude-dir", target, "--skill", "project-memory-steward"]);
    assert.equal(sync.status, 0, sync.stderr || sync.stdout);
    assert.ok(existsSync(path.join(selectedDir, "references", "shared-memory.md")));
    assert.deepEqual(readFileSync(localPath), localBytes);
    const after = JSON.parse(readFileSync(statePath, "utf8"));
    assert.deepEqual(after.skills, before.skills, "untouched fingerprints must not adopt local edits");
    assert.deepEqual(after.selected_skills, ["project-memory-steward"]);
    assert.equal(run(["--target", "claude", "--claude-dir", target, "--dry-run"]).status, 1,
      "a full sync must still detect the preserved local conflict");
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});

test("selected Hermes skills use their normal nested paths and back up replacements", () => {
  const target = mkdtempSync(path.join(tmpdir(), "agentic-selected-hermes-"));
  try {
    const args = ["--target", "hermes", "--hermes-dir", target, "--skill", "project-memory-steward,project-steward"];
    assert.equal(run(args).status, 0);
    const localPath = path.join(target, "agentic-software-steward", "project-memory-steward", "SKILL.md");
    appendFileSync(localPath, "\nprevious local version\n");
    assert.equal(run(args).status, 1, "selection must not bypass conflict protection");
    assert.equal(run([...args, "--force"]).status, 0);
    const backups = path.join(target, ".agentic-software-steward-backups");
    assert.ok(readdirSync(backups).some(stamp =>
      readFileSync(path.join(backups, stamp, "agentic-software-steward", "project-memory-steward", "SKILL.md"), "utf8")
        .includes("previous local version")));
    assert.equal(existsSync(path.join(target, "agentic-software-steward", "software-steward")), false);
    const before = readFileSync(path.join(target, ".agentic-software-steward-sync.json"));
    assert.equal(run([...args, "--dry-run"]).status, 0);
    assert.deepEqual(readFileSync(path.join(target, ".agentic-software-steward-sync.json")), before);
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});

test("invalid selections and retirement combinations fail before installing anything", () => {
  const target = mkdtempSync(path.join(tmpdir(), "agentic-invalid-selection-"));
  try {
    for (const selection of [["--skill", "no-such-skill"], ["--skill", "../project-steward"],
      ["--skill", "project-steward", "--retire"]]) {
      assert.equal(run(["--target", "claude", "--claude-dir", target, ...selection]).status, 1);
      assert.deepEqual(readdirSync(target), []);
    }
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});

test("retires only manifest-listed skills, backing them up first", () => {
  const target = mkdtempSync(path.join(tmpdir(), "retire-"));
  // One retired skill and one unrelated orphan the operator installed themselves.
  for (const name of ["release-steward", "someone-elses-skill"]) {
    mkdirSync(path.join(target, name), { recursive: true });
    writeFileSync(
      path.join(target, name, "SKILL.md"),
      `---\nname: ${name}\ndescription: stale copy.\n---\n\nold\n`,
    );
  }

  run(["--target", "claude", "--claude-dir", target, "--retire"]);

  assert.equal(existsSync(path.join(target, "release-steward")), false, "retired skill should be removed");
  assert.equal(existsSync(path.join(target, "someone-elses-skill")), true, "an orphan we never retired must survive");

  const backups = path.join(target, ".agentic-software-steward-backups");
  const stamps = readdirSync(backups);
  assert.ok(
    stamps.some((stamp) => existsSync(path.join(backups, stamp, "release-steward", "SKILL.md"))),
    "the retired skill must be recoverable from a backup",
  );

  rmSync(target, { recursive: true, force: true });
});
