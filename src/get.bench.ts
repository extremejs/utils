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
    run: (): number | undefined => get(value, path),
  },
  {
    name: "lodash",
    run : (): number => lodashGet(value, path),
  },
]));

const segments = ["items", "0", "score"] as const;
const lodashSegments = [...segments];

test("read an explicit path", async context => benchmark(context, 2, [
  {
    run: (): number | undefined => get(value, segments),
  },
  {
    name: "lodash",
    run : (): number => lodashGet(value, lodashSegments),
  },
]));
