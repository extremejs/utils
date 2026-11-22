import { add } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should add two numbers", () => {
  expect(add(5, 2)).toBe(7);
});

describe("lodash compatibility", () => {
  it.each([
    [6, 4, 10],
    [-6, 4, -2],
    [-6, -4, -10],
    [-0, -0, -0],
    [Number.NaN, 4, Number.NaN],
  ])("should match for %s and %s", (left, right, expected) => {
    expect(add(left, right)).toBe(expected);
    expect(lodash.add(left, right)).toBe(expected);
  });
});
