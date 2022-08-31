import { isFinite } from "@extremejs/utils";

it("should determine whether the provided value is a finite number or not", () => {
  expect(isFinite(2)).toBe(true);

  expect(isFinite(Number.MIN_VALUE)).toBe(true);

  expect(isFinite(Number.MAX_VALUE)).toBe(true);

  expect(isFinite(Infinity)).toBe(false);

  expect(isFinite("2")).toBe(false);
});
