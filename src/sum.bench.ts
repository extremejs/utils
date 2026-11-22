import { sum } from "@extremejs/utils";
import { sum as lodashSum } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i numbers", (size) => {
  const values = Array.from({ length: size }, (_, index) => size - index);

  test("sum", async context => benchmark(context, size * (size + 1) / 2, [
    {
      run: (): number => sum(values),
    },
    {
      name: "lodash",
      run : (): number => lodashSum(values),
    },
  ]));
});
