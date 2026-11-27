import { maxElementBy, minElementBy } from "@extremejs/utils";
import { maxBy as lodashMaxBy, minBy as lodashMinBy } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

function selectScore({ metrics }: { metrics: { score: number; }; }): number {
  return metrics.score;
}

describe.each([32, 2048])("%i records", (size) => {
  const values = Array.from({ length: size }, (_, index) => ({ metrics: { score: index + 1 } }));
  const path = "metrics.score";

  describe.each([
    {
      select      : maxElementBy,
      lodashSelect: lodashMaxBy,
      expected    : values.at(-1),
    },
    {
      select      : minElementBy,
      lodashSelect: lodashMinBy,
      expected    : values[0],
    },
  ])("$select.name", ({ select, lodashSelect, expected }) => {
    test("by callback", async context => benchmark(context, expected, [
      { run: () => select(values, selectScore) },
      {
        name: "lodash",
        run : () => lodashSelect(values, selectScore),
      },
    ]));

    test("by property", async context => benchmark(context, expected, [
      { run: () => select(values, path) },
      {
        name: "lodash",
        run : () => lodashSelect(values, path),
      },
    ]));
  });
});
