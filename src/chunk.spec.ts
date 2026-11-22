/* oxlint-disable eslint/no-undefined -- Distinguish explicit undefined, omitted defaults, and sparse holes. */

import { chunk } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return chunked array", () => {
  expect(chunk([1, 2, 3])).toEqual([[1], [2], [3]]);

  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
});

describe("lodash compatibility", () => {
  it.each([
    [undefined, [[0], [1], [2], [3], [4], [5]]],
    [3, [[0, 1, 2], [3, 4, 5]]],
    [4, [[0, 1, 2, 3], [4, 5]]],
    [7, [[0, 1, 2, 3, 4, 5]]],
  ])("groups elements with size %s", (size, expected) => {
    const values = [0, 1, 2, 3, 4, 5];

    expect(chunk(values, size)).toStrictEqual(expected);
    expect(lodash.chunk(values, size)).toStrictEqual(expected);
  });

  it("returns an empty array for empty input and a valid size", () => {
    expect(chunk([], 2)).toStrictEqual([]);
    expect(lodash.chunk([], 2)).toStrictEqual([]);
  });

  it("preserves holes inside each chunk while Lodash fills them with undefined", () => {
    // oxlint-disable-next-line unicorn/no-new-array -- Create a sparse array with this length.
    const values = new Array<number>(2);
    values[1] = 2;

    expect(chunk(values, 2)).toStrictEqual([values]);
    expect(lodash.chunk(values, 2)).toStrictEqual([[undefined, 2]]);
  });
});
