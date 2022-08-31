import { meanByProperty } from "@extremejs/utils";

it("should return the mean of the elements provided by the value at the specified property", () => {
  expect(meanByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(2);

  expect(meanByProperty([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
    .toBe(2);

  expect(meanByProperty([{ a: { b: 9 } }, { a: {} }, { }], "a.b"))
    .toBe(3);

  expect(meanByProperty([], "a" as never)).toBeNaN();
});
