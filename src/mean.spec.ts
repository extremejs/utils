import { mean } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should return the mean of the elements", () => {
  expect(mean([1, 2, 3])).toBe(2);

  expect(mean([])).toBeNaN();
});

describe("lodash compatibility", () => {
  it.each<[number[], number]>([
    [[4, 2, 8, 6], 5],
    [[], Number.NaN],
    [[1, Number.NaN], Number.NaN],
  ])("should match for %j", (values, expected) => {
    expect(mean(values)).toBe(expected);
    expect(lodash.mean(values)).toBe(expected);
  });

  it("should start at positive zero while Lodash preserves negative zero", () => {
    expect(mean([-0])).toBe(0);
    expect(lodash.mean([-0])).toBe(-0);
  });

  it("should skip holes and return zero for a nonempty all-hole array", () => {
    const values: number[] = [];
    values.length = 2;

    expect(mean(values)).toBe(0);
    expect(lodash.mean(values)).toBe(Number.NaN);
    values[1] = 4;
    expect(mean(values)).toBe(2);
    expect(lodash.mean(values)).toBe(2);
  });
});
