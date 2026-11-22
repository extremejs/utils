import { endsWith } from "@extremejs/utils";
import { endsWith as lodashEndsWith } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = "🚀prefix--suffix.end";

test("match literal text at an explicit end position", async context => benchmark(context, true, [
  {
    run: (): boolean => endsWith(value, "suffix", 16),
  },
  {
    name: "lodash",
    run : (): boolean => lodashEndsWith(value, "suffix", 16),
  },
]));
