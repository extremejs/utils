import { drop } from "@extremejs/utils";
import { drop as lodashDrop } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, (_, index) => index);
  const count = size / 4;
  const expected = Array.from({ length: size - count }, (_, index) => index + count);

  test("drop the first quarter of a numeric array", async context => benchmark(context, expected, [
    {
      run: (): number[] => drop(values, count),
    },
    {
      name: "lodash",
      run : (): number[] => lodashDrop(values, count),
    },
  ]));
});
