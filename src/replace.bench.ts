import { replace } from "@extremejs/utils";
import { replace as lodashReplace } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([1, 64])("%i repetitions", (size) => {
  const value = "a.b.".repeat(size);
  const pattern = /\./g;

  const expected = "a!b!".repeat(size);

  test("replace all dots with a global expression", async context => benchmark(context, expected, [
    {
      run: (): string => replace(value, pattern, "!", true),
    },
    {
      name: "lodash",
      run : (): string => lodashReplace(value, pattern, "!"),
    },
  ]));
});
