import { sumByFn } from "@extremejs/utils";

it("should return the sum of the elements provided by the iteratee", () => {
  expect(sumByFn([1, 2, 3], number => number)).toBe(6);

  expect(sumByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(6);

  expect(sumByFn([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
    .toBe(6);
});
