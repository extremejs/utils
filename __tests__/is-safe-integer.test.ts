import { isSafeInteger } from "@extremejs/utils";

it("should determine whether the provided value is a safe integer or not", () => {
  expect(isSafeInteger(2)).toBe(true);

  expect(isSafeInteger(2.2)).toBe(false);

  expect(isSafeInteger(Number.MIN_VALUE)).toBe(false);

  expect(isSafeInteger(Infinity)).toBe(false);

  expect(isSafeInteger("2")).toBe(false);
});
