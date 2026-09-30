import { isArray } from "@extremejs/utils";

it("should determine whether the value is an array or not", () => {
  expect(isArray([])).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isArray(Array([]))).toBe(true);

  // oxlint-disable-next-line unicorn/no-new-array -- Exercise the Array constructor without changing the test input.
  expect(isArray(new Array([]))).toBe(true);

  expect(isArray({})).toBe(false);
});
