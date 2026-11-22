import { isArray } from "@extremejs/utils";
import { isArray as lodashIsArray } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = [1, 2, 3];

test("recognize an array", async context => benchmark(context, true, [
  {
    run: (): boolean => isArray(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsArray(value),
  },
]));
