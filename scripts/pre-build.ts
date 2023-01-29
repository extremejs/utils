import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { cwd } from "node:process";

const DIR = resolve(cwd(), "build");

if (existsSync(DIR)) {
  await rm(DIR, {
    recursive: true,
    force    : true,
  });
}
