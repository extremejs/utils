import * as utils from "@extremejs/utils";
import lodash from "lodash";
import { describe, test } from "vitest";
import { SUM_BY_INPUT_SIZES, compareSumBy, sumByInput } from "../test/sum-by-benchmark.js";

const { sumByProperty } = utils;
const { sumBy: lodashSumBy } = lodash;

describe.each(SUM_BY_INPUT_SIZES)("%i records", (size) => {
  const { expected, path, values } = sumByInput(size);

  test("sumByProperty property", async (context) => {
    await compareSumBy(context, {
      expected,
      extreme: () => sumByProperty(values, path),
      lodash : () => lodashSumBy(values, path),
    });
  });
});
