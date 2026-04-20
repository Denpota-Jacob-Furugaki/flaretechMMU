// Copy ../analyses/*.md into content/analyses/ at build time so the Next.js
// app (whose Root Directory is `dashboard/`) can read them via fs.
//
// Runs as a prebuild step. Safe to run locally.

import { readdir, mkdir, copyFile, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "..", "analyses");
const DEST = join(__dirname, "..", "content", "analyses");

async function main() {
  let entries;
  try {
    entries = await readdir(SRC, { withFileTypes: true });
  } catch (e) {
    console.warn(`sync-analyses: SRC not found at ${SRC}, skipping. (${e.code})`);
    return;
  }

  await rm(DEST, { recursive: true, force: true });
  await mkdir(DEST, { recursive: true });

  let copied = 0;
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (!e.name.endsWith(".md")) continue;
    if (e.name === "README.md") continue;
    await copyFile(join(SRC, e.name), join(DEST, e.name));
    copied += 1;
  }
  console.log(`sync-analyses: copied ${copied} file(s) to ${DEST}`);
}

await main();
