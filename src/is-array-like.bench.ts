import { isArrayLike } from "@extremejs/utils";
import { isArrayLike as lodashIsArrayLike } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = { length: 3 };

test("recognize a record with a valid length", async context => benchmark(context, true, [
  {
    run: (): boolean => isArrayLike(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsArrayLike(value),
  },
]));
