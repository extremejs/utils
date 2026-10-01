import { isObjectLike } from "@extremejs/utils";

it("should check if value is object-like", () => {
  expect(isObjectLike({})).toBe(true);

  expect(isObjectLike([1, 2, 3])).toBe(true);

  expect(isObjectLike(() => 0)).toBe(false);

  expect(isObjectLike(null)).toBe(false);

  expect(isObjectLike(2)).toBe(false);
});
