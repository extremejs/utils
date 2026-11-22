import { add } from "@extremejs/utils";
import { add as lodashAdd } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const left = 6;
const right = 4;

test("two numbers", async context => benchmark(context, 10, [
  {
    run: (): number => add(left, right),
  },
  {
    name: "lodash",
    run : (): number => lodashAdd(left, right),
  },
]));
