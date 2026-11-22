import { isNull } from "@extremejs/utils";
import { isNull as lodashIsNull } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = null;

test("recognize an accepted nullish value", async context => benchmark(context, true, [
  {
    run: (): boolean => isNull(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsNull(value),
  },
]));
