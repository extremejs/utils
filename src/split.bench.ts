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

  const unicode = "a👩🏽‍💻🇮🇷".repeat(size);
  const symbols = Array.from({ length: size }, () => ["a", "👩🏽‍💻", "🇮🇷"]).flat();

  test("split joined emoji and flags with an empty separator", async context => benchmark(context, symbols, [
    {
      run: (): string[] => split(unicode, ""),
    },
    {
      name: "lodash",
      run : (): string[] => lodashSplit(unicode, ""),
    },
  ]));

  test("take the first two Unicode symbols with an empty separator and limit", async context => benchmark(
    context,
    ["a", "👩🏽‍💻"],
    [
      {
        run: (): string[] => split(unicode, "", 2),
      },
      {
        name: "lodash",
        run : (): string[] => lodashSplit(unicode, "", 2),
      },
    ],
  ));
});
