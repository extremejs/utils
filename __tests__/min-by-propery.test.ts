import { minByPropery } from "@extremejs/utils";

it("should return the mininum of the elements provided by the value at the specified property", () => {
  expect(minByPropery([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(1);

  expect(minByPropery([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
    .toBe(1);

  expect(minByPropery([{ a: { b: 8 } }, { a: {} }, { }], "a.b"))
    .toBe(8);
});
