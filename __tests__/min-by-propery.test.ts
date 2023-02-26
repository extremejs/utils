import { minByProperty } from "@extremejs/utils";

it("should return the minimum of the elements provided by the value at the specified property", () => {
  expect(minByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(1);

  expect(minByProperty([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
    .toBe(1);

  expect(minByProperty([{ a: { b: 8 } }, { a: {} }, { }], "a.b"))
    .toBe(8);
});
