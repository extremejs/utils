import { isArray } from "@extremejs/utils";

test("should determine whether the value is an array or not", () => {
  expect(isArray([])).toBe(true);

  expect(isArray(Array([]))).toBe(true);

  expect(isArray(new Array([]))).toBe(true);

  expect(isArray({})).toBe(false);
});
