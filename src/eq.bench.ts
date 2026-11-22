import { eq } from "@extremejs/utils";
import { eq as lodashEq } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = Number.NaN;
const other: unknown = Number.NaN;

test("compare two NaN values", async context => benchmark(context, true, [
  {
    run: (): boolean => eq(value, other),
  },
  {
    name: "lodash",
    run : (): boolean => lodashEq(value, other),
  },
]));
