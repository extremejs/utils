import { minByFn } from "@extremejs/utils";

it("should return the minimum of the elements provided by the iteratee", () => {
  expect(minByFn([], number => number)).toBe(Infinity);

  expect(minByFn([1, 2, 3], number => number)).toBe(1);

  expect(minByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(1);

  expect(minByFn([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
    .toBe(1);
});
