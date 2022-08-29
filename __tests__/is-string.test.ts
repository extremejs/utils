import { isString } from "@extremejs/utils";

test("should determine whether the provided value is a string or not", () => {
  expect(isString("foo")).toBe(true);

  expect(isString(String("foo"))).toBe(true);

  expect(isString(new String("foo"))).toBe(true);

  expect(isString(false)).toBe(false);

  expect(isString(3)).toBe(false);
});
