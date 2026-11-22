import * as utils from "@extremejs/utils";
import lodash from "lodash";
import { describe, test } from "vitest";
import { runBenchmark } from "../test/benchmark.js";

const { sumBy } = utils;
const { sumBy: lodashSumBy } = lodash;

function selectPoints({ metrics }: { metrics: { points: number; }; }): number {
  return metrics.points;
}

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: index + 1 } }));
  const expected = size * (size + 1) / 2;
  const path = "metrics.points";

  test.for([
    {
      name   : "sumBy callback",
      extreme: () => sumBy(values, selectPoints),
      lodash : () => lodashSumBy(values, selectPoints),
    },
    {
      name   : "sumBy property",
      extreme: () => sumBy(values, path),
      lodash : () => lodashSumBy(values, path),
    },
  ])("$name", async (workload, context) => {
    context.expect(workload.extreme()).toBe(expected);
    context.expect(workload.lodash()).toBe(expected);

    await runBenchmark(
      context,
      {
        name: "@extremejs/utils",
        run : workload.extreme,
      },
      {
        name: "lodash",
        run : workload.lodash,
      },
    );
  });
});
