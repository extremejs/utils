import { isSet } from "@extremejs/utils";
import { isSet as lodashIsSet } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = new Set([1]);

test("recognize a set", async context => benchmark(context, true, [
  {
    run: (): boolean => isSet(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsSet(value),
  },
]));
