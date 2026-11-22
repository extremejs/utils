import { isRegExp } from "@extremejs/utils";
import { isRegExp as lodashIsRegExp } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = /x/;

test("recognize a regular expression", async context => benchmark(context, true, [
  {
    run: (): boolean => isRegExp(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsRegExp(value),
  },
]));
