// oxlint-disable unicorn/no-zero-fractions
import { isEven } from "@extremejs/utils";
import { expect, it } from "vitest";

it.each([2, 4, 6.0])("should return true for %d", (number) => {
  expect(isEven(number)).toBe(true);
});

it.each([1, 3, 5.0, 2.2])("should return false for %d", (number) => {
  expect(isEven(number)).toBe(false);
});

it.each([-2, -0, 0])("should accept %s as even", (number) => {
  expect(isEven(number)).toBe(true);
});

it.each([-3, Infinity, -Infinity, Number.NaN])("should reject %s as even", (number) => {
  expect(isEven(number)).toBe(false);
});
