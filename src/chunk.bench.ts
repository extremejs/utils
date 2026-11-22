import { chunk } from "@extremejs/utils";
import { chunk as lodashChunk } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, () => 1);
  const expected = Array.from({ length: size / 8 }, () => Array.from({ length: 8 }, () => 1));

  test("group numeric values in chunks of eight", async context => benchmark(context, expected, [
    {
      run: (): number[][] => chunk(values, 8),
    },
    {
      name: "lodash",
      run : (): number[][] => lodashChunk(values, 8),
    },
  ]));
});
