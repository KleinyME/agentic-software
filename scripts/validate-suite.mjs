#!/usr/bin/env node
// Cross-platform structural validator for the skill suite.
//
// Replaces literal-phrase "behavior contracts", which froze wording, punished
// legitimate rewrites, and passed even when the behavior behind the phrase was
// gone. Everything checked here is a property a script can actually verify.
//
// Usage: node scripts/validate-suite.mjs [--report]

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const showReport = process.argv.includes('--report');

// Budgets. A model-invoked description is paid on every turn in every context.
const MODEL_DESC_MAX = 350;
const USER_DESC_MAX = 160;
const ALWAYS_LOADED_CHAR_BUDGET = 6000;

const SUITES = [
  { root: 'agentic-software-steward/skills', requireYaml: true },
  { root: 'hermes-runtime-skills', requireYaml: false },
];

const errors = [];
const warnings = [];
const skills = [];

function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return { fm, body: text.slice(m[0].length) };
}

function findSkillDirs(absRoot) {
  const out = [];
  if (!existsSync(absRoot)) return out;
  for (const entry of readdirSync(absRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = join(absRoot, entry.name);
    if (existsSync(join(dir, 'SKILL.md'))) out.push(dir);
    else out.push(...findSkillDirs(dir)); // hermes nests by lane
  }
  return out;
}

for (const suite of SUITES) {
  for (const dir of findSkillDirs(join(repoRoot, suite.root))) {
    const rel = relative(repoRoot, dir).split('\\').join('/');
    const skillPath = join(dir, 'SKILL.md');
    const parsed = parseFrontmatter(readFileSync(skillPath, 'utf8'));
    if (!parsed) { errors.push(`${rel}/SKILL.md: no YAML frontmatter`); continue; }

    const { fm } = parsed;
    const dirName = rel.split('/').pop();
    const userInvoked = String(fm['disable-model-invocation']) === 'true';
    const desc = fm.description ?? '';

    if (!fm.name) errors.push(`${rel}: frontmatter is missing "name"`);
    else if (fm.name !== dirName) errors.push(`${rel}: name "${fm.name}" does not match its directory`);
    if (!desc) errors.push(`${rel}: frontmatter is missing "description"`);

    const cap = userInvoked ? USER_DESC_MAX : MODEL_DESC_MAX;
    if (desc.length > cap) {
      errors.push(`${rel}: description is ${desc.length} chars, over the ${userInvoked ? 'user' : 'model'}-invoked cap of ${cap}`);
    }

    // The invocation axis must agree across harnesses, or a skill that costs
    // nothing in one context silently costs context in the other.
    const yamlPath = join(dir, 'agents', 'openai.yaml');
    if (suite.requireYaml) {
      if (!existsSync(yamlPath)) {
        errors.push(`${rel}: missing agents/openai.yaml`);
      } else {
        const yaml = readFileSync(yamlPath, 'utf8');
        const yamlUserInvoked = /allow_implicit_invocation:\s*false/.test(yaml);
        if (userInvoked !== yamlUserInvoked) {
          errors.push(`${rel}: invocation axis disagrees (SKILL.md user-invoked=${userInvoked}, openai.yaml user-invoked=${yamlUserInvoked})`);
        }
        if (!/default_prompt:/.test(yaml)) errors.push(`${rel}: agents/openai.yaml has no default_prompt`);
      }
    }

    skills.push({ rel, name: fm.name ?? dirName, desc, userInvoked });
  }
}

// Relative markdown links must resolve, in every markdown file of every skill.
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}

for (const suite of SUITES) {
  const absRoot = join(repoRoot, suite.root);
  if (!existsSync(absRoot)) continue;
  for (const file of walk(absRoot)) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(/\[[^\]]*\]\(([^)#\s]+)(?:#[^)\s]*)?\)/g)) {
      const target = m[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const resolved = resolve(dirname(file), decodeURIComponent(target));
      if (!existsSync(resolved)) {
        errors.push(`${relative(repoRoot, file).split('\\').join('/')}: broken link -> ${target}`);
      }
    }
  }
}

// A skill named in prose must exist, or the routing lies.
const skillNames = new Set(skills.map((s) => s.name));
const retired = ['root-cause-debugging'];
for (const suite of SUITES) {
  const absRoot = join(repoRoot, suite.root);
  if (!existsSync(absRoot)) continue;
  for (const file of walk(absRoot)) {
    if (file.endsWith('NOTICE.md')) continue; // attribution records name what was replaced
    const text = readFileSync(file, 'utf8');
    for (const name of retired) {
      if (text.includes(name)) {
        errors.push(`${relative(repoRoot, file).split('\\').join('/')}: references retired skill "${name}"`);
      }
    }
  }
}

// The always-loaded surface: what every session pays before any work starts.
const modelInvoked = skills.filter((s) => !s.userInvoked);
const alwaysLoadedChars = modelInvoked.reduce((n, s) => n + s.desc.length + s.name.length, 0);
if (alwaysLoadedChars > ALWAYS_LOADED_CHAR_BUDGET) {
  errors.push(`always-loaded surface is ${alwaysLoadedChars} chars, over the budget of ${ALWAYS_LOADED_CHAR_BUDGET}`);
}

if (showReport) {
  console.log(`\nSkills: ${skills.length}  (model-invoked ${modelInvoked.length}, user-invoked ${skills.length - modelInvoked.length})`);
  console.log(`Always-loaded surface: ${alwaysLoadedChars} chars (~${Math.round(alwaysLoadedChars / 4)} tokens), budget ${ALWAYS_LOADED_CHAR_BUDGET}\n`);
  for (const s of [...modelInvoked].sort((a, b) => b.desc.length - a.desc.length)) {
    console.log(`  ${String(s.desc.length).padStart(4)}  ${s.name}`);
  }
  const quiet = skills.filter((s) => s.userInvoked).map((s) => s.name).sort();
  console.log(`\nUser-invoked (no context cost): ${quiet.join(', ') || 'none'}\n`);
}

for (const w of warnings) console.warn(`warn: ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`validate-suite: ${skills.length} skills OK`);
