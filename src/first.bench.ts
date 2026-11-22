import { first } from "@extremejs/utils";
import { head as lodashHead } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const values = [1, 2, 3];
const expected = 1;

test("read the first element of a dense array", async context => benchmark(context, expected, [
  {
    run: (): number | undefined => first(values),
  },
  {
    name: "lodash",
    run : (): number | undefined => lodashHead(values),
  },
]));
