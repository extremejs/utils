import { isNil } from "@extremejs/utils";
import { isNil as lodashIsNil } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = null;

test("recognize an accepted nullish value", async context => benchmark(context, true, [
  {
    run: (): boolean => isNil(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsNil(value),
  },
]));
