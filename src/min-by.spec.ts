import { minBy } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

describe("with property as iteratee", () => {
  it("should return the minimum of the provided direct property", () => {
    expect(minBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(1);
  });

  it("should return the minimum of the provided nested property", () => {
    expect(minBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
      .toBe(1);
  });

  it("should return the minimum of the provided property while considering missing values as Infinity", () => {
    expect(minBy([{ a: { b: 8 } }, { a: {} }, {}], "a.b"))
      .toBe(8);
  });
});

describe("with function as iteratee", () => {
  it("should return the Infinity", () => {
    expect(minBy<number>([], number => number)).toBe(Infinity);
  });

  it("should return the minimum of the elements", () => {
    expect(minBy([1, 2, 3], number => number)).toBe(1);
  });

  it("should return the minimum of the provided direct property", () => {
    expect(minBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(1);
  });

  it("should return the minimum of the provided nested property", () => {
    expect(minBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
      .toBe(1);
  });
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

    expect(minBy(values, scorer)).toBe(-3);
    expect(scorer.mock.calls).toEqual([[1], [2], [3]]);
    scorer.mockClear();
    expect(lodash.minBy(values, scorer)).toBe(3);
    expect(scorer.mock.calls).toEqual([[1], [2], [3]]);
  });

  it("should return an infinite score while Lodash returns the first tied element", () => {
    const values = [{ score: Infinity }, { score: Infinity }];

    expect(minBy(values, selectScore)).toBe(Infinity);
    expect(lodash.minBy(values, selectScore)).toBe(values[0]);
    expect(minBy([], selectScore)).toBe(Infinity);
    expect(lodash.minBy([], selectScore)).toBeUndefined();
  });

  it("should propagate a NaN score while Lodash skips it", () => {
    const values = [{ score: Number.NaN }, { score: 2 }];

    expect(minBy(values, selectScore)).toBeNaN();
    expect(lodash.minBy(values, selectScore)).toBe(values[1]);
  });

  it("should compute the score on a large array", () => {
    const values = Array.from({ length: 500_000 }, (_, index) => index);

    expect(minBy(values, double)).toBe(0);
    expect(lodash.minBy(values, double)).toBe(0);
  });

  it("should ignore custom array properties and skip holes while Lodash visits holes", () => {
    const values = Object.assign([1], { extra: 4 });
    values[2] = 3;
    const scorer = vi.fn((value: number | undefined) => value ?? -10);

    expect(minBy(values, scorer)).toBe(1);
    expect(scorer.mock.calls).toEqual([[1], [3]]);
    scorer.mockClear();
    expect(lodash.minBy(values, scorer)).toBeUndefined();

    // oxlint-disable-next-line eslint/no-undefined -- Lodash passes undefined for the hole.
    expect(scorer.mock.calls).toEqual([[1], [undefined], [3]]);
  });

  it("should accept direct keys, nested paths, and array indices", () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const records = [{ a: { b: 2 } }, { a: { b: 3 } }, { a: { b: 1 } }];
    const rows = [[2], [3], [1]];

    expect(minBy(objects, "a")).toBe(1);
    expect(lodash.minBy(objects, "a")).toBe(objects[2]);
    expect(minBy(records, "a.b")).toBe(1);
    expect(lodash.minBy(records, "a.b")).toBe(records[2]);
    expect(minBy(rows, "0")).toBe(1);
    expect(lodash.minBy(rows, "0")).toBe(rows[2]);
  });

  it("should traverse a dotted path while Lodash prefers a matching literal key", () => {
    const values = [
      {
        "a.b": 1,
        "a"  : { b: 2 },
      },
      { a: { b: 1.5 } },
    ];

    expect(minBy(values, "a.b")).toBe(1.5);
    expect(lodash.minBy(values, "a.b")).toBe(values[0]);
  });

  it("should handle missing and nullish properties", () => {
    const values: Array<{ a?: number | null; }> = [{ a: 3 }, { a: null }, {}];
    const missing: Array<{ a?: number; }> = [{}];

    expect(minBy(values, "a")).toBe(3);
    expect(lodash.minBy(values, "a")).toBe(values[0]);
    expect(minBy(missing, "a")).toBe(Infinity);
    expect(lodash.minBy(missing, "a")).toBeUndefined();
  });

  it("should return an infinite sentinel when there are no elements", () => {
    const values: Array<{ a: number; }> = [];

    expect(minBy(values, "a")).toBe(Infinity);
    expect(lodash.minBy(values, "a")).toBeUndefined();
  });

  it("should propagate a NaN property while Lodash skips it", () => {
    const values = [{ a: Number.NaN }, { a: 2 }];

    expect(minBy(values, "a")).toBeNaN();
    expect(lodash.minBy(values, "a")).toBe(values[1]);
  });

  it("should order signed zero scores while Lodash selects the first tied element", () => {
    const values = [{ score: 0 }, { score: -0 }];

    expect(minBy(values, selectScore)).toBe(-0);
    expect(lodash.minBy(values, selectScore)?.score).toBe(0);
    expect(minBy(values, "score")).toBe(-0);
    expect(lodash.minBy(values, "score")?.score).toBe(0);
  });
});
