import { maxByProperty } from "@extremejs/utils";
import { get as lodashGet, maxBy as lodashMaxBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: size - index } }));
  const expected = size;
  const path = "metrics.points";

  test("by property (Lodash looks up the winning score)", async context => benchmark(context, expected, [
    {
      run: (): number => maxByProperty(values, path),
    },
    {
      name: "lodash",
      run : (): number | undefined => {
        const winner = lodashMaxBy(values, path);

        return winner && lodashGet(winner, path);
      },
    },
  ]));
});
