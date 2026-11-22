import { iteratee } from "@extremejs/utils";
import { iteratee as lodashIteratee } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = { items: [{ score: 2 }] };
const path = "items[0].score";

function select(input: typeof value): number {
  return input.items[0]?.score ?? 0;
}

test("select one score through a callback", async context => benchmark(context, 2, [
  {
    run: (): number => iteratee(select)(value),
  },
  {
    name: "lodash",
    run : (): number => lodashIteratee(select)(value),
  },
]));

test("create a property iteratee and read one score", async context => benchmark(context, 2, [
  {
    run: (): number | undefined => iteratee(path)(value),
  },
  {
    name: "lodash",
    run : (): unknown => lodashIteratee(path)(value),
  },
]));
