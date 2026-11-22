import { isUndefined } from "@extremejs/utils";
import { isUndefined as lodashIsUndefined } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = void 0;

test("recognize an accepted nullish value", async context => benchmark(context, true, [
  {
    run: (): boolean => isUndefined(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsUndefined(value),
  },
]));
