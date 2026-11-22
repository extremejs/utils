import { min } from "@extremejs/utils";
import { min as lodashMin } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i numbers", (size) => {
  const values = Array.from({ length: size }, (_, index) => size - index);

  test("min", async context => benchmark(context, 1, [
    {
      run: (): number => min(values),
    },
    {
      name: "lodash",
      run : (): number | undefined => lodashMin(values),
    },
  ]));
});
