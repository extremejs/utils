import { isFunction } from "@extremejs/utils";
import { isFunction as lodashIsFunction } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = Array.prototype.slice;

test("recognize a built-in function", async context => benchmark(context, true, [
  {
    run: (): boolean => isFunction(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsFunction(value),
  },
]));
