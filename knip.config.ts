import type { KnipConfig } from "knip";

export default {
  entry  : ["scripts/**/*.ts", "src/**/*.spec.ts"],
  project: ["src/**/*.ts", "scripts/**/*.ts", "tests/**/*.ts"],
} satisfies KnipConfig;
