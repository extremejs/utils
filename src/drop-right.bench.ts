import { dropRight } from "@extremejs/utils";
import { dropRight as lodashDropRight } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, (_, index) => index);
  const count = size / 4;
  const expected = Array.from({ length: size - count }, (_, index) => index);

  test("drop the final quarter of a numeric array", async context => benchmark(context, expected, [
    {
      run: (): number[] => dropRight(values, count),
    },
    {
      name: "lodash",
      run : (): number[] => lodashDropRight(values, count),
    },
  ]));
});
