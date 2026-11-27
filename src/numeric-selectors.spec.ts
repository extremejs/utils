import {
  maxBy,
  maxByFn,
  maxByProperty,
  meanBy,
  meanByFn,
  meanByProperty,
  minBy,
  minByFn,
  minByProperty,
  sumBy,
  sumByFn,
  sumByProperty,
} from "@extremejs/utils";
import { expect, expectTypeOf, it } from "vitest";

const aggregates = [
  {
    by        : sumBy,
    byFn      : sumByFn,
    byProperty: sumByProperty,
    expected  : 8,
  },
  {
    by        : meanBy,
    byFn      : meanByFn,
    byProperty: meanByProperty,
    expected  : 4,
  },
  {
    by        : minBy,
    byFn      : minByFn,
    byProperty: minByProperty,
    expected  : 2,
  },
  {
    by        : maxBy,
    byFn      : maxByFn,
    byProperty: maxByProperty,
    expected  : 6,
  },
];

it.each(aggregates)("should select numeric scores with $by.name", ({ by, byFn, byProperty, expected }) => {
  const key = Symbol("score");
  const values = [
    { "team.stats": [{ [key]: 2 }] },
    { "team.stats": [{ [key]: 6 }] },
  ];
  const path = ["team.stats", 0, key] as const;

  expect(by(values, path)).toBe(expected);
  expect(by<typeof values[number]>(values, path)).toBe(expected);
  expect(byProperty(values, path)).toBe(expected);
  expect(byProperty<typeof values[number]>(values, path)).toBe(expected);
  expect(byFn(values, record => record["team.stats"][0]?.[key] ?? 0)).toBe(expected);
});

it.each(aggregates)("should require a typed numeric selector with $by.name", ({ by, byFn, byProperty }) => {
  interface Row {
    stats?: {
      score: number | null;
      mixed: number | string;
    };
  }

  const values: Array<Row | null> = [
    {
      stats: {
        score: 6,
        mixed: "six",
      },
    },
    {},
    null,
  ];

  expectTypeOf(by<Row | null>(values, "stats[score]")).toEqualTypeOf<number>();
  expectTypeOf(byProperty(values, ["stats", "score"])).toEqualTypeOf<number>();
  expectTypeOf(by(values, value => value?.stats?.score ?? 0)).toEqualTypeOf<number>();

  expectTypeOf(() => {
    // @ts-expect-error A selector is required.
    by(values);

    // @ts-expect-error The callback must return a number.
    by(values, () => "six");

    // @ts-expect-error Callback results cannot be nullish.
    byFn(values, value => value?.stats?.score);

    // @ts-expect-error Every non-nullish value at the selected path must be numeric.
    byProperty(values, "stats.mixed");

    // @ts-expect-error The general selector also rejects a nonnumeric path.
    by(values, "stats.mixed");

    // @ts-expect-error The path is missing from the record type.
    byProperty(values, ["stats", "missing"]);

    // @ts-expect-error An empty segment array selects no property.
    by(values, []);
  }).toBeFunction();
});
