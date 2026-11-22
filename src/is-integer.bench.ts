import { isInteger } from "@extremejs/utils";
import { isInteger as lodashIsInteger } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = 42;

test("recognize an integer", async context => benchmark(context, true, [
  {
    run: (): boolean => isInteger(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsInteger(value),
  },
]));
