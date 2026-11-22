import { last } from "@extremejs/utils";
import { last as lodashLast } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const values = [1, 2, 3];
const expected = 3;

test("read the last element of a dense array", async context => benchmark(context, expected, [
  {
    run: (): number | undefined => last(values),
  },
  {
    name: "lodash",
    run : (): number | undefined => lodashLast(values),
  },
]));
