import { isArguments } from "@extremejs/utils";
import { isArguments as lodashIsArguments } from "lodash";
import { test } from "vitest";
import { benchmark, toStrictArguments } from "#test";

const value: unknown = toStrictArguments(1, 2);

test("recognize an arguments object", async context => benchmark(context, true, [
  {
    run: (): boolean => isArguments(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsArguments(value),
  },
]));
