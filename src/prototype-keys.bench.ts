import { prototypeKeys } from "@extremejs/utils";
import { keys as lodashKeys } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

class Entry {}

Object.assign(Entry.prototype, {
  a: 1,
  b: 2,
});
Object.defineProperty(Entry.prototype, "constructor", { enumerable: true });

test("list enumerable names of a constructor prototype", async context => benchmark(context, ["a", "b"], [
  {
    run: (): PropertyKey[] => prototypeKeys(Entry.prototype),
  },
  {
    name: "lodash",
    run : (): string[] => lodashKeys(Entry.prototype),
  },
]));
