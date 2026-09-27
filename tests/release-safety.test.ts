import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const artifactChecker = resolve("scripts/check-public-artifact.mjs");
const boundaryChecker = resolve("scripts/check-pages-boundary.mjs");

async function makeArtifact(t: { after(callback: () => Promise<void>): void }) {
  const project = await mkdtemp(join(tmpdir(), "public-demo-release-test-"));
  const dist = join(project, "dist");
  await mkdir(join(dist, "assets"), { recursive: true });
  await writeFile(join(dist, "index.html"), "Independent study resource CloudCertPrep MIT License AWS and related marks");
  await writeFile(join(dist, "404.html"), "not found");
  await writeFile(join(dist, "assets", "app.js"), "console.log('public');");
  await writeFile(join(dist, "assets", "app.css"), "body { color: black; }");
  t.after(() => rm(project, { recursive: true, force: true }));
  return { project, dist };
}

function runArtifactCheck(dist: string) {
  return spawnSync(process.execPath, [artifactChecker, dist], { encoding: "utf8" });
}

test("public artifact scanner accepts only the safe static bundle and required notices", async (t) => {
  const { dist } = await makeArtifact(t);
  const result = runArtifactCheck(dist);
  assert.equal(result.status, 0, result.stderr);
});

test("public artifact scanner blocks secret-like values and unapproved files", async (t) => {
  const { dist } = await makeArtifact(t);
  const bundle = join(dist, "assets", "app.js");
  await writeFile(bundle, `const credential = 'AKIA${"1".repeat(16)}';`);
  assert.notEqual(runArtifactCheck(dist).status, 0, "AWS access-key-shaped content must fail the check");

  await writeFile(bundle, "console.log('public');");
  await writeFile(join(dist, "local-study.sqlite"), "not for publication");
  assert.notEqual(runArtifactCheck(dist).status, 0, "unapproved database files must fail the check");
});

test("public artifact scanner blocks builds missing legal disclosure", async (t) => {
  const { dist } = await makeArtifact(t);
  await writeFile(join(dist, "index.html"), "Welcome");
  assert.notEqual(runArtifactCheck(dist).status, 0, "missing independent-use and attribution notice must fail");
});

test("Pages workflow boundary rejects EC2 and SSH deployment references", async (t) => {
  const project = await mkdtemp(join(tmpdir(), "public-demo-workflow-test-"));
  const workflow = join(project, "pages.yml");
  t.after(() => rm(project, { recursive: true, force: true }));
  const current = await readFile(resolve(".github/workflows/pages.yml"), "utf8");
  await writeFile(workflow, current);
  const accepted = spawnSync(process.execPath, [boundaryChecker, workflow], { encoding: "utf8" });
  assert.equal(accepted.status, 0, accepted.stderr);

  await writeFile(workflow, `${current}\n# EC2 SSH deployment is forbidden`);
  const rejected = spawnSync(process.execPath, [boundaryChecker, workflow], { encoding: "utf8" });
  assert.notEqual(rejected.status, 0, "server deployment references must fail the boundary check");
});
