import { isPlainObject } from "@extremejs/utils";
import { isPlainObject as lodashIsPlainObject } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = { a: 1 };

test("recognize an ordinary record", async context => benchmark(context, true, [
  {
    run: (): boolean => isPlainObject(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsPlainObject(value),
  },
]));
