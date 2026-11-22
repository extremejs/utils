import { isObjectLike } from "@extremejs/utils";
import { isObjectLike as lodashIsObjectLike } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = { a: 1 };

test("recognize an ordinary object", async context => benchmark(context, true, [
  {
    run: (): boolean => isObjectLike(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsObjectLike(value),
  },
]));
