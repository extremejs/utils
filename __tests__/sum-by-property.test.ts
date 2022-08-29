import { sumByProperty } from "@extremejs/utils";

test("should return the sum of the elements provided by the value at the specified property", () => {
  expect(sumByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(6);

  expect(sumByProperty([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
    .toBe(6);

  expect(sumByProperty([{ a: { b: 8 } }, { a: {} }, { }], "a.b"))
    .toBe(8);
});
