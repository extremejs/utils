import { isNaN } from "@extremejs/utils";
import { isNaN as lodashIsNaN } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = Number.NaN;

test("recognize primitive NaN", async context => benchmark(context, true, [
  {
    run: (): boolean => isNaN(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsNaN(value),
  },
]));
