import { upperCase } from "@extremejs/utils";
import { toUpper as lodashToUpper } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "http-école_42 ".repeat(size);

  const expected = "HTTP-ÉCOLE_42 ".repeat(size);

  test("case Unicode text with punctuation", async context => benchmark(context, expected, [
    {
      run: (): string => upperCase(value),
    },
    {
      name: "lodash",
      run : (): string => lodashToUpper(value),
    },
  ]));
});
