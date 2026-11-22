import { compact } from "@extremejs/utils";
import { compact as lodashCompact } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, (_, index) => index % 2);
  const expected = Array.from({ length: size / 2 }, () => 1);

  test("filter zeroes from a numeric array", async context => benchmark(context, expected, [
    {
      run: (): number[] => compact(values),
    },
    {
      name: "lodash",
      run : (): number[] => lodashCompact(values),
    },
  ]));
});
