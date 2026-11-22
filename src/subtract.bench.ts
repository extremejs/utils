import { subtract } from "@extremejs/utils";
import { subtract as lodashSubtract } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const left = 6;
const right = 4;

test("two numbers", async context => benchmark(context, 2, [
  {
    run: (): number => subtract(left, right),
  },
  {
    name: "lodash",
    run : (): number => lodashSubtract(left, right),
  },
]));
