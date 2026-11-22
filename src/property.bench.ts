import { property } from "@extremejs/utils";
import { property as lodashProperty } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value = { items: [{ score: 2 }] };
const path = "items[0].score";

test("create a deep accessor and read one value", async context => benchmark(context, 2, [
  {
    run: (): number | undefined => property(path)(value),
  },
  {
    name: "lodash",
    run : (): number => lodashProperty<typeof value, number>(path)(value),
  },
]));

const read = property(path);
const lodashRead = lodashProperty<typeof value, number>(path);

test("read through a reused deep accessor", async context => benchmark(context, 2, [
  {
    run: (): number | undefined => read(value),
  },
  {
    name: "lodash",
    run : (): number => lodashRead(value),
  },
]));
