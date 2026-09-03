import { access, readFile } from "node:fs/promises";

const indexPath = new URL("../dist/client/index.html", import.meta.url);
const hostingPath = new URL("../dist/.openai/hosting.json", import.meta.url);

await access(indexPath);
const hosting = JSON.parse(await readFile(hostingPath, "utf8"));
if (hosting.static?.directory !== "dist/client") {
  throw new Error("Static hosting directory must be dist/client");
}

console.log("Validated static artifact: index.html and hosting manifest are present.");
