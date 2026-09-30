import type { KnipConfig } from "knip";

export default {
  entry  : ["scripts/**/*.ts", "tests/**/*.test.ts"],
  project: ["src/**/*.ts", "scripts/**/*.ts", "tests/**/*.ts"],
} satisfies KnipConfig;
