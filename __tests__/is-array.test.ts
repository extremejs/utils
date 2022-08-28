import { isArray } from "@extremejs/utils";

test("should determine whether the value is an array or not", () => {
  expect(isArray([])).toBe(true);

  expect(isArray({})).toBe(false);
});
