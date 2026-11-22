import { isWeakMap } from "@extremejs/utils";
import { isWeakMap as lodashIsWeakMap } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = new WeakMap();

test("recognize a weak map", async context => benchmark(context, true, [
  {
    run: (): boolean => isWeakMap(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsWeakMap(value),
  },
]));
