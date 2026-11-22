import { isLength } from "@extremejs/utils";
import { isLength as lodashIsLength } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = 3;

test("recognize an array-like length", async context => benchmark(context, true, [
  {
    run: (): boolean => isLength(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsLength(value),
  },
]));
