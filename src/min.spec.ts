import { min } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return the minimum of the elements", () => {
  expect(min([1, 2, 3])).toBe(1);
});

describe("lodash compatibility", () => {
  it("should find the least number in ordinary and large arrays", () => {
    const large = Array.from({ length: 500_000 }, (_, index) => index);

    expect(min([1, 2, 3])).toBe(1);
    expect(lodash.min([1, 2, 3])).toBe(1);
    expect(min(large)).toBe(0);
    expect(lodash.min(large)).toBe(0);
  });

  it("should return Infinity for empty and all-hole arrays while Lodash returns undefined", () => {
    const holes: number[] = [];
    holes.length = 2;

    expect(min([])).toBe(Infinity);
    expect(lodash.min<number>([])).toBeUndefined();
    expect(min(holes)).toBe(Infinity);
    expect(lodash.min(holes)).toBeUndefined();
  });

  it("should propagate NaN while Lodash skips it", () => {
    const values = [Number.NaN, 2, Number.NaN];

    expect(min(values)).toBeNaN();
    expect(lodash.min(values)).toBe(2);
  });

  it("should order signed zeros while Lodash keeps the first tied value", () => {
    const values = [0, -0];

    expect(min(values)).toBe(-0);
    expect(lodash.min(values)).toBe(0);
  });
});
