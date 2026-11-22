import { lowerCase } from "@extremejs/utils";
import { toLower as lodashToLower } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "HTTP-École_42 ".repeat(size);

  const expected = "http-école_42 ".repeat(size);

  test("case Unicode text with punctuation", async context => benchmark(context, expected, [
    {
      run: (): string => lowerCase(value),
    },
    {
      name: "lodash",
      run : (): string => lodashToLower(value),
    },
  ]));
});
