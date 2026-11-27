import { isEmpty } from "@extremejs/utils";
import { isEmpty as lodashIsEmpty } from "lodash";
import { test } from "vitest";
import { benchmark, foreignValues } from "#test";

const [foreignMap, foreignSet] = foreignValues("new Map([['a', 1]])", "new Set([1])");

test.for([
  {
    name    : "empty record",
    value   : {},
    expected: true,
  },
  {
    name    : "populated foreign map",
    value   : foreignMap,
    expected: false,
  },
  {
    name    : "populated foreign set",
    value   : foreignSet,
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
