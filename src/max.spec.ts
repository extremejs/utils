import { max } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return the maximum of the elements", () => {
  expect(max([1, 2, 3])).toBe(3);
});

describe("lodash compatibility", () => {
  it("should find the greatest number in ordinary and large arrays", () => {
    const large = Array.from({ length: 500_000 }, (_, index) => index);

    expect(max([1, 2, 3])).toBe(3);
    expect(lodash.max([1, 2, 3])).toBe(3);
    expect(max(large)).toBe(499_999);
    expect(lodash.max(large)).toBe(499_999);
  });

  it("should return -Infinity for empty and all-hole arrays while Lodash returns undefined", () => {
    const holes: number[] = [];
    holes.length = 2;

    expect(max([])).toBe(-Infinity);
    expect(lodash.max<number>([])).toBeUndefined();
    expect(max(holes)).toBe(-Infinity);
    expect(lodash.max(holes)).toBeUndefined();
  });

  it("should propagate NaN while Lodash skips it", () => {
    const values = [Number.NaN, 2, Number.NaN];

    expect(max(values)).toBeNaN();
    expect(lodash.max(values)).toBe(2);
  });

  it("should order signed zeros while Lodash keeps the first tied value", () => {
    const values = [-0, 0];

    expect(max(values)).toBe(0);
    expect(lodash.max(values)).toBe(-0);
  });
});
