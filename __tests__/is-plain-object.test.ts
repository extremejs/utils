import { isPlainObject } from "@extremejs/utils";

it("should check if value is a plain object", () => {
  class Foo {}

  expect(isPlainObject(new Foo)).toBe(false);

  expect(isPlainObject([1, 2, 3])).toBe(false);

  expect(isPlainObject(() => 0)).toBe(false);

  expect(isPlainObject(Object.create(null))).toBe(true);

  expect(isPlainObject({
    x: 0,
    y: 0,
  })).toBe(true);
});
