import { meanByFn } from "@extremejs/utils";

it("should return the mean of the elements provided by the iteratee", () => {
  expect(meanByFn([], number => number)).toBeNaN();

  expect(meanByFn([1, 2, 3], number => number)).toBe(2);

  expect(meanByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(2);

  expect(meanByFn([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
    .toBe(2);
});
