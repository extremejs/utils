import { identity, meanByFn } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

it("should return the mean of the elements provided by the iteratee", () => {
  expect(meanByFn([], number => number)).toBeNaN();

  expect(meanByFn([1, 2, 3], number => number)).toBe(2);

  expect(meanByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(2);

  expect(meanByFn([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
    .toBe(2);
});

describe("lodash compatibility", () => {
  it("should average the numbers returned by a unary callback", () => {
    const values = [{ a: 2 }, { a: 3 }, { a: 1 }];
    const iteratee = vi.fn((value: { a: number; }) => value.a);

    expect(meanByFn(values, iteratee)).toBe(2);
    expect(iteratee.mock.calls).toEqual([[values[0]], [values[1]], [values[2]]]);
    iteratee.mockClear();
    expect(lodash.meanBy(values, iteratee)).toBe(2);
    expect(iteratee.mock.calls).toEqual([[values[0]], [values[1]], [values[2]]]);
  });

  it("should return NaN for empty arrays or a NaN score", () => {
    expect(meanByFn([], identity<number>)).toBeNaN();
    expect(lodash.meanBy([], identity<number>)).toBeNaN();
    expect(meanByFn([1, Number.NaN], identity)).toBeNaN();
    expect(lodash.meanBy([1, Number.NaN], identity)).toBeNaN();
  });

  it("should divide by full length while skipping sparse callback calls", () => {
    const values = [4];
    values.length = 2;
    const fallback = 2;
    const iteratee = (value: number | undefined): number => value ?? fallback;

    expect(meanByFn(values, iteratee)).toBe(2);
    expect(lodash.meanBy(values, iteratee)).toBe(3);
  });

  it("should average negative zero as positive zero while Lodash preserves the sign", () => {
    expect(meanByFn([-0], identity)).toBe(0);
    expect(lodash.meanBy([-0], identity)).toBe(-0);
  });
});
