import { isArrayLike } from "@extremejs/utils";

it("should check if value is array-like", () => {
  expect(isArrayLike([1, 2, 3])).toBe(true);

  expect(isArrayLike("abc")).toBe(true);

  expect(isArrayLike(() => 0)).toBe(false);
});
