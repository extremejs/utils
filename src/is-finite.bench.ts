import { isFinite } from "@extremejs/utils";
import { isFinite as lodashIsFinite } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = 3.14;

test("recognize a finite fraction", async context => benchmark(context, true, [
  {
    run: (): boolean => isFinite(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsFinite(value),
  },
]));
