import { maxBy } from "@extremejs/utils";
import { get as lodashGet, maxBy as lodashMaxBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

function selectPoints({ metrics }: { metrics: { points: number; }; }): number {
  return metrics.points;
}

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: size - index } }));
  const expected = size;
  const path = "metrics.points";

  test("by callback (Lodash reapplies the callback to the winner)", async context => benchmark(context, expected, [
    {
      run: (): number => maxBy(values, selectPoints),
    },
    {
      name: "lodash",
      run : (): number | undefined => {
        const winner = lodashMaxBy(values, selectPoints);

        return winner && selectPoints(winner);
      },
    },
  ]));

  test("by property (Lodash looks up the winning score)", async context => benchmark(context, expected, [
    {
      run: (): number => maxBy(values, path),
    },
    {
      name: "lodash",
      run : (): number | undefined => {
        const winner = lodashMaxBy(values, path);

        return winner && lodashGet(winner, path);
      },
    },
  ]));
});
