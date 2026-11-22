/* oxlint-disable eslint/no-undefined -- Distinguish explicit undefined, omitted defaults, and sparse holes. */

import { concat } from "@extremejs/utils";
import { concat as lodashConcat } from "lodash";
import { describe, expect, it } from "vitest";
import { toArguments } from "#test";

it("should create a new array concatenating the input array with any additional arrays and/or values.", () => {
  expect(concat<number[] | number>([1, 2], 3, [4], [[5]])).toEqual([1, 2, 3, 4, [5]]);
});

describe("lodash compatibility", () => {
  it("copies the base array without copying its elements", () => {
    const element = { value: 1 };
    const values = [element];
    const local = concat(values);
    const upstream = lodashConcat(values);

    expect(local).not.toBe(values);
    expect(upstream).not.toBe(values);
    expect(local).toStrictEqual(values);
    expect(upstream).toStrictEqual(values);
    expect(local[0]).toBe(element);
    expect(upstream[0]).toBe(element);
  });

  it("appends values and flattens arrays one level without mutating the base", () => {
    const values = [1];
    const expected = [1, 2, 3, [4]];

    expect(concat<number | number[]>(values, 2, [3], [[4]])).toStrictEqual(expected);
    expect(values).toStrictEqual([1]);
    expect(lodashConcat<number | number[]>(values, 2, [3], [[4]])).toStrictEqual(expected);
    expect(values).toStrictEqual([1]);
  });

  it("preserves holes from both arrays while Lodash fills them with undefined", () => {
    // oxlint-disable-next-line unicorn/no-new-array -- Create a sparse array with this length.
    const values = new Array<number>(1);

    // oxlint-disable-next-line unicorn/no-new-array -- Create a sparse array with this length.
    expect(concat(values, values)).toStrictEqual(new Array<number>(2));
    expect(lodashConcat(values, values)).toStrictEqual([undefined, undefined]);
  });

  it("appends an arguments object as a value while Lodash expands it", () => {
    const args = toArguments(2, 3);

    expect(concat<number | IArguments>([1], args)).toStrictEqual([1, args]);
    expect(lodashConcat<number | IArguments>([1], args)).toStrictEqual([1, 2, 3]);
  });

  it("honors an array opting out of spreading while Lodash expands it", () => {
    const values = Object.assign([2, 3], { [Symbol.isConcatSpreadable]: false });

    expect(concat<number | number[]>([1], values)).toStrictEqual([1, values]);
    expect(lodashConcat<number | number[]>([1], values)).toStrictEqual([1, 2, 3]);
  });
});
