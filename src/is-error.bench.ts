import { isError } from "@extremejs/utils";
import { isError as lodashIsError } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = new Error("example");

test("recognize a native error", async context => benchmark(context, true, [
  {
    run: (): boolean => isError(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsError(value),
  },
]));
