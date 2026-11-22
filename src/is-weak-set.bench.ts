import { isWeakSet } from "@extremejs/utils";
import { isWeakSet as lodashIsWeakSet } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = new WeakSet();

test("recognize a weak set", async context => benchmark(context, true, [
  {
    run: (): boolean => isWeakSet(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsWeakSet(value),
  },
]));
