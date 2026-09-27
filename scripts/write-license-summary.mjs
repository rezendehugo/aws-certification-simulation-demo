import { appendFile, readFile } from "node:fs/promises";

const input = process.argv[2]
  ? await readFile(process.argv[2], "utf8")
  : await new Promise((resolve, reject) => {
      const chunks = [];
      process.stdin.on("data", (chunk) => chunks.push(chunk));
      process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      process.stdin.on("error", reject);
    });
const document = JSON.parse(input);
const packages = (document.packages ?? []).filter((item) => item.name && item.name !== document.name);
const rows = packages
  .map((item) => ({
    name: item.name,
    version: item.versionInfo ?? "unknown",
    license: item.licenseDeclared ?? item.licenseConcluded ?? "NOASSERTION",
  }))
  .sort((left, right) => left.name.localeCompare(right.name));
const missing = rows.filter((item) => item.license === "NOASSERTION");
const summary = [
  "### Dependency license inventory",
  "",
  `SBOM contains ${rows.length} dependencies; ${missing.length} have no SPDX license assertion and need maintainer review.`,
  "",
  "<details><summary>Review package licenses</summary>",
  "",
  "| Package | Version | License |",
  "| --- | --- | --- |",
  ...rows.map((item) => `| ${item.name.replaceAll("|", "\\|")} | ${item.version} | ${item.license.replaceAll("|", "\\|")} |`),
  "",
  "</details>",
  "",
].join("\n");

if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
else process.stdout.write(summary);
