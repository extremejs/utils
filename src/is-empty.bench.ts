import { isEmpty } from "@extremejs/utils";
import { isEmpty as lodashIsEmpty } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

test.for([
  {
    name    : "empty record",
    value   : {},
    expected: true,
  },
  {
    name    : "populated map",
    value   : new Map([["a", 1]]),
    expected: false,
  },
])("check a $name", async ({ value, expected }, context) => benchmark(context, expected, [
  {
    run: (): boolean => isEmpty(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsEmpty(value),
  },
]));
