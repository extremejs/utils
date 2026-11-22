import { isBuffer } from "@extremejs/utils";
import { isBuffer as lodashIsBuffer } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = Buffer.alloc(16);

test("recognize a Node.js buffer", async context => benchmark(context, true, [
  {
    run: (): boolean => isBuffer(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsBuffer(value),
  },
]));
