import { upperFirst } from "@extremejs/utils";
import { upperFirst as lodashUpperFirst } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = "𐐨cole";

test("change only the case of the first letter", async context => benchmark(context, "𐐀cole", [
  {
    run: (): string => upperFirst(value),
  },
  {
    name: "lodash",
    run : (): string => lodashUpperFirst(value),
  },
]));
