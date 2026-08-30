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
