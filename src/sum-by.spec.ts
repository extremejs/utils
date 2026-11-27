import { identity, sumBy, sumByFn } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

describe("with property as iteratee", () => {
  it("should return the sum of the provided direct property", () => {
    expect(sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(6);
  });

  it("should return the sum of the provided nested property", () => {
    expect(sumBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
      .toBe(6);
  });
});

describe("with function as iteratee", () => {
  it("should return the sum of the elements", () => {
    expect(sumBy([1, 2, 3], number => number)).toBe(6);
  });

  it("should return the sum of the provided direct property", () => {
    expect(sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(6);
  });

  it("should return the sum of the provided nested property", () => {
    expect(sumBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
      .toBe(6);
  });
});

describe("lodash compatibility", () => {
  it.each([
    ["sumBy", sumBy<{ a: number; }>],
    ["sumByFn", sumByFn<{ a: number; }>],
    ["Lodash sumBy", lodash.sumBy<{ a: number; }>],
  ] as const)("%s should sum values returned by a unary callback", (_, sum) => {
    const values = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const iteratee = vi.fn(({ a }: { a: number; }) => a);

    expect(sum(values, iteratee)).toBe(6);
    expect(iteratee.mock.calls).toEqual([[values[0]], [values[1]], [values[2]]]);
  });

  it("should accept a key, a nested path, or an array index as a property shorthand", () => {
    const values = [{ a: { b: 2 } }, { a: { b: 3 } }, { a: { b: 1 } }];
    const rows = [[2], [3], [1]];
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

    expect(sumBy(objects, "a")).toBe(6);
    expect(lodash.sumBy(objects, "a")).toBe(6);
    expect(sumBy(values, "a.b")).toBe(6);
    expect(lodash.sumBy(values, "a.b")).toBe(6);
    expect(sumBy(rows, "0")).toBe(6);
    expect(lodash.sumBy(rows, "0")).toBe(6);
  });

  it("should return zero for an empty array with either iteratee form", () => {
    const values: Array<{ a: number; }> = [];
    const iteratee = vi.fn(({ a }: { a: number; }) => a);

    expect(sumBy(values, iteratee)).toBe(0);
    expect(lodash.sumBy(values, iteratee)).toBe(0);
    expect(sumBy(values, "a")).toBe(0);
    expect(lodash.sumBy(values, "a")).toBe(0);
    expect(iteratee).not.toHaveBeenCalled();
  });

  it("should sum numbers and propagate NaN with an explicit identity callback", () => {
    expect(sumBy([6, 4, 2], identity)).toBe(12);
    expect(lodash.sumBy([6, 4, 2], identity)).toBe(12);
    expect(sumBy([1, Number.NaN], identity)).toBeNaN();
    expect(lodash.sumBy([1, Number.NaN], identity)).toBeNaN();
  });

  it("should treat missing properties as zero while Lodash skips them", () => {
    const values: Array<{ a?: number; }> = [{ a: 1 }, {}];
    const missing: Array<{ a?: number; }> = [{}];

    expect(sumBy(values, "a")).toBe(1);
    expect(lodash.sumBy(values, "a")).toBe(1);
    expect(sumBy(missing, "a")).toBe(0);
    expect(lodash.sumBy(missing, "a")).toBeUndefined();
  });

  it("should return zero for an all-hole array with a property selector", () => {
    const values: Array<{ a: number; }> = [];
    values.length = 2;

    expect(sumBy(values, "a")).toBe(0);
    expect(lodash.sumBy(values, "a")).toBeUndefined();
  });

  it("should propagate NaN from a numeric property", () => {
    const values = [{ a: 1 }, { a: Number.NaN }];

    expect(sumBy(values, "a")).toBeNaN();
    expect(lodash.sumBy(values, "a")).toBeNaN();
  });

  it("should treat null properties as zero while Lodash sums null as a value", () => {
    const values: Array<{ a: number | null; }> = [{ a: null }];

    expect(sumBy(values, "a")).toBe(0);
    expect(lodash.sumBy(values, "a")).toBeNull();
  });

  it("should traverse a dotted path while Lodash prefers a matching literal key", () => {
    const values = [
      {
        "a.b": 1,
        "a"  : { b: 2 },
      },
    ];

    expect(sumBy(values, "a.b")).toBe(2);
    expect(lodash.sumBy(values, "a.b")).toBe(1);
  });

  it("should skip array holes while Lodash passes undefined to the callback", () => {
    const values: number[] = [];
    values[1] = 4;

    const iteratee = vi.fn((value: number | undefined) => value ?? 1);

    expect(sumBy(values, iteratee)).toBe(4);
    expect(lodash.sumBy(values, iteratee)).toBe(5);
  });

  it("should start at positive zero while Lodash starts at the first defined value", () => {
    const values = [{ a: -0 }];
    const iteratee = vi.fn(({ a }: { a: number; }) => a);

    expect(sumBy(values, iteratee)).toBe(0);
    expect(lodash.sumBy(values, iteratee)).toBe(-0);
    expect(sumBy(values, "a")).toBe(0);
    expect(lodash.sumBy(values, "a")).toBe(-0);
  });
});
