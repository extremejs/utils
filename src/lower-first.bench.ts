import { lowerFirst } from "@extremejs/utils";
import { lowerFirst as lodashLowerFirst } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = "ÉCOLE";

test("change only the case of the first letter", async context => benchmark(context, "éCOLE", [
  {
    run: (): string => lowerFirst(value),
  },
  {
    name: "lodash",
    run : (): string => lodashLowerFirst(value),
  },
]));
