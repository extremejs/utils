import { env } from "node:process";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import { type ViteUserConfig, defineConfig } from "vitest/config";

// Use the native Node loader for the compiled benchmark target to avoid Vite's import getters.
const builtEntry = fileURLToPath(new URL("./dist/index.js", import.meta.url));

// Benchmark workers have no TTY. Pass them the parent terminal's color level.
const benchmarkColorLevel = env.NO_COLOR || env.NODE_DISABLE_COLORS ? "0" : String(chalk.level);

export default defineConfig(({ mode }): ViteUserConfig => ({
  resolve: mode === "benchmark" ? { alias: { "@extremejs/utils": builtEntry } } : {},
  test   : {
    name         : "ExtremeJS Utils",
    include      : ["src/**/*.spec.ts", "test/**/*.spec.ts"],
    env          : mode === "benchmark" ? { FORCE_COLOR: benchmarkColorLevel } : {},
    fsModuleCache: true,
    logHeapUsage : true,
    isolate      : false,
    server       : mode === "benchmark" ? { deps: { external: [/[/\\]dist[/\\]index\.js$/] } } : {},
    coverage     : {
      provider        : "v8",
      reportsDirectory: "coverage",
      include         : ["src/**/*.ts"],
      exclude         : [
        "src/**/*.d.ts",
        "src/**/*.bench.ts",
        "src/**/*.spec.ts",
      ],
      thresholds: {
        statements: 100,
      },
    },
  },
}));
