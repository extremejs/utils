import { maxByProperty } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return the maximum of the elements provided by the value at the specified property", () => {
  expect(maxByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(3);

  expect(maxByProperty([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
    .toBe(3);

  expect(maxByProperty([{ a: { b: 8 } }, { a: {} }, {}], "a.b"))
    .toBe(8);
});

describe("lodash compatibility", () => {
  it("should accept direct keys, nested paths, and array indices", () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const records = [{ a: { b: 2 } }, { a: { b: 3 } }, { a: { b: 1 } }];
    const rows = [[2], [3], [1]];

    expect(maxByProperty(objects, "a")).toBe(3);
    expect(lodash.maxBy(objects, "a")).toBe(objects[1]);
    expect(maxByProperty(records, "a.b")).toBe(3);
    expect(lodash.maxBy(records, "a.b")).toBe(records[1]);
    expect(maxByProperty(rows, "0")).toBe(3);
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

    expect(maxByProperty(values, "a.b")).toBe(2);
    expect(lodash.maxBy(values, "a.b")).toBe(values[1]);
  });

  it("should handle missing and nullish properties", () => {
    const values: Array<{ a?: number | null; }> = [{ a: 3 }, { a: null }, {}];
    const missing: Array<{ a?: number; }> = [{}];

    expect(maxByProperty(values, "a")).toBe(3);
    expect(lodash.maxBy(values, "a")).toBe(values[0]);
    expect(maxByProperty(missing, "a")).toBe(-Infinity);
    expect(lodash.maxBy(missing, "a")).toBeUndefined();
  });

  it("should return an infinite sentinel when there are no elements", () => {
    const values: Array<{ a: number; }> = [];

    expect(maxByProperty(values, "a")).toBe(-Infinity);
    expect(lodash.maxBy(values, "a")).toBeUndefined();
  });

  it("should propagate a NaN property while Lodash skips it", () => {
    const values = [{ a: Number.NaN }, { a: 2 }];

    expect(maxByProperty(values, "a")).toBeNaN();
    expect(lodash.maxBy(values, "a")).toBe(values[1]);
  });

  it("should order signed zero scores while Lodash selects the first tied element", () => {
    const values = [{ score: -0 }, { score: 0 }];

    expect(maxByProperty(values, "score")).toBe(0);
    expect(lodash.maxBy(values, "score")?.score).toBe(-0);
  });

  it("should compute an extreme property score on a large array", () => {
    const values = Array.from({ length: 500_000 }, (_, score) => ({ score }));

    expect(maxByProperty(values, "score")).toBe(499_999);
    expect(lodash.maxBy(values, "score")).toBe(values[499_999]);
  });
});
