import { split } from "@extremejs/utils";
import { split as lodashSplit } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = `${ "a,b,c,".repeat(size - 1) }a,b,c`;
  const expected = Array.from({ length: size }, () => ["a", "b", "c"]).flat();

  test("split delimited text with an explicit separator", async context => benchmark(context, expected, [
    {
      run: (): string[] => split(value, ","),
    },
    {
      name: "lodash",
      run : (): string[] => lodashSplit(value, ","),
    },
  ]));
});
