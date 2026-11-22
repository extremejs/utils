import { isString } from "@extremejs/utils";
import { isString as lodashIsString } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = "example";

test("recognize a primitive string", async context => benchmark(context, true, [
  {
    run: (): boolean => isString(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsString(value),
  },
]));
