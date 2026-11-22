import { slice } from "@extremejs/utils";
import { slice as lodashSlice } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, (_, index) => index);
  const start = size / 4;
  const end = size - start;
  const expected = Array.from({ length: end - start }, (_, index) => index + start);

  test("copy the middle half of a numeric array", async context => benchmark(context, expected, [
    {
      run: (): number[] => slice(values, start, end),
    },
    {
      name: "lodash",
      run : (): number[] => lodashSlice(values, start, end),
    },
  ]));
});
