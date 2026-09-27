import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "dist");
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Public artifact may not contain symlinks: ${relative(root, absolute)}`);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.isFile()) files.push(relative(root, absolute).replaceAll("\\", "/"));
    else throw new Error(`Unsupported entry in public artifact: ${relative(root, absolute)}`);
  }
}

await walk(root);
const allowed = /^(?:index\.html|404\.html|assets\/[A-Za-z0-9._-]+\.(?:js|css))$/;
const unexpected = files.filter((file) => !allowed.test(file));
if (unexpected.length) throw new Error(`Unapproved public artifact files: ${unexpected.join(", ")}`);
if (!files.includes("index.html") || !files.includes("404.html")) {
  throw new Error("Public artifact must contain index.html and 404.html.");
}
if (!files.some((file) => /^assets\/.+\.js$/.test(file)) || !files.some((file) => /^assets\/.+\.css$/.test(file))) {
  throw new Error("Public artifact must contain the built JavaScript and CSS assets.");
}

const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{30,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{30,}\b/,
  /\bnpm_[A-Za-z0-9]{36,}\b/,
];
const contents = await Promise.all(files.map((file) => readFile(join(root, file), "utf8")));
for (const pattern of secretPatterns) {
  if (contents.some((content) => pattern.test(content))) throw new Error(`Secret-like value detected in public artifact (${pattern}).`);
}

const publicText = contents.join("\n");
for (const required of ["Independent study resource", "CloudCertPrep", "MIT License", "AWS and related marks"]) {
  if (!publicText.includes(required)) throw new Error(`Required legal notice is missing from the public artifact: ${required}`);
}

const repositoryRoot = resolve(root, "..");
const ignoredDirectories = new Set([".git", "node_modules", "dist"]);
const allowedSourceFiles = new Set([
  ".github/ISSUE_TEMPLATE/bug.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/translation.yml",
  ".github/pull_request_template.md",
  ".github/workflows/pages.yml",
  ".gitignore",
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "LICENSE",
  "README.md",
  "README.pt-BR.md",
  "SECURITY.md",
  "cypress.config.mjs",
  "cypress/e2e/public-demo.cy.js",
  "cypress/support/e2e.js",
  "eslint.config.mjs",
  "index.html",
  "package-lock.json",
  "package.json",
  "scripts/check-pages-boundary.mjs",
  "scripts/check-public-artifact.mjs",
  "scripts/run-cypress.mjs",
  "scripts/write-license-summary.mjs",
  "src/App.tsx",
  "src/components/PublicNotice.tsx",
  "src/components/QuestionInput.tsx",
  "src/components/Results.tsx",
  "src/components/Simulation.tsx",
  "src/components/TopBar.tsx",
  "src/components/Welcome.tsx",
  "src/data/questions.json",
  "src/data/questions.pt-BR.json",
  "src/domain/localization.ts",
  "src/domain/report.ts",
  "src/domain/scoring.ts",
  "src/domain/storage.ts",
  "src/i18n.ts",
  "src/main.tsx",
  "src/styles.css",
  "src/types.ts",
  "tests/demo.test.ts",
  "tests/release-safety.test.ts",
  "tsconfig.json",
  "vite.config.ts",
]);
async function scanSource(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    const sourcePath = relative(repositoryRoot, absolute).replaceAll("\\", "/");
    if (entry.isDirectory() && (ignoredDirectories.has(entry.name) || /^cypress\/(?:downloads|screenshots|videos)(?:\/|$)/.test(sourcePath))) continue;
    if (entry.isSymbolicLink()) throw new Error(`Symlinks are not allowed in the public source tree: ${relative(repositoryRoot, absolute)}`);
    if (entry.isDirectory()) await scanSource(absolute);
    else if (entry.isFile()) {
      if (!allowedSourceFiles.has(sourcePath)) {
        throw new Error(`Unapproved source path for this public project: ${sourcePath}. Add it to the reviewed allowlist only if it is intended to be public.`);
      }
      const name = entry.name.toLowerCase();
      if (/^\.env(?:\.|$)/.test(name) || /\.(?:pem|key|p12|pfx|sqlite|db|dump|sql|log|bak)$/i.test(name)) {
        throw new Error(`Sensitive file type is not allowed in the public source tree: ${relative(repositoryRoot, absolute)}`);
      }
      const source = await readFile(absolute);
      if (source.includes(0)) continue;
      const text = source.toString("utf8");
      for (const pattern of secretPatterns) {
        if (pattern.test(text)) throw new Error(`Secret-like value detected in public source (${relative(repositoryRoot, absolute)}; ${pattern}).`);
      }
    }
  }
}

await scanSource(repositoryRoot);

console.log(`Public artifact and source passed allowlist, secret, and disclosure checks (${files.length} artifact files).`);
