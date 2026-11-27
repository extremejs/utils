import { toPath } from "@extremejs/utils";
import { toPath as lodashToPath } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const path = "catalog.items[12].metrics[score]";
const expected = ["catalog", "items", "12", "metrics", "score"];

test("split a string path", async context => benchmark(context, expected, [
  {
    run: (): string[] => toPath(path),
  },
  {
    name: "lodash",
    run : (): string[] => lodashToPath(path),
  },
]));

test("copy a string segment array", async context => benchmark(context, expected, [
  {
    run: (): string[] => toPath(expected),
  },
  {
    name: "lodash",
    run : (): string[] => lodashToPath(expected),
  },
]));
