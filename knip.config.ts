import type { KnipConfig } from "knip";

export default {
  entry  : ["benchmarks/**/*.bench.ts", "scripts/**/*.ts", "src/**/*.spec.ts"],
  project: ["benchmarks/**/*.ts", "src/**/*.ts", "scripts/**/*.ts", "test/**/*.ts"],
} satisfies KnipConfig;
