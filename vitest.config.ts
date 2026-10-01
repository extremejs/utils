import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name         : "ExtremeJS Utils",
    include      : ["src/**/*.spec.ts"],
    globals      : true,
    fsModuleCache: true,
    logHeapUsage : true,
    isolate      : false,
    coverage     : {
      provider        : "v8",
      reportsDirectory: "coverage",
      include         : ["src/**/*.ts"],
      exclude         : [
        "src/**/*.d.ts",
        "src/**/*.spec.ts",
      ],
      thresholds: {
        statements: 100,
      },
    },
  },
});
