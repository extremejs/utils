import { capitalize } from "@extremejs/utils";
import { capitalize as lodashCapitalize } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "éCOLE-HTTP_42 ".repeat(size);

  const expected = `École-http_42 ${ "école-http_42 ".repeat(size - 1) }`;

  test("case Unicode text with punctuation", async context => benchmark(context, expected, [
    {
      run: (): string => capitalize(value),
    },
    {
      name: "lodash",
      run : (): string => lodashCapitalize(value),
    },
  ]));
});
