import { minByProperty } from "@extremejs/utils";
import { get as lodashGet, minBy as lodashMinBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { points: size - index } }));
  const expected = 1;
  const path = "metrics.points";

  test("by property (Lodash looks up the winning score)", async context => benchmark(context, expected, [
    {
      run: (): number => minByProperty(values, path),
    },
    {
      name: "lodash",
      run : (): number | undefined => {
        const winner = lodashMinBy(values, path);

        return winner && lodashGet(winner, path);
      },
    },
  ]));
});
