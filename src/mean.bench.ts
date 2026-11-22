import { mean } from "@extremejs/utils";
import { mean as lodashMean } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i numbers", (size) => {
  const values = Array.from({ length: size }, (_, index) => size - index);

  test("mean", async context => benchmark(context, (size + 1) / 2, [
    {
      run: (): number => mean(values),
    },
    {
      name: "lodash",
      run : (): number => lodashMean(values),
    },
  ]));
});
