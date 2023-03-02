import { isRegExp } from "@extremejs/utils";

it("should determine whether the provided value is a RegExp object or not", () => {
  expect(isRegExp(/abc/)).toBe(true);

  expect(isRegExp("/abc/")).toBe(false);

  expect(isRegExp(2)).toBe(false);
});
