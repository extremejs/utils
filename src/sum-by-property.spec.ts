import { sumByProperty } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return the sum of the elements provided by the value at the specified property", () => {
  expect(sumByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(6);

  expect(sumByProperty([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
    .toBe(6);

  expect(sumByProperty([{ a: { b: 8 } }, { a: {} }, {}], "a.b"))
    .toBe(8);
});

describe("lodash compatibility", () => {
  it("should accept a key, a nested path, or an array index as a property shorthand", () => {
    const values = [{ a: { b: 2 } }, { a: { b: 3 } }, { a: { b: 1 } }];
    const rows = [[2], [3], [1]];
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

    expect(sumByProperty(objects, "a")).toBe(6);
    expect(lodash.sumBy(objects, "a")).toBe(6);
    expect(sumByProperty(values, "a.b")).toBe(6);
    expect(lodash.sumBy(values, "a.b")).toBe(6);
    expect(sumByProperty(rows, "0")).toBe(6);
    expect(lodash.sumBy(rows, "0")).toBe(6);
  });

  it("should return zero for an empty array of records", () => {
    const values: Array<{ a: number; }> = [];

    expect(sumByProperty(values, "a")).toBe(0);
    expect(lodash.sumBy(values, "a")).toBe(0);
  });

  it("should return zero for an all-hole array", () => {
    const values: Array<{ a: number; }> = [];
    values.length = 2;

    expect(sumByProperty(values, "a")).toBe(0);
    expect(lodash.sumBy(values, "a")).toBeUndefined();
  });

  it("should propagate NaN from a numeric property", () => {
    const values = [{ a: 1 }, { a: Number.NaN }];

    expect(sumByProperty(values, "a")).toBeNaN();
    expect(lodash.sumBy(values, "a")).toBeNaN();
  });

  it("should treat missing or undefined properties as zero while Lodash skips them", () => {
    const values = [{ a: { b: 1 } }, {}, { a: {} }];
    const missing: Array<{ a: { b?: number; }; }> = [{ a: {} }];

    expect(sumByProperty(values, "a.b")).toBe(1);
    expect(lodash.sumBy(values, "a.b")).toBe(1);

    expect(sumByProperty(missing, "a.b")).toBe(0);
    expect(lodash.sumBy(missing, "a.b")).toBeUndefined();
  });

  it("should treat null properties as zero while Lodash sums null as a value", () => {
    const values = [{ a: null }];

    expect(sumByProperty(values, "a")).toBe(0);
    expect(lodash.sumBy(values, "a")).toBeNull();
  });

  it("should traverse a dotted path while Lodash prefers a matching literal key", () => {
    const values = [
      {
        "a.b": 1,
        "a"  : { b: 2 },
      },
    ];

    expect(sumByProperty(values, "a.b")).toBe(2);
    expect(lodash.sumBy(values, "a.b")).toBe(1);
  });

  it("should start at positive zero while Lodash starts at the first defined value", () => {
    const values = [{ a: -0 }];

    expect(sumByProperty(values, "a")).toBe(0);
    expect(lodash.sumBy(values, "a")).toBe(-0);
  });
});
