/* oxlint-disable typescript/no-confusing-void-expression -- Assert calls that return undefined. */

import { last } from "@extremejs/utils";
import { last as lodashLast } from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

it("should return the last element of the value", () => {
  expect(last([])).toBeUndefined();

  expect(last([0, 1, 2, 3, 4, 5])).toBe(5);

  expect(last("")).toBeUndefined();

  expect(last("012345")).toBe("5");
});

it("types array reads as possibly undefined and preserves known tuple endpoints", () => {
  const values: number[] = [];
  const tuple: [1, 2] = [1, 2];
  const empty: [] = [];

  expectTypeOf(last(values)).toEqualTypeOf<number | undefined>();
  expectTypeOf(last(tuple)).toEqualTypeOf<2>();
  expectTypeOf(last(empty)).toEqualTypeOf<undefined>();
  expectTypeOf(last("")).toEqualTypeOf<undefined>();
});

describe("lodash compatibility", () => {
  it("selects the final element or returns undefined for an ordinary empty array", () => {
    expect(last([1, 2, 3, 4])).toBe(4);
    expect(lodashLast([1, 2, 3, 4])).toBe(4);

    const empty: number[] = [];

    expect(last(empty)).toBeUndefined();
    expect(lodashLast(empty)).toBeUndefined();
  });

  it("ignores a negative index on an empty array", () => {
    const values = Object.assign([], { "-1": 42 });

    expect(last(values)).toBeUndefined();
    expect(lodashLast(values)).toBeUndefined();
  });

  it("returns undefined for a missing index on a nonempty array", () => {
    const values = [42];
    values.length = 2;

    expect(last(values)).toBeUndefined();
    expect(lodashLast(values)).toBeUndefined();
  });

  it("works as a unary selector in map", () => {
    const arrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    expect(arrays.map(last)).toStrictEqual([3, 6, 9]);
    expect(arrays.map(values => lodashLast(values))).toStrictEqual([3, 6, 9]);
  });

  it("selects the last UTF-16 code unit from a string", () => {
    expect(last("😀")).toBe("\uDE00");
    expect(lodashLast("😀")).toBe("\uDE00");
    expect(last("")).toBeUndefined();
    expect(lodashLast("")).toBeUndefined();
  });
});
