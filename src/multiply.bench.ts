import { multiply } from "@extremejs/utils";
import { multiply as lodashMultiply } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const left = 6;
const right = 4;

test("two numbers", async context => benchmark(context, 24, [
  {
    run: (): number => multiply(left, right),
  },
  {
    name: "lodash",
    run : (): number => lodashMultiply(left, right),
  },
]));
