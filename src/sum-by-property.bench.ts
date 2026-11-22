import * as utils from "@extremejs/utils";
import lodash from "lodash";
import { describe, test } from "vitest";
import { runBenchmark } from "../test/benchmark.js";

const { sumByProperty } = utils;
const { sumBy: lodashSumBy } = lodash;

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: index + 1 } }));
  const expected = size * (size + 1) / 2;
  const path = "metrics.points";

  test("sumByProperty property", async (context) => {
    const extreme = {
      name: "@extremejs/utils",
      run : (): number => sumByProperty(values, path),
    };
    const reference = {
      name: "lodash",
      run : (): number => lodashSumBy(values, path),
    };

    context.expect(extreme.run()).toBe(expected);
    context.expect(reference.run()).toBe(expected);

    await runBenchmark(context, extreme, reference);
  });
});
