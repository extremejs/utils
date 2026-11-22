import { meanByProperty } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return the mean of the elements provided by the value at the specified property", () => {
  expect(meanByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(2);

  expect(meanByProperty([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
    .toBe(2);

  expect(meanByProperty([{ a: { b: 9 } }, { a: {} }, {}], "a.b"))
    .toBe(3);

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  expect(meanByProperty([], "a" as never)).toBeNaN();
});

describe("lodash compatibility", () => {
  it("should accept direct keys, nested paths, and array indices", () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const records = [{ a: { b: 2 } }, { a: { b: 3 } }, { a: { b: 1 } }];
    const rows = [[2], [3], [1]];

    expect(meanByProperty(objects, "a")).toBe(2);
    expect(lodash.meanBy(objects, "a")).toBe(2);
    expect(meanByProperty(records, "a.b")).toBe(2);
    expect(lodash.meanBy(records, "a.b")).toBe(2);
    expect(meanByProperty(rows, "0")).toBe(2);
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

    expect(meanByProperty(values, "a.b")).toBe(1.75);
    expect(lodash.meanBy(values, "a.b")).toBe(1.25);
  });

  it("should handle missing and nullish properties", () => {
    const values: Array<{ a?: number | null; }> = [{ a: 3 }, { a: null }, {}];
    const missing: Array<{ a?: number; }> = [{}];

    expect(meanByProperty(values, "a")).toBe(1);
    expect(lodash.meanBy(values, "a")).toBe(1);
    expect(meanByProperty(missing, "a")).toBe(0);
    expect(lodash.meanBy(missing, "a")).toBeNaN();
  });

  it("should return NaN when there are no elements", () => {
    const values: Array<{ a: number; }> = [];

    expect(meanByProperty(values, "a")).toBe(Number.NaN);
    expect(lodash.meanBy(values, "a")).toBeNaN();
  });

  it("should propagate a NaN property", () => {
    const values = [{ a: Number.NaN }, { a: 2 }];

    expect(meanByProperty(values, "a")).toBeNaN();
    expect(lodash.meanBy(values, "a")).toBeNaN();
  });

  it("should average negative zero as positive zero while Lodash preserves the sign", () => {
    expect(meanByProperty([{ score: -0 }], "score")).toBe(0);
    expect(lodash.meanBy([{ score: -0 }], "score")).toBe(-0);
  });
});
