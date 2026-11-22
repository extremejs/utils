import * as utils from "@extremejs/utils";
import lodash from "lodash";
import { describe, test } from "vitest";
import { runBenchmark } from "../test/benchmark.js";

const { sumByFn } = utils;
const { sumBy: lodashSumBy } = lodash;

function selectPoints({ metrics }: { metrics: { points: number; }; }): number {
  return metrics.points;
}

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: index + 1 } }));
  const expected = size * (size + 1) / 2;

  test("sumByFn callback", async (context) => {
    const extreme = {
      name: "@extremejs/utils",
      run : (): number => sumByFn(values, selectPoints),
    };
    const reference = {
      name: "lodash",
      run : (): number => lodashSumBy(values, selectPoints),
    };

    context.expect(extreme.run()).toBe(expected);
    context.expect(reference.run()).toBe(expected);

    await runBenchmark(context, extreme, reference);
  });
});
