import { isSymbol } from "@extremejs/utils";
import { isSymbol as lodashIsSymbol } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = Symbol("x");

test("recognize a primitive symbol", async context => benchmark(context, true, [
  {
    run: (): boolean => isSymbol(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsSymbol(value),
  },
]));
