import { hasOwn } from "@extremejs/utils";
import { has as lodashHas } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const dottedKey = "a.b";
const value = {
  [dottedKey]: 1,
  a          : { b: 2 },
};

test.for([
  {
    key     : "a.b",
    expected: true,
  },
  {
    key     : "a.c",
    expected: false,
  },
] as const)("check a literal key $key", async ({ key, expected }, context) => benchmark(context, expected, [
  {
    run: (): boolean => hasOwn(value, [key]),
  },
  {
    name: "lodash (single-segment path)",
    run : (): boolean => lodashHas(value, [key]),
  },
]));

const nested = { a: value.a };

test("check a nested own path", async context => benchmark(context, true, [
  {
    run: (): boolean => hasOwn(nested, "a.b"),
  },
  {
    name: "lodash",
    run : (): boolean => lodashHas(nested, "a.b"),
  },
]));
