import { camelCase } from "@extremejs/utils";
import { camelCase as lodashCamelCase } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "déjà XML2Parser 👩🏽‍💻 42nd ".repeat(size);

  const expected = `dejaXml2Parser👩🏽‍💻42nd${ "DejaXml2Parser👩🏽‍💻42nd".repeat(size - 1) }`;

  test("format accents, acronyms, joined emoji, and ordinals", async context => benchmark(context, expected, [
    {
      run: (): string => camelCase(value),
    },
    {
      name: "lodash",
      run : (): string => lodashCamelCase(value),
    },
  ]));
});
