import { repeat } from "@extremejs/utils";
import { repeat as lodashRepeat } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([2, 64])("%i repetitions", (size) => {
  const value = "🚀abc";

  const expected = "🚀abc".repeat(size);

  test("repeat a string with an explicit count", async context => benchmark(context, expected, [
    {
      run: (): string => repeat(value, size),
    },
    {
      name: "lodash",
      run : (): string => lodashRepeat(value, size),
    },
  ]));
});
