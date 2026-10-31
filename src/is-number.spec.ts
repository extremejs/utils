import { isNumber } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is a number or not", () => {
  expect(isNumber("foo")).toBe(false);

  expect(isNumber(false)).toBe(false);

  expect(isNumber(2)).toBe(true);

  expect(isNumber(Number(3))).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isNumber(new Number(4))).toBe(true);
});
