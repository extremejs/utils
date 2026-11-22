import { startsWith } from "@extremejs/utils";
import { startsWith as lodashStartsWith } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = "🚀prefix--suffix.end";

test("match literal text at a nonzero starting position", async context => benchmark(context, true, [
  {
    run: (): boolean => startsWith(value, "prefix", 2),
  },
  {
    name: "lodash",
    run : (): boolean => lodashStartsWith(value, "prefix", 2),
  },
]));
