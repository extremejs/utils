import { isBoolean } from "@extremejs/utils";
import { isBoolean as lodashIsBoolean } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = false;

test("recognize a primitive boolean", async context => benchmark(context, true, [
  {
    run: (): boolean => isBoolean(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsBoolean(value),
  },
]));
