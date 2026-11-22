/* oxlint-disable eslint/no-undefined -- Distinguish explicit undefined, omitted defaults, and sparse holes. */

import { slice } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should create a slice of the value from start, up to, but not including, end", () => {
  expect(slice([0, 1, 2, 3, 4, 5])).toEqual([0, 1, 2, 3, 4, 5]);

  expect(slice([0, 1, 2, 3, 4, 5], 2)).toEqual([2, 3, 4, 5]);

  expect(slice([0, 1, 2, 3, 4, 5], 2, 5)).toEqual([2, 3, 4]);

  expect(slice("012345")).toBe("012345");

  expect(slice("012345", 2)).toBe("2345");

  expect(slice("012345", 2, 4)).toBe("23");
});

describe("lodash compatibility", () => {
  it.each([
    [undefined, undefined, [1, 2, 3]],
    [1, undefined, [2, 3]],
    [1, 3, [2, 3]],
    [3, undefined, []],
    [4, undefined, []],
    [2 ** 32, undefined, []],
    [Infinity, undefined, []],
    [0, undefined, [1, 2, 3]],
    [Number.NaN, undefined, [1, 2, 3]],
    [-1, undefined, [3]],
    [-3, undefined, [1, 2, 3]],
    [-4, undefined, [1, 2, 3]],
    [-Infinity, undefined, [1, 2, 3]],
    [2, 2, []],
    [3, 2, []],
    [0, 1, [1]],
    [0, 4, [1, 2, 3]],
    [0, 2 ** 32, [1, 2, 3]],
    [0, Infinity, [1, 2, 3]],
    [0, 0, []],
    [0, Number.NaN, []],
    [0, -1, [1, 2]],
    [0, -3, []],
    [0, -4, []],
    [0, -Infinity, []],
    [0.1, 1.6, [1]],
  ])("creates a copy from %s up to %s", (start, end, expected) => {
    const values = [1, 2, 3];
    const local = slice(values, start, end);
    const upstream = lodash.slice(values, start, end);

    expect(local).toStrictEqual(expected);
    expect(upstream).toStrictEqual(expected);
    expect(local).not.toBe(values);
    expect(upstream).not.toBe(values);
  });

  it("preserves array holes while Lodash fills them with undefined", () => {
    // oxlint-disable-next-line unicorn/no-new-array -- Create a sparse array with this length.
    const values = new Array<number>(3);
    values[1] = 2;

    expect(slice(values)).toStrictEqual(values);
    expect(lodash.slice(values)).toStrictEqual([undefined, 2, undefined]);
  });

  it("keeps the string result while Lodash returns an array of code units", () => {
    expect(slice("123", 1, -1)).toBe("2");
    expect(lodash.slice("123", 1, -1)).toStrictEqual(["2"]);
  });
});
