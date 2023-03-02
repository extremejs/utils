import { maxByFn } from "@extremejs/utils";

it("should return the maximum of the elements provided by the iteratee", () => {
  expect(maxByFn([], number => number)).toBe(-Infinity);

  expect(maxByFn([1, 2, 3], number => number)).toBe(3);

  expect(maxByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(3);

  expect(maxByFn([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
    .toBe(3);
});
