import { divide } from "@extremejs/utils";
import { divide as lodashDivide } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const left = 6;
const right = 4;

test("two numbers", async context => benchmark(context, 1.5, [
  {
    run: (): number => divide(left, right),
  },
  {
    name: "lodash",
    run : (): number => lodashDivide(left, right),
  },
]));
