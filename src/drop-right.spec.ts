/* oxlint-disable eslint/no-undefined -- Distinguish explicit undefined, omitted defaults, and sparse holes. */

import { dropRight } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

it("should drop the last element", () => {
  expect(dropRight([1, 2, 3])).toEqual([1, 2]);
  expect(dropRight([1, 2, 3], 1)).toEqual([1, 2]);

  expect(dropRight("123")).toEqual("12");
  expect(dropRight("123", 1)).toEqual("12");
});

it("should drop the last two elements", () => {
  expect(dropRight([1, 2, 3], 2)).toEqual([1]);

  expect(dropRight("123", 2)).toEqual("1");
});

it("should return an empty array/string when `n` >= `length`", () => {
  expect(dropRight([1, 2, 3], 3)).toEqual([]);
  expect(dropRight([1, 2, 3], 4)).toEqual([]);

  expect(dropRight("123", 3)).toEqual("");
  expect(dropRight("123", 4)).toEqual("");
});

it("types shortened tuple and string literal results as arrays and strings", () => {
  const tuple: [1, 2, 3] = [1, 2, 3];

  expectTypeOf(dropRight(tuple)).toEqualTypeOf<Array<1 | 2 | 3>>();
  expectTypeOf(dropRight("123")).toEqualTypeOf<string>();
  expectTypeOf<ReturnType<typeof dropRight<"123" | number[]>>>().toEqualTypeOf<string | number[]>();
});

describe("lodash compatibility", () => {
  it.each([
    [undefined, [1, 2]],
    [2, [1]],
    [0, [1, 2, 3]],
    [3, []],
    [4, []],
    [2 ** 32, []],
  ])("drops from the end with count %s", (count, expected) => {
    expect(dropRight([1, 2, 3], count)).toStrictEqual(expected);
    expect(lodash.dropRight([1, 2, 3], count)).toStrictEqual(expected);
  });

  it("keeps the string result while Lodash returns an array of code units", () => {
    expect(dropRight("123", 2)).toBe("1");
    expect(lodash.dropRight("123", 2)).toStrictEqual(["1"]);
  });

  it("preserves retained holes while Lodash fills them with undefined", () => {
    const values = [0];
    values[2] = 2;
    const expected = [0];
    expected.length = 2;

    expect(dropRight(values)).toStrictEqual(expected);
    expect(lodash.dropRight(values)).toStrictEqual([0, undefined]);
  });
});
