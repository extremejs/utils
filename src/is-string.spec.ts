import { isString } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is a string or not", () => {
  expect(isString("foo")).toBe(true);

  expect(isString(String("foo"))).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isString(new String("foo"))).toBe(true);

  expect(isString(false)).toBe(false);

  expect(isString(3)).toBe(false);
});
