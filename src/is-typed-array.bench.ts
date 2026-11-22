import { isTypedArray } from "@extremejs/utils";
import { isTypedArray as lodashIsTypedArray } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = new Uint16Array(8);

test("recognize a typed array", async context => benchmark(context, true, [
  {
    run: (): boolean => isTypedArray(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsTypedArray(value),
  },
]));
