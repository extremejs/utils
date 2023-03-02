import { isObject } from "@extremejs/utils";

it("should determine whether the provided value is an Object or not", () => {
  expect(isObject({})).toBe(true);

  expect(isObject([1, 2, 3])).toBe(true);

  expect(isObject(() => 0)).toBe(true);

  expect(isObject(null)).toBe(false);

  expect(isObject(2)).toBe(false);
});
