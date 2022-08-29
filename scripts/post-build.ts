import { existsSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const CWD = process.cwd();
const DIR = resolve(CWD, "build");
const PACKAGE_FILENAME = "package.json";
const ENCODING = "utf8" as const;

if (existsSync(DIR)) {
  writeFileSync(resolve(DIR, "cjs", PACKAGE_FILENAME), JSON.stringify({ type: "commonjs" }), ENCODING);

  writeFileSync(resolve(DIR, "esm", PACKAGE_FILENAME), JSON.stringify({ type: "module" }), ENCODING);
}

const files = readdirSync(resolve(CWD, "src")).map(file => file.replace(/\.ts$/, ""))
  .filter(file => file !== "index")
  .sort();

const PACKAGE_FILE = resolve(CWD, PACKAGE_FILENAME);

const pkg = JSON.parse(readFileSync(PACKAGE_FILE, ENCODING));

for (const file of files) {
  const esmBase = `./build/esm/${ file }`;
  const cjsBase = `./build/cjs/${ file }`;

  pkg.exports[`./${ file }`] = {
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

  const keyword = file.replaceAll(/-(?<char>.)/g, (_, char) => char.toUpperCase());

  if (!pkg.keywords.includes(keyword)) pkg.keywords.push(keyword);
}

writeFileSync(PACKAGE_FILE, `${ JSON.stringify(pkg, null, 2) }\n`, ENCODING);
