import { maxByFn } from "@extremejs/utils";
import { maxBy as lodashMaxBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

function selectPoints({ metrics }: { metrics: { points: number; }; }): number {
  return metrics.points;
}

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: size - index } }));
  const expected = size;

  test("by callback (Lodash reapplies the callback to the winner)", async context => benchmark(context, expected, [
    {
      run: (): number => maxByFn(values, selectPoints),
    },
    {
      name: "lodash",
      run : (): number | undefined => {
        const winner = lodashMaxBy(values, selectPoints);

        return winner && selectPoints(winner);
      },
    },
  ]));
});
