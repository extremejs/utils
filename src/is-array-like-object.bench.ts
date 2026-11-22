import { isArrayLikeObject } from "@extremejs/utils";
import { isArrayLikeObject as lodashIsArrayLikeObject } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = { length: 3 };

test("recognize a record with a valid length", async context => benchmark(context, true, [
  {
    run: (): boolean => isArrayLikeObject(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsArrayLikeObject(value),
  },
]));
