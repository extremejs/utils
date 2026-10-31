import type { KnipConfig } from "knip";

export default {
  entry  : ["scripts/**/*.ts", "src/**/*.spec.ts"],
  project: ["src/**/*.ts", "scripts/**/*.ts", "test/**/*.ts"],
} satisfies KnipConfig;
