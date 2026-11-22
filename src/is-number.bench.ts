import { isNumber } from "@extremejs/utils";
import { isNumber as lodashIsNumber } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = 42;

test("recognize a primitive number", async context => benchmark(context, true, [
  {
    run: (): boolean => isNumber(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsNumber(value),
  },
]));
