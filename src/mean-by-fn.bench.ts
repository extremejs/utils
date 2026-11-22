import { meanByFn } from "@extremejs/utils";
import { meanBy as lodashMeanBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

function selectPoints({ metrics }: { metrics: { points: number; }; }): number {
  return metrics.points;
}

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: size - index } }));
  const expected = (size + 1) / 2;

  test("by callback", async context => benchmark(context, expected, [
    {
      run: (): number => meanByFn(values, selectPoints),
    },
    {
      name: "lodash",
      run : (): number => lodashMeanBy(values, selectPoints),
    },
  ]));
});
