import { fill } from "@extremejs/utils";
import { fill as lodashFill } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, () => 1);
  const start = size / 4;
  const end = size - start;
  const expected = Array.from({ length: size }, (_, index) => (index >= start && index < end ? 0 : 1));

  test("copy a numeric array and fill its middle half", async context => benchmark(context, expected, [
    {
      run: (): number[] => fill([...values], 0, start, end),
    },
    {
      name: "lodash",
      run : (): number[] => lodashFill([...values], 0, start, end),
    },
  ]));
});
