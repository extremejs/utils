import { readFile, readdir, writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { camelCase } from "../src/index.js";

const CWD = cwd();
const PACKAGE_FILENAME = "package.json";
const ENCODING = "utf8" as const;

let files = await readdir(resolve(CWD, "src"));

files = files
  .filter(file => file.endsWith(".ts") && !file.endsWith(".spec.ts"))
  .map(file => file.replace(/\.ts$/, ""))
  .filter(file => file !== "index")
  .toSorted();

const PACKAGE_FILE = resolve(CWD, PACKAGE_FILENAME);

const pkg = JSON.parse(await readFile(PACKAGE_FILE, ENCODING));

const keywords = new Set(pkg.keywords);

for (const file of files) keywords.add(camelCase(file));

pkg.keywords = [...keywords];

await writeFile(PACKAGE_FILE, `${ JSON.stringify(pkg, null, 2) }${ EOL }`, ENCODING);
