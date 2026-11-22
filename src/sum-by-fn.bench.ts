import { sumByFn } from "@extremejs/utils";
import { sumBy as lodashSumBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

function selectPoints({ metrics }: { metrics: { points: number; }; }): number {
  return metrics.points;
}

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: index + 1 } }));
  const expected = size * (size + 1) / 2;

  test("by callback", async context => benchmark(context, expected, [
    {
      run: (): number => sumByFn(values, selectPoints),
    },
    {
      name: "lodash",
      run : (): number => lodashSumBy(values, selectPoints),
    },
  ]));
});
