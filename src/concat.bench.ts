import { concat } from "@extremejs/utils";
import { concat as lodashConcat } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, () => 1);
  const extra = Array.from({ length: size }, () => 2);
  const expected = [...values, ...extra, 3];

  test("append an array and a scalar", async context => benchmark(context, expected, [
    {
      run: (): number[] => concat(values, extra, 3),
    },
    {
      name: "lodash",
      run : (): number[] => lodashConcat(values, extra, 3),
    },
  ]));
});
