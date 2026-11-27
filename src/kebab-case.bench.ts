import { kebabCase } from "@extremejs/utils";
import { kebabCase as lodashKebabCase } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "déjà XML2Parser 👩🏽‍💻 42nd ".repeat(size);

  const expected = `${ "deja-xml-2-parser-👩🏽‍💻-42nd-".repeat(size - 1) }deja-xml-2-parser-👩🏽‍💻-42nd`;

  test("format accents, acronyms, joined emoji, and ordinals", async context => benchmark(context, expected, [
    {
      run: (): string => kebabCase(value),
    },
    {
      name: "lodash",
      run : (): string => lodashKebabCase(value),
    },
  ]));
});
