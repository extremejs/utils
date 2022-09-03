import { isPositive } from "@extremejs/utils";

it("should check if number is positive", () => {
  expect(isPositive(Infinity)).toBe(true);

  expect(isPositive(2)).toBe(true);

  expect(isPositive(0)).toBe(true);

  expect(isPositive(-0)).toBe(false);

  expect(isPositive(-2)).toBe(false);

  expect(isPositive(-Infinity)).toBe(false);
});
