import { identity, meanBy } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

describe("with property as iteratee", () => {
  it("should return the NaN", () => {
    expect(meanBy<{ a: number; }>([], "a")).toBeNaN();
  });

  it("should return the mean of the provided direct property", () => {
    expect(meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(2);
  });

  it("should return the mean of the provided nested property", () => {
    expect(meanBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
      .toBe(2);
  });
});

describe("with function as iteratee", () => {
  it("should return the NaN", () => {
    expect(meanBy<number>([], number => number)).toBeNaN();
  });

  it("should return the mean of the elements", () => {
    expect(meanBy([1, 2, 3], number => number)).toBe(2);
  });

  it("should return the mean of the provided direct property", () => {
    expect(meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(2);
  });

  it("should return the mean of the provided nested property", () => {
    expect(meanBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
      .toBe(2);
  });
});

describe("lodash compatibility", () => {
  it("should average the numbers returned by a unary callback", () => {
    const values = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const iteratee = vi.fn((value: { a: number; }) => value.a);

    expect(meanBy(values, iteratee)).toBe(2);
    expect(iteratee.mock.calls).toEqual([[values[0]], [values[1]], [values[2]]]);
    iteratee.mockClear();
    expect(lodash.meanBy(values, iteratee)).toBe(2);
    expect(iteratee.mock.calls).toEqual([[values[0]], [values[1]], [values[2]]]);
  });

  it("should return NaN for empty arrays or a NaN score", () => {
    expect(meanBy([], identity<number>)).toBeNaN();
    expect(lodash.meanBy([], identity<number>)).toBeNaN();
    expect(meanBy([1, Number.NaN], identity)).toBeNaN();
    expect(lodash.meanBy([1, Number.NaN], identity)).toBeNaN();
  });

  it("should divide by full length while skipping sparse callback calls", () => {
    const values = [4];
    values.length = 2;
    const fallback = 2;
    const iteratee = (value: number | undefined): number => value ?? fallback;

    expect(meanBy(values, iteratee)).toBe(2);
    expect(lodash.meanBy(values, iteratee)).toBe(3);
  });

  it("should accept direct keys, nested paths, and array indices", () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const records = [{ a: { b: 2 } }, { a: { b: 3 } }, { a: { b: 1 } }];
    const rows = [[2], [3], [1]];

    expect(meanBy(objects, "a")).toBe(2);
    expect(lodash.meanBy(objects, "a")).toBe(2);
    expect(meanBy(records, "a.b")).toBe(2);
    expect(lodash.meanBy(records, "a.b")).toBe(2);
    expect(meanBy(rows, "0")).toBe(2);
    expect(lodash.meanBy(rows, "0")).toBe(2);
  });

  it("should traverse a dotted path while Lodash prefers a matching literal key", () => {
    const values = [
      {
        "a.b": 1,
        "a"  : { b: 2 },
      },
      { a: { b: 1.5 } },
    ];

    expect(meanBy(values, "a.b")).toBe(1.75);
    expect(lodash.meanBy(values, "a.b")).toBe(1.25);
  });

  it("should handle missing and nullish properties", () => {
    const values: Array<{ a?: number | null; }> = [{ a: 3 }, { a: null }, {}];
    const missing: Array<{ a?: number; }> = [{}];

    expect(meanBy(values, "a")).toBe(1);
    expect(lodash.meanBy(values, "a")).toBe(1);
    expect(meanBy(missing, "a")).toBe(0);
    expect(lodash.meanBy(missing, "a")).toBeNaN();
  });

  it("should return NaN when there are no elements", () => {
    const values: Array<{ a: number; }> = [];

    expect(meanBy(values, "a")).toBe(Number.NaN);
    expect(lodash.meanBy(values, "a")).toBeNaN();
  });

  it("should propagate a NaN property", () => {
    const values = [{ a: Number.NaN }, { a: 2 }];

    expect(meanBy(values, "a")).toBeNaN();
    expect(lodash.meanBy(values, "a")).toBeNaN();
  });

  it("should average negative zero as positive zero while Lodash preserves the sign", () => {
    expect(meanBy([-0], identity)).toBe(0);
    expect(lodash.meanBy([-0], identity)).toBe(-0);
    expect(meanBy([{ score: -0 }], "score")).toBe(0);
    expect(lodash.meanBy([{ score: -0 }], "score")).toBe(-0);
  });
});
