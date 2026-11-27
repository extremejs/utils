import { maxElementBy, minElementBy } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it, vi } from "vitest";

const extrema = [
  {
    select      : maxElementBy,
    lodashSelect: lodash.maxBy,
    sentinel    : -Infinity,
    betterScore : 1,
  },
  {
    select      : minElementBy,
    lodashSelect: lodash.minBy,
    sentinel    : Infinity,
    betterScore : -1,
  },
];

describe.each(extrema)("$select.name lodash compatibility", ({ select, lodashSelect, sentinel, betterScore }) => {
  it("should return the original winning record with a callback or a segment path", () => {
    const first = { stats: { score: 0 } };
    const winner: typeof first = { stats: { score: betterScore } };
    const tied: typeof first = { stats: { score: betterScore } };
    const values = [first, winner, tied] as const;
    const getScore = ({ stats }: typeof winner): number => stats.score;

    expect(select(values, getScore)).toBe(winner);
    expect(lodashSelect(values, getScore)).toBe(winner);
    expect(select(values, "stats.score")).toBe(winner);
    expect(lodashSelect(values, "stats.score")).toBe(winner);
    expect(select(values, ["stats", "score"])).toBe(winner);
    expect(select<typeof winner>(values, ["stats", "score"])).toBe(winner);
    expect(lodashSelect(values, lodash.property(["stats", "score"]))).toBe(winner);
    expect(lodashSelect(values, ["stats", "score"])).toBe(first);
    expectTypeOf(select<typeof winner>(values, "stats.score")).toEqualTypeOf<typeof winner | undefined>();
  });

  it.each([[-0, 0], [0, -0]] as const)("should keep the first record when %s and %s tie", (first, second) => {
    const values = [{ score: first }, { score: second }];

    expect(select(values, "score")).toBe(values[0]);
    expect(lodashSelect(values, "score")).toBe(values[0]);
  });

  it("should skip missing, nullish and NaN scores while accepting infinities", () => {
    const winner = { score: sentinel };
    const invalid: Array<{ score?: number | null; }> = [{}, { score: null }, { score: Number.NaN }];
    const mixed = [...invalid, winner, { score: sentinel }];

    expect(select(mixed, "score")).toBe(winner);
    expect(lodashSelect(mixed, "score")).toBe(winner);
    expect(select(invalid, "score")).toBeUndefined();
    expect(lodashSelect(invalid, "score")).toBeUndefined();
    expect(select(invalid.slice(0, 0), "score")).toBeUndefined();
  });

  it("should visit only present elements with a unary callback", () => {
    const values: Array<{ score: number; }> = [];
    values.length = 2;
    const winner = { score: 0 };
    const score = vi.fn((value: { score: number; } | undefined) => value?.score ?? -sentinel);

    expect(select(values, score)).toBeUndefined();
    expect(score).not.toHaveBeenCalled();

    values[1] = winner;
    expect(select(values, score)).toBe(winner);
    expect(score.mock.calls).toEqual([[winner]]);

    score.mockClear();
    expect(lodashSelect(values, score)).toBeUndefined();

    // oxlint-disable-next-line eslint/no-undefined -- Lodash calls the selector for the hole.
    expect(score.mock.calls).toEqual([[undefined], [winner]]);
  });
});

it.each(extrema)("should require a numeric selector with $select.name", ({ select }) => {
  const values = [{ stats: { score: 1 } }];

  expectTypeOf(() => {
    // @ts-expect-error The callback must return a number.
    select(values, () => "score");

    // @ts-expect-error An object property is not a numeric score.
    select(values, ["stats"]);
  }).toBeFunction();
});
