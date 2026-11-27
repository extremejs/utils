/* oxlint-disable typescript/no-confusing-void-expression -- Assert calls that return undefined. */

import { first } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

it("should return the first element of the value", () => {
  expect(first([])).toBeUndefined();

  expect(first([0, 1, 2, 3, 4, 5])).toBe(0);

  expect(first("")).toBeUndefined();

  expect(first("012345")).toBe("0");
});

it("types array reads as possibly undefined and preserves known tuple and string endpoints", () => {
  const values: number[] = [];
  const tuple: [1, 2] = [1, 2];
  const empty: [] = [];

  expectTypeOf(first(values)).toEqualTypeOf<number | undefined>();
  expectTypeOf(first(tuple)).toEqualTypeOf<1>();
  expectTypeOf(first(empty)).toEqualTypeOf<undefined>();
  expectTypeOf(first("abc")).toEqualTypeOf<"a">();
  expectTypeOf(first("")).toEqualTypeOf<undefined>();
  expectTypeOf<ReturnType<typeof first<`${ number }x`>>>().toEqualTypeOf<string | undefined>();
});

describe("lodash compatibility", () => {
  it("selects the first element like Lodash head and its first alias", () => {
    const values = [1, 2, 3, 4];
    const empty: number[] = [];

    expect(first(values)).toBe(1);
    expect(lodash.head(values)).toBe(1);
    expect(lodash.first).toBe(lodash.head);
    expect(first(empty)).toBeUndefined();
    expect(lodash.head(empty)).toBeUndefined();
  });

  it("ignores an inherited index on an empty array", () => {
    const values: number[] = [];
    Object.setPrototypeOf(values, { 0: 42 });

    expect(first(values)).toBeUndefined();
    expect(lodash.head(values)).toBeUndefined();
  });

  it("returns undefined for a missing index on a nonempty array", () => {
    const values: number[] = [];
    values[1] = 42;

    expect(first(values)).toBeUndefined();
    expect(lodash.head(values)).toBeUndefined();
  });

  it("works as a unary selector in map", () => {
    const arrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    expect(arrays.map(first)).toStrictEqual([1, 4, 7]);
    expect(arrays.map(values => lodash.head(values))).toStrictEqual([1, 4, 7]);
  });

  it("selects the first UTF-16 code unit from a string", () => {
    expect(first("😀")).toBe("\uD83D");
    expect(lodash.head("😀")).toBe("\uD83D");
    expect(first("")).toBeUndefined();
    expect(lodash.head("")).toBeUndefined();
  });
});
