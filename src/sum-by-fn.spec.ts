import { identity, sumByFn } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

it("should return the sum of the elements provided by the iteratee", () => {
  expect(sumByFn([1, 2, 3], number => number)).toBe(6);

  expect(sumByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(6);

  expect(sumByFn([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
    .toBe(6);
});

describe("lodash compatibility", () => {
  it("should sum values returned by a unary callback", () => {
    const values = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const iteratee = vi.fn(({ a }: { a: number; }) => a);

    expect(sumByFn(values, iteratee)).toBe(6);
    expect(iteratee.mock.calls).toEqual([[values[0]], [values[1]], [values[2]]]);

    iteratee.mockClear();

    expect(lodash.sumBy(values, iteratee)).toBe(6);
    expect(iteratee.mock.calls).toEqual([[values[0]], [values[1]], [values[2]]]);
  });

  it("should return zero for an empty array without calling the iteratee", () => {
    const iteratee = vi.fn((value: number) => value);

    expect(sumByFn([], iteratee)).toBe(0);
    expect(lodash.sumBy([], iteratee)).toBe(0);
    expect(iteratee).not.toHaveBeenCalled();
  });

  it("should sum numbers and propagate NaN with an explicit identity callback", () => {
    expect(sumByFn([6, 4, 2], identity)).toBe(12);
    expect(lodash.sumBy([6, 4, 2], identity)).toBe(12);
    expect(sumByFn([1, Number.NaN], identity)).toBeNaN();
    expect(lodash.sumBy([1, Number.NaN], identity)).toBeNaN();
  });

  it("should skip array holes while Lodash passes undefined to the callback", () => {
    const values: number[] = [];
    values[1] = 4;

    const iteratee = vi.fn((value: number | undefined) => value ?? 1);

    expect(sumByFn(values, iteratee)).toBe(4);
    expect(lodash.sumBy(values, iteratee)).toBe(5);
  });

  it("should start at positive zero while Lodash starts at the first defined value", () => {
    expect(sumByFn([-0], identity)).toBe(0);
    expect(lodash.sumBy([-0], identity)).toBe(-0);
  });
});
