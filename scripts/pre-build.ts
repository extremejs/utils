import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { cwd } from "node:process";

await Promise.all([
  rm(resolve(cwd(), ".tsbuildinfo"), { force: true }),
  rm(resolve(cwd(), "dist"), {
    recursive: true,
    force    : true,
  }),
]);
