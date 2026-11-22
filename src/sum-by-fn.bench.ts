import * as utils from "@extremejs/utils";
import lodash from "lodash";
import { describe, test } from "vitest";
import { SUM_BY_INPUT_SIZES, compareSumBy, sumByInput } from "../test/sum-by-benchmark.js";

const { sumByFn } = utils;
const { sumBy: lodashSumBy } = lodash;

describe.each(SUM_BY_INPUT_SIZES)("%i records", (size) => {
  const { expected, selectPoints, values } = sumByInput(size);

  test("sumByFn callback", async (context) => {
    await compareSumBy(context, {
      expected,
      extreme: () => sumByFn(values, selectPoints),
      lodash : () => lodashSumBy(values, selectPoints),
    });
  });
});
