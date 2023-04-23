import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { camelCase } from "../src/index.js";

const CWD = cwd();
const DIR = resolve(CWD, "build");
const PACKAGE_FILENAME = "package.json";
const ENCODING = "utf8" as const;

if (existsSync(DIR)) {
  await writeFile(resolve(DIR, "cjs", PACKAGE_FILENAME), JSON.stringify({ type: "commonjs" }), ENCODING);

  await writeFile(resolve(DIR, "esm", PACKAGE_FILENAME), JSON.stringify({ type: "module" }), ENCODING);
}

const files = (await readdir(resolve(CWD, "src")))
  .filter(file => file.endsWith(".ts"))
  .map(file => file.replace(/\.ts$/, ""))
  .filter(file => file !== "index")
  .sort();

const PACKAGE_FILE = resolve(CWD, PACKAGE_FILENAME);

const pkg = JSON.parse(await readFile(PACKAGE_FILE, ENCODING));

for (const file of files) {
  const esmBase = `./build/esm/${ file }`;
  const cjsBase = `./build/cjs/${ file }`;

  pkg.publishConfig.exports[`./${ file }`] = {
    browser: {
      types  : `${ esmBase }.d.ts`,
      default: `${ esmBase }.js`,
    },
    import: {
      types  : `${ esmBase }.d.ts`,
      default: `${ esmBase }.js`,
    },
    default: {
      types  : `${ cjsBase }.d.ts`,
      default: `${ cjsBase }.js`,
    },
  };

  const keyword = camelCase(file);

  if (!pkg.keywords.includes(keyword)) pkg.keywords.push(keyword);
}

await writeFile(PACKAGE_FILE, `${ JSON.stringify(pkg, null, 2) }${ EOL }`, ENCODING);
