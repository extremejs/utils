import { ownKeys } from "@extremejs/utils";
import { keys as lodashKeys } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const expected = Array.from({ length: 32 }, (_, index) => `field${ index }`);
const value = Object.fromEntries(expected.map((key, index) => [key, index]));

test("list names when all own string keys are enumerable", async context => benchmark(context, expected, [
  {
    run: (): PropertyKey[] => ownKeys(value),
  },
  {
    name: "lodash",
    run : (): string[] => lodashKeys(value),
  },
]));
