import { kebabCase } from "@extremejs/utils";
import { kebabCase as lodashKebabCase } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "safeHTML 42 Parser ".repeat(size);

  const expected = `${ "safe-html-42-parser-".repeat(size - 1) }safe-html-42-parser`;

  test("format ASCII words, acronyms, and digits", async context => benchmark(context, expected, [
    {
      run: (): string => kebabCase(value),
    },
    {
      name: "lodash",
      run : (): string => lodashKebabCase(value),
    },
  ]));
});
