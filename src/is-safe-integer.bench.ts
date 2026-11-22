import { isSafeInteger } from "@extremejs/utils";
import { isSafeInteger as lodashIsSafeInteger } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = 42;

test("recognize a safe integer", async context => benchmark(context, true, [
  {
    run: (): boolean => isSafeInteger(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsSafeInteger(value),
  },
]));
