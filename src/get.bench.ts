import { get } from "@extremejs/utils";
import { get as lodashGet } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = {
  id   : 1,
  items: [{ score: 2 }],
};

test.for([
  {
    path    : "id",
    expected: 1,
  },
  {
    path    : "items[0].score",
    expected: 2,
  },
] as const)("read $path", async ({ path, expected }, context) => benchmark(context, expected, [
  {
    run: (): number => get(value, path),
  },
  {
    name: "lodash",
    run : (): number => lodashGet(value, path),
  },
]));
