/* oxlint-disable eslint/no-undefined -- Distinguish explicit undefined, omitted defaults, and sparse holes. */

import { drop } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

it("should drop the first element", () => {
  expect(drop([1, 2, 3])).toEqual([2, 3]);
  expect(drop([1, 2, 3], 1)).toEqual([2, 3]);

  expect(drop("123")).toEqual("23");
  expect(drop("123", 1)).toEqual("23");
});

it("should drop the first two elements", () => {
  expect(drop([1, 2, 3], 2)).toEqual([3]);

  expect(drop("123", 2)).toEqual("3");
});

it("should return an empty array/string when `n` >= `length`", () => {
  expect(drop([1, 2, 3], 3)).toEqual([]);
  expect(drop([1, 2, 3], 4)).toEqual([]);

  expect(drop("123", 3)).toEqual("");
  expect(drop("123", 4)).toEqual("");
});

it("types shortened tuple and string literal results as arrays and strings", () => {
  const tuple: [1, 2, 3] = [1, 2, 3];

  expectTypeOf(drop(tuple)).toEqualTypeOf<Array<1 | 2 | 3>>();
  expectTypeOf(drop("123")).toEqualTypeOf<string>();
  expectTypeOf<ReturnType<typeof drop<"123" | number[]>>>().toEqualTypeOf<string | number[]>();
});

describe("lodash compatibility", () => {
  it.each([
    [undefined, [2, 3]],
    [2, [3]],
    [0, [1, 2, 3]],
    [3, []],
    [4, []],
    [2 ** 32, []],
  ])("drops from the start with count %s", (count, expected) => {
    expect(drop([1, 2, 3], count)).toStrictEqual(expected);
    expect(lodash.drop([1, 2, 3], count)).toStrictEqual(expected);
  });

  it("keeps the string result while Lodash returns an array of code units", () => {
    expect(drop("123", 2)).toBe("3");
    expect(lodash.drop("123", 2)).toStrictEqual(["3"]);
  });

  it("preserves retained holes while Lodash fills them with undefined", () => {
    const values: number[] = [];
    values[2] = 2;
    const expected: number[] = [];
    expected[1] = 2;

    expect(drop(values)).toStrictEqual(expected);
    expect(lodash.drop(values)).toStrictEqual([undefined, 2]);
  });
});
