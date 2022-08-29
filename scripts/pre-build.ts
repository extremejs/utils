import { rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const DIR = resolve(process.cwd(), "build");

if (existsSync(DIR)) {
  rmSync(DIR, {
    recursive: true,
    force    : true,
  });
}
