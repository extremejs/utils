import { isMap } from "@extremejs/utils";
import { isMap as lodashIsMap } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = new Map([["key", 1]]);

test("recognize a map", async context => benchmark(context, true, [
  {
    run: (): boolean => isMap(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsMap(value),
  },
]));
