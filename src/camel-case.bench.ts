import { camelCase } from "@extremejs/utils";
import { camelCase as lodashCamelCase } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "safeHTML 42 Parser ".repeat(size);

  const expected = `safeHtml42Parser${ "SafeHtml42Parser".repeat(size - 1) }`;

  test("format ASCII words, acronyms, and digits", async context => benchmark(context, expected, [
    {
      run: (): string => camelCase(value),
    },
    {
      name: "lodash",
      run : (): string => lodashCamelCase(value),
    },
  ]));
});
