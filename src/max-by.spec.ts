import { maxBy } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

describe("with property as iteratee", () => {
  it("should return the maximum of the provided direct property", () => {
    expect(maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(3);
  });

  it("should return the maximum of the provided nested property", () => {
    expect(maxBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
      .toBe(3);
  });

  it("should return the maximum of the provided property while considering missing values as -Infinity", () => {
    expect(maxBy([{ a: { b: 8 } }, { a: {} }, {}], "a.b"))
      .toBe(8);
  });
});

describe("with function as iteratee", () => {
  it("should return the -Infinity", () => {
    expect(maxBy<number>([], number => number)).toBe(-Infinity);
  });

  it("should return the maximum of the elements", () => {
    expect(maxBy([1, 2, 3], number => number)).toBe(3);
  });

  it("should return the maximum of the provided direct property", () => {
    expect(maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(3);
  });

  it("should return the maximum of the provided nested property", () => {
    expect(maxBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
      .toBe(3);
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

    expect(maxBy(values, scorer)).toBe(-1);
    expect(scorer.mock.calls).toEqual([[1], [2], [3]]);
    scorer.mockClear();
    expect(lodash.maxBy(values, scorer)).toBe(1);
    expect(scorer.mock.calls).toEqual([[1], [2], [3]]);
  });

  it("should return an infinite score while Lodash returns the first tied element", () => {
    const values = [{ score: -Infinity }, { score: -Infinity }];

    expect(maxBy(values, selectScore)).toBe(-Infinity);
    expect(lodash.maxBy(values, selectScore)).toBe(values[0]);
    expect(maxBy([], selectScore)).toBe(-Infinity);
    expect(lodash.maxBy([], selectScore)).toBeUndefined();
  });

  it("should propagate a NaN score while Lodash skips it", () => {
    const values = [{ score: Number.NaN }, { score: 2 }];

    expect(maxBy(values, selectScore)).toBeNaN();
    expect(lodash.maxBy(values, selectScore)).toBe(values[1]);
  });

  it("should compute the score on a large array", () => {
    const values = Array.from({ length: 500_000 }, (_, index) => index);

    expect(maxBy(values, double)).toBe(999_998);
    expect(lodash.maxBy(values, double)).toBe(499_999);
  });

  it("should ignore custom array properties and skip holes while Lodash visits holes", () => {
    const values = Object.assign([1], { extra: 4 });
    values[2] = 3;
    const scorer = vi.fn((value: number | undefined) => value ?? 10);

    expect(maxBy(values, scorer)).toBe(3);
    expect(scorer.mock.calls).toEqual([[1], [3]]);
    scorer.mockClear();
    expect(lodash.maxBy(values, scorer)).toBeUndefined();

    // oxlint-disable-next-line eslint/no-undefined -- Lodash passes undefined for the hole.
    expect(scorer.mock.calls).toEqual([[1], [undefined], [3]]);
  });

  it("should accept direct keys, nested paths, and array indices", () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const records = [{ a: { b: 2 } }, { a: { b: 3 } }, { a: { b: 1 } }];
    const rows = [[2], [3], [1]];

    expect(maxBy(objects, "a")).toBe(3);
    expect(lodash.maxBy(objects, "a")).toBe(objects[1]);
    expect(maxBy(records, "a.b")).toBe(3);
    expect(lodash.maxBy(records, "a.b")).toBe(records[1]);
    expect(maxBy(rows, "0")).toBe(3);
    expect(lodash.maxBy(rows, "0")).toBe(rows[1]);
  });

  it("should traverse a dotted path while Lodash prefers a matching literal key", () => {
    const values = [
      {
        "a.b": 1,
        "a"  : { b: 2 },
      },
      { a: { b: 1.5 } },
    ];

    expect(maxBy(values, "a.b")).toBe(2);
    expect(lodash.maxBy(values, "a.b")).toBe(values[1]);
  });

  it("should handle missing and nullish properties", () => {
    const values: Array<{ a?: number | null; }> = [{ a: 3 }, { a: null }, {}];
    const missing: Array<{ a?: number; }> = [{}];

    expect(maxBy(values, "a")).toBe(3);
    expect(lodash.maxBy(values, "a")).toBe(values[0]);
    expect(maxBy(missing, "a")).toBe(-Infinity);
    expect(lodash.maxBy(missing, "a")).toBeUndefined();
  });

  it("should return an infinite sentinel when there are no elements", () => {
    const values: Array<{ a: number; }> = [];

    expect(maxBy(values, "a")).toBe(-Infinity);
    expect(lodash.maxBy(values, "a")).toBeUndefined();
  });

  it("should propagate a NaN property while Lodash skips it", () => {
    const values = [{ a: Number.NaN }, { a: 2 }];

    expect(maxBy(values, "a")).toBeNaN();
    expect(lodash.maxBy(values, "a")).toBe(values[1]);
  });

  it("should order signed zero scores while Lodash selects the first tied element", () => {
    const values = [{ score: -0 }, { score: 0 }];

    expect(maxBy(values, selectScore)).toBe(0);
    expect(lodash.maxBy(values, selectScore)?.score).toBe(-0);
    expect(maxBy(values, "score")).toBe(0);
    expect(lodash.maxBy(values, "score")?.score).toBe(-0);
  });
});
