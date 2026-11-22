import { snakeCase } from "@extremejs/utils";
import { snakeCase as lodashSnakeCase } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "safeHTML 42 Parser ".repeat(size);

  const expected = `${ "safe_html_42_parser_".repeat(size - 1) }safe_html_42_parser`;

  test("format ASCII words, acronyms, and digits", async context => benchmark(context, expected, [
    {
      run: (): string => snakeCase(value),
    },
    {
      name: "lodash",
      run : (): string => lodashSnakeCase(value),
    },
  ]));
});
