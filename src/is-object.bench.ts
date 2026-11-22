import { isObject } from "@extremejs/utils";
import { isObject as lodashIsObject } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = { a: 1 };

test("recognize an ordinary object", async context => benchmark(context, true, [
  {
    run: (): boolean => isObject(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsObject(value),
  },
]));
