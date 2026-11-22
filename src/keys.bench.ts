import { keys } from "@extremejs/utils";
import { keys as lodashKeys } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = {
  a: 1,
  b: 2,
  c: 3,
};

test("list enumerable keys of a record", async context => benchmark(context, ["a", "b", "c"], [
  {
    run: (): PropertyKey[] => keys(value),
  },
  {
    name: "lodash",
    run : (): string[] => lodashKeys(value),
  },
]));

const expected = Array.from({ length: 128 }, (_, index) => String(index));
const sparse = [1];
sparse[127] = 2;

test("list indices of a sparse array", async context => benchmark(context, expected, [
  {
    run: (): PropertyKey[] => keys(sparse),
  },
  {
    name: "lodash",
    run : (): string[] => lodashKeys(sparse),
  },
]));
