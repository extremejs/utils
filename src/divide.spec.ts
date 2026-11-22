import { divide } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should divide two numbers", () => {
  expect(divide(5, 2)).toBe(2.5);
});

describe("lodash compatibility", () => {
  it.each([
    [6, 4, 1.5],
    [-6, 4, -1.5],
    [-6, -4, 1.5],
    [5, -0, -Infinity],
    [0, 0, Number.NaN],
    [Number.NaN, 4, Number.NaN],
  ])("should match for %s and %s", (left, right, expected) => {
    expect(divide(left, right)).toBe(expected);
    expect(lodash.divide(left, right)).toBe(expected);
  });
});
