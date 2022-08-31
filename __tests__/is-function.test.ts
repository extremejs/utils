import { isFunction } from "@extremejs/utils";

it("should determine whether the provided value is a function or not", () => {
  expect(isFunction(() => 0)).toBe(true);

  expect(isFunction(2)).toBe(false);
});
