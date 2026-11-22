import { upperFirst } from "@extremejs/utils";
import { upperFirst as lodashUpperFirst } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = "école";

test("change only the case of the first letter", async context => benchmark(context, "École", [
  {
    run: (): string => upperFirst(value),
  },
  {
    name: "lodash",
    run : (): string => lodashUpperFirst(value),
  },
]));
