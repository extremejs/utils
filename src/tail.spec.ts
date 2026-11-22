import { tail } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return all but the first element of the value", () => {
  expect(tail([])).toEqual([]);

  expect(tail([0, 1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);

  expect(tail("")).toBe("");

  expect(tail("012345")).toBe("12345");
});

describe("lodash compatibility", () => {
  it("drops the first element and returns an empty array for empty input", () => {
    expect(tail([1, 2, 3])).toStrictEqual([2, 3]);
    expect(lodash.tail([1, 2, 3])).toStrictEqual([2, 3]);
    expect(tail([])).toStrictEqual([]);
    expect(lodash.tail([])).toStrictEqual([]);
  });

  it("works as a unary selector in map", () => {
    const arrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const expected = [[2, 3], [5, 6], [8, 9]];

    expect(arrays.map(tail)).toStrictEqual(expected);
    expect(arrays.map(values => lodash.tail(values))).toStrictEqual(expected);
  });

  it("keeps the string result while Lodash returns an array of code units", () => {
    expect(tail("123")).toBe("23");
    expect(lodash.tail("123")).toStrictEqual(["2", "3"]);
    expect(tail("")).toBe("");
    expect(lodash.tail("")).toStrictEqual([]);
  });

  it("preserves retained holes while Lodash fills them with undefined", () => {
    const values: number[] = [];
    values[2] = 2;
    const expected: number[] = [];
    expected[1] = 2;

    expect(tail(values)).toStrictEqual(expected);

    // oxlint-disable-next-line eslint/no-undefined -- The Lodash result contains an explicit value at the hole.
    expect(lodash.tail(values)).toStrictEqual([undefined, 2]);
  });
});
