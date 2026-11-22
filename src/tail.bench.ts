import { tail } from "@extremejs/utils";
import { tail as lodashTail } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, (_, index) => index);
  const expected = Array.from({ length: size - 1 }, (_, index) => index + 1);

  test("copy a numeric array without its first element", async context => benchmark(context, expected, [
    {
      run: (): unknown => tail(values),
    },
    {
      name: "lodash",
      run : (): unknown => lodashTail(values),
    },
  ]));
});
