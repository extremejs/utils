import { subtract } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should subtract two numbers", () => {
  expect(subtract(5, 2)).toBe(3);
});

describe("lodash compatibility", () => {
  it.each([
    [6, 4, 2],
    [-6, 4, -10],
    [-6, -4, -2],
    [-0, 0, -0],
    [Number.NaN, 4, Number.NaN],
  ])("should match for %s and %s", (left, right, expected) => {
    expect(subtract(left, right)).toBe(expected);
    expect(lodash.subtract(left, right)).toBe(expected);
  });
});
