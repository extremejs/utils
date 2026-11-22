import * as utils from "@extremejs/utils";
import lodash from "lodash";
import { describe, test } from "vitest";
import { SUM_BY_INPUT_SIZES, compareSumBy, sumByInput } from "../test/sum-by-benchmark.js";

const { sumBy } = utils;
const { sumBy: lodashSumBy } = lodash;

describe.each(SUM_BY_INPUT_SIZES)("%i records", (size) => {
  const { expected, path, selectPoints, values } = sumByInput(size);

  test("sumBy callback", async (context) => {
    await compareSumBy(context, {
      expected,
      extreme: () => sumBy(values, selectPoints),
      lodash : () => lodashSumBy(values, selectPoints),
    });
  });

  test("sumBy property", async (context) => {
    await compareSumBy(context, {
      expected,
      extreme: () => sumBy(values, path),
      lodash : () => lodashSumBy(values, path),
    });
  });
});
