import { sum } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return the sum of the elements", () => {
  expect(sum([1, 2, 3])).toBe(6);
});

describe("lodash compatibility", () => {
  it.each<[number[], number]>([
    [[6, 4, 2], 12],
    [[], 0],
    [[1, Number.NaN], Number.NaN],
  ])("should match for %j", (values, expected) => {
    expect(sum(values)).toBe(expected);
    expect(lodash.sum(values)).toBe(expected);
  });

  it("should start at positive zero while Lodash preserves negative zero", () => {
    expect(sum([-0])).toBe(0);
    expect(lodash.sum([-0])).toBe(-0);
  });

  it("should skip holes and return zero for a nonempty all-hole array", () => {
    const values: number[] = [];
    values.length = 2;

    expect(sum(values)).toBe(0);
    expect(lodash.sum(values)).toBeUndefined();
    values[1] = 4;
    expect(sum(values)).toBe(4);
    expect(lodash.sum(values)).toBe(4);
  });
});
