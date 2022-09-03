import { isSafeInteger, MIN_SAFE_INTEGER, MAX_SAFE_INTEGER } from "@extremejs/utils";

it("should determine whether the provided value is a safe integer or not", () => {
  expect(isSafeInteger(2)).toBe(true);

  expect(isSafeInteger(2.2)).toBe(false);

  expect(isSafeInteger(Number.MIN_VALUE)).toBe(false);

  expect(isSafeInteger(Infinity)).toBe(false);

  expect(isSafeInteger("2")).toBe(false);
});

it("should return minimum safe integer", () => {
  expect(MIN_SAFE_INTEGER).toBe(-9_007_199_254_740_991);
});

it("should return maximum safe integer", () => {
  expect(MAX_SAFE_INTEGER).toBe(9_007_199_254_740_991);
});
