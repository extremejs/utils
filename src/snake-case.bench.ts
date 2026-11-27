import { snakeCase } from "@extremejs/utils";
import { snakeCase as lodashSnakeCase } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "déjà XML2Parser 👩🏽‍💻 42nd ".repeat(size);

  const expected = `${ "deja_xml_2_parser_👩🏽‍💻_42nd_".repeat(size - 1) }deja_xml_2_parser_👩🏽‍💻_42nd`;

  test("format accents, acronyms, joined emoji, and ordinals", async context => benchmark(context, expected, [
    {
      run: (): string => snakeCase(value),
    },
    {
      name: "lodash",
      run : (): string => lodashSnakeCase(value),
    },
  ]));
});
