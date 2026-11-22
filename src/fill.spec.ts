/* oxlint-disable eslint/no-undefined -- Distinguish explicit undefined, omitted defaults, and sparse holes. */

import { fill } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should fill elements of array with value from start up to, but not including, end.", () => {
  expect(fill([1, 2, 3], 0)).toEqual([0, 0, 0]);

  expect(fill([1, 2, 3], 0, 1)).toEqual([1, 0, 0]);

  expect(fill([1, 2, 3], 0, 1, 2)).toEqual([1, 0, 3]);
});

describe("lodash compatibility", () => {
  it.each([
    [undefined, undefined, [0, 0, 0]],
    [1, undefined, [1, 0, 0]],
    [3, undefined, [1, 2, 3]],
    [4, undefined, [1, 2, 3]],
    [2 ** 32, undefined, [1, 2, 3]],
    [Infinity, undefined, [1, 2, 3]],
    [Number.NaN, undefined, [0, 0, 0]],
    [-1, undefined, [1, 2, 0]],
    [-3, undefined, [0, 0, 0]],
    [-4, undefined, [0, 0, 0]],
    [-Infinity, undefined, [0, 0, 0]],
    [2, 2, [1, 2, 3]],
    [3, 2, [1, 2, 3]],
    [0, 1, [0, 2, 3]],
    [0, 3, [0, 0, 0]],
    [0, 4, [0, 0, 0]],
    [0, 2 ** 32, [0, 0, 0]],
    [0, Infinity, [0, 0, 0]],
    [0, 0, [1, 2, 3]],
    [0, Number.NaN, [1, 2, 3]],
    [0, -1, [0, 0, 3]],
    [0, -3, [1, 2, 3]],
    [0, -4, [1, 2, 3]],
    [0, -Infinity, [1, 2, 3]],
    [0.1, 1.6, [0, 2, 3]],
  ])("fills the same input in place from %s to %s", (start, end, expected) => {
    const local = [1, 2, 3];
    const upstream = [1, 2, 3];

    expect(fill(local, 0, start, end)).toBe(local);
    expect(lodash.fill(upstream, 0, start, end)).toBe(upstream);
    expect(local).toStrictEqual(expected);
    expect(upstream).toStrictEqual(expected);
  });

  it("can fill holes with explicit undefined values", () => {
    // oxlint-disable-next-line unicorn/no-new-array -- Create a sparse array with this length.
    const local = new Array<number | undefined>(3);

    // oxlint-disable-next-line unicorn/no-new-array -- Create a sparse array with this length.
    const upstream = new Array<number | undefined>(3);
    const expected = [undefined, undefined, undefined];

    // oxlint-disable-next-line unicorn/no-useless-undefined -- Exercise filling with an explicit value.
    expect(fill(local, undefined)).toStrictEqual(expected);

    // oxlint-disable-next-line unicorn/no-useless-undefined -- Exercise filling with an explicit value.
    expect(lodash.fill(upstream, undefined)).toStrictEqual(expected);
  });

  it("returns the empty input while Lodash returns a different empty array", () => {
    const local: number[] = [];
    const upstream: number[] = [];
    const result = lodash.fill(upstream, 0);

    expect(fill(local, 0)).toBe(local);
    expect(result).toStrictEqual([]);
    expect(result).not.toBe(upstream);
  });
});
