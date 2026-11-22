import { isArrayBuffer } from "@extremejs/utils";
import { isArrayBuffer as lodashIsArrayBuffer } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

const value: unknown = new ArrayBuffer(16);

test("recognize an array buffer", async context => benchmark(context, true, [
  {
    run: (): boolean => isArrayBuffer(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsArrayBuffer(value),
  },
]));
