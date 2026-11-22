import { multiply } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should multiply two numbers", () => {
  expect(multiply(5, 2)).toBe(10);
});

describe("lodash compatibility", () => {
  it.each([
    [6, 4, 24],
    [-6, 4, -24],
    [-6, -4, 24],
    [-0, 4, -0],
    [Number.NaN, 4, Number.NaN],
  ])("should match for %s and %s", (left, right, expected) => {
    expect(multiply(left, right)).toBe(expected);
    expect(lodash.multiply(left, right)).toBe(expected);
  });
});
