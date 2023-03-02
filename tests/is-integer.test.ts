import { isInteger } from "@extremejs/utils";

it("should determine whether the provided value is an integer or not", () => {
  expect(isInteger(2)).toBe(true);

  expect(isInteger(2.2)).toBe(false);

  expect(isInteger(Number.MIN_VALUE)).toBe(false);

  expect(isInteger(Infinity)).toBe(false);

  expect(isInteger("2")).toBe(false);
});
