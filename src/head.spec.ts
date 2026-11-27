import { head } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

it("should return all but the last element of the value", () => {
  expect(head([])).toEqual([]);

  expect(head([0, 1, 2, 3, 4, 5])).toEqual([0, 1, 2, 3, 4]);

  expect(head("")).toBe("");

  expect(head("012345")).toBe("01234");
});

it("types an array result by its elements and a tuple result by its prefix", () => {
  const values = [1, 2, 3];
  const tuple: [1, 2, 3] = [1, 2, 3];
  const singleton: [1] = [1];
  const empty: [] = [];

  expectTypeOf(head(values)).toEqualTypeOf<number[]>();
  expectTypeOf(head(tuple)).toEqualTypeOf<[1, 2]>();
  expectTypeOf(head(singleton)).toEqualTypeOf<[]>();
  expectTypeOf(head(empty)).toEqualTypeOf<[]>();
});

describe("lodash compatibility", () => {
  it("drops the last element like Lodash initial", () => {
    expect(head([1, 2, 3])).toStrictEqual([1, 2]);
    expect(lodash.initial([1, 2, 3])).toStrictEqual([1, 2]);
    expect(head([])).toStrictEqual([]);
    expect(lodash.initial([])).toStrictEqual([]);
  });

  it("works as a unary selector in map", () => {
    const arrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const expected = [[1, 2], [4, 5], [7, 8]];

    expect(arrays.map(head)).toStrictEqual(expected);
    expect(arrays.map(values => lodash.initial(values))).toStrictEqual(expected);
  });

  it("keeps the string result while Lodash returns an array of code units", () => {
    expect(head("123")).toBe("12");
    expect(lodash.initial("123")).toStrictEqual(["1", "2"]);
    expect(head("")).toBe("");
    expect(lodash.initial("")).toStrictEqual([]);
  });

  it("preserves retained holes while Lodash fills them with undefined", () => {
    const values = [0];
    values[2] = 2;
    const expected = [0];
    expected.length = 2;

    expect(head(values)).toStrictEqual(expected);

    // oxlint-disable-next-line eslint/no-undefined -- The Lodash result contains an explicit value at the hole.
    expect(lodash.initial(values)).toStrictEqual([0, undefined]);
  });
});
