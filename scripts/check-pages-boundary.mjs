import { readFile } from "node:fs/promises";

const workflowPath = process.argv[2] ?? ".github/workflows/pages.yml";
const workflow = await readFile(workflowPath, "utf8");
const forbidden = /\b(?:ec2|ssh|aws_access_key_id|aws_secret_access_key|deploy[-_ ]to[-_ ]server)\b/i;

if (forbidden.test(workflow)) {
  throw new Error("The GitHub Pages workflow must not contain EC2/server deployment or SSH credential references.");
}
for (const required of [
  "pull_request:",
  "name: github-pages",
  "actions/upload-pages-artifact",
  "path: dist",
  "github.ref == 'refs/heads/main'",
  "persist-credentials: false",
]) {
  if (!workflow.includes(required)) throw new Error(`Pages workflow is missing the expected safety boundary: ${required}`);
}

console.log("Pages workflow boundary passed: static artifact only, no EC2 or SSH deployment.");
