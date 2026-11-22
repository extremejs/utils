import { maxByFn } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

it("should return the maximum of the elements provided by the iteratee", () => {
  expect(maxByFn([], number => number)).toBe(-Infinity);

  expect(maxByFn([1, 2, 3], number => number)).toBe(3);

  expect(maxByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(3);

  expect(maxByFn([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
    .toBe(3);
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

    expect(maxByFn(values, scorer)).toBe(-1);
    expect(scorer.mock.calls).toEqual([[1], [2], [3]]);
    scorer.mockClear();
    expect(lodash.maxBy(values, scorer)).toBe(1);
    expect(scorer.mock.calls).toEqual([[1], [2], [3]]);
  });

  it("should return an infinite score while Lodash returns the first tied element", () => {
    const values = [{ score: -Infinity }, { score: -Infinity }];

    expect(maxByFn(values, selectScore)).toBe(-Infinity);
    expect(lodash.maxBy(values, selectScore)).toBe(values[0]);
    expect(maxByFn([], selectScore)).toBe(-Infinity);
    expect(lodash.maxBy([], selectScore)).toBeUndefined();
  });

  it("should propagate a NaN score while Lodash skips it", () => {
    const values = [{ score: Number.NaN }, { score: 2 }];

    expect(maxByFn(values, selectScore)).toBeNaN();
    expect(lodash.maxBy(values, selectScore)).toBe(values[1]);
  });

  it("should compute the score on a large array", () => {
    const values = Array.from({ length: 500_000 }, (_, index) => index);

    expect(maxByFn(values, double)).toBe(999_998);
    expect(lodash.maxBy(values, double)).toBe(499_999);
  });

  it("should ignore custom array properties and skip holes while Lodash visits holes", () => {
    const values = Object.assign([1], { extra: 4 });
    values[2] = 3;
    const scorer = vi.fn((value: number | undefined) => value ?? 10);

    expect(maxByFn(values, scorer)).toBe(3);
    expect(scorer.mock.calls).toEqual([[1], [3]]);
    scorer.mockClear();
    expect(lodash.maxBy(values, scorer)).toBeUndefined();

    // oxlint-disable-next-line eslint/no-undefined -- Lodash passes undefined for the hole.
    expect(scorer.mock.calls).toEqual([[1], [undefined], [3]]);
  });

  it("should order signed zero scores while Lodash selects the first tied element", () => {
    const values = [{ score: -0 }, { score: 0 }];

    expect(maxByFn(values, selectScore)).toBe(0);
    expect(lodash.maxBy(values, selectScore)?.score).toBe(-0);
  });
});
