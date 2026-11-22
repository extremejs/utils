import { sumByProperty } from "@extremejs/utils";
import { sumBy as lodashSumBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: index + 1 } }));
  const expected = size * (size + 1) / 2;
  const path = "metrics.points";

  test("by property", async context => benchmark(context, expected, [
    {
      run: (): number => sumByProperty(values, path),
    },
    {
      name: "lodash",
      run : (): number => lodashSumBy(values, path),
    },
  ]));
});
