import { head } from "@extremejs/utils";
import { initial as lodashInitial } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, (_, index) => index);
  const expected = Array.from({ length: size - 1 }, (_, index) => index);

  test("copy a numeric array without its last element", async context => benchmark(context, expected, [
    {
      run: (): number[] => head(values),
    },
    {
      name: "lodash",
      run : (): number[] => lodashInitial(values),
    },
  ]));
});
