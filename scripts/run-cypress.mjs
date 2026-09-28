import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { resolve } from "node:path";

const host = "127.0.0.1";
const portProbe = createServer();
const port = await new Promise((resolvePort, reject) => {
  portProbe.once("error", reject);
  portProbe.listen(0, host, () => {
    const address = portProbe.address();
    if (!address || typeof address === "string") return reject(new Error("Could not reserve an ephemeral local port."));
    portProbe.close((error) => (error ? reject(error) : resolvePort(address.port)));
  });
});
const url = `http://${host}:${port}/aws-certification-simulation-demo/`;
const server = spawn(
  process.execPath,
  [resolve("node_modules/vite/bin/vite.js"), "--host", host, "--port", String(port), "--strictPort"],
  { stdio: "inherit" },
);

function stopServer() {
  if (server.exitCode === null) server.kill("SIGTERM");
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Vite exited before becoming ready (code ${server.exitCode}).`);
    try {
      const response = await fetch(url);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      // The local server is still starting.
    }
    await delay(250);
  }
  if (!ready) throw new Error(`Vite did not become ready at ${url}.`);

  const cypress = spawn(process.execPath, [resolve("node_modules/cypress/bin/cypress"), "run"], {
    stdio: "inherit",
    env: { ...process.env, CYPRESS_BASE_URL: url },
  });
  const exitCode = await new Promise((resolveExit, reject) => {
    cypress.once("error", reject);
    cypress.once("exit", (code, signal) => resolveExit(code ?? (signal ? 1 : 0)));
  });
  process.exitCode = exitCode;
} finally {
  stopServer();
}
