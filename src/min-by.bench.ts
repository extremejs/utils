import { minBy } from "@extremejs/utils";
import { get as lodashGet, minBy as lodashMinBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

function selectPoints({ metrics }: { metrics: { points: number; }; }): number {
  return metrics.points;
}

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: size - index } }));
  const expected = 1;
  const path = "metrics.points";

  test("by callback (Lodash reapplies the callback to the winner)", async context => benchmark(context, expected, [
    {
      run: (): number => minBy(values, selectPoints),
    },
    {
      name: "lodash",
      run : (): number | undefined => {
        const winner = lodashMinBy(values, selectPoints);

        return winner && selectPoints(winner);
      },
    },
  ]));

  test("by property (Lodash looks up the winning score)", async context => benchmark(context, expected, [
    {
      run: (): number => minBy(values, path),
    },
    {
      name: "lodash",
      run : (): number | undefined => {
        const winner = lodashMinBy(values, path);

        return winner && lodashGet(winner, path);
      },
    },
  ]));
});
