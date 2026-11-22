import { isDate } from "@extremejs/utils";
import { isDate as lodashIsDate } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = new Date(0);

test("recognize a date", async context => benchmark(context, true, [
  {
    run: (): boolean => isDate(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsDate(value),
  },
]));
