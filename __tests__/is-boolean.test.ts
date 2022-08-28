import { isBoolean } from "@extremejs/utils";

test("should determine whether the provided value is a boolean or not", () => {
  expect(isBoolean(false)).toBe(true);

  expect(isBoolean("foo bar")).toBe(false);

  expect(isBoolean(3)).toBe(false);
});
