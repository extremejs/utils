import { max } from "@extremejs/utils";
import { max as lodashMax } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i numbers", (size) => {
  const values = Array.from({ length: size }, (_, index) => size - index);

  test("max", async context => benchmark(context, size, [
    {
      run: (): number => max(values),
    },
    {
      name: "lodash",
      run : (): number | undefined => lodashMax(values),
    },
  ]));
});
