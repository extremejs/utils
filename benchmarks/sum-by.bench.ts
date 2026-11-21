import * as utils from "@extremejs/utils";
import lodash from "lodash";
import { describe, test } from "vitest";

const { sumBy, sumByFn, sumByProperty } = utils;
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
    {
      name   : "sumByFn callback",
      extreme: () => sumByFn(values, selectPoints),
      lodash : () => lodashSumBy(values, selectPoints),
    },
    {
      name   : "sumByProperty property",
      extreme: () => sumByProperty(values, path),
      lodash : () => lodashSumBy(values, path),
    },
  ])("$name", async (workload, { annotate, bench, expect }) => {
    expect(workload.extreme()).toBe(expected);
    expect(workload.lodash()).toBe(expected);

    const results = await bench.compare(
      bench("ExtremeJS", workload.extreme),
      bench("Lodash", workload.lodash),
    );
    const ratio = results.get("ExtremeJS").throughput.mean / results.get("Lodash").throughput.mean;

    await annotate(`ExtremeJS / Lodash throughput ratio: ${ ratio.toFixed(2) }x`);
  });
});
