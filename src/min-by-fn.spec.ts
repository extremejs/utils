import { minByFn } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

it("should return the minimum of the elements provided by the iteratee", () => {
  expect(minByFn([], number => number)).toBe(Infinity);

  expect(minByFn([1, 2, 3], number => number)).toBe(1);

  expect(minByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(1);

  expect(minByFn([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
    .toBe(1);
});

function selectScore(value: { score: number; }): number {
  return value.score;
}

function double(value: number): number {
  return value * 2;
}

describe("lodash compatibility", () => {
  it("should compute the score while Lodash returns the winning element", () => {
    const values = [1, 2, 3];
    const scorer = vi.fn((value: number) => -value);

    expect(minByFn(values, scorer)).toBe(-3);
    expect(scorer.mock.calls).toEqual([[1], [2], [3]]);
    scorer.mockClear();
    expect(lodash.minBy(values, scorer)).toBe(3);
    expect(scorer.mock.calls).toEqual([[1], [2], [3]]);
  });

  it("should return an infinite score while Lodash returns the first tied element", () => {
    const values = [{ score: Infinity }, { score: Infinity }];

    expect(minByFn(values, selectScore)).toBe(Infinity);
    expect(lodash.minBy(values, selectScore)).toBe(values[0]);
    expect(minByFn([], selectScore)).toBe(Infinity);
    expect(lodash.minBy([], selectScore)).toBeUndefined();
  });

  it("should propagate a NaN score while Lodash skips it", () => {
    const values = [{ score: Number.NaN }, { score: 2 }];

    expect(minByFn(values, selectScore)).toBeNaN();
    expect(lodash.minBy(values, selectScore)).toBe(values[1]);
  });

  it("should compute the score on a large array", () => {
    const values = Array.from({ length: 500_000 }, (_, index) => index);

    expect(minByFn(values, double)).toBe(0);
    expect(lodash.minBy(values, double)).toBe(0);
  });

  it("should ignore custom array properties and skip holes while Lodash visits holes", () => {
    const values = Object.assign([1], { extra: 4 });
    values[2] = 3;
    const scorer = vi.fn((value: number | undefined) => value ?? -10);

    expect(minByFn(values, scorer)).toBe(1);
    expect(scorer.mock.calls).toEqual([[1], [3]]);
    scorer.mockClear();
    expect(lodash.minBy(values, scorer)).toBeUndefined();

    // oxlint-disable-next-line eslint/no-undefined -- Lodash passes undefined for the hole.
    expect(scorer.mock.calls).toEqual([[1], [undefined], [3]]);
  });

  it("should order signed zero scores while Lodash selects the first tied element", () => {
    const values = [{ score: 0 }, { score: -0 }];

    expect(minByFn(values, selectScore)).toBe(-0);
    expect(lodash.minBy(values, selectScore)?.score).toBe(0);
  });
});
