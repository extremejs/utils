import { isOdd } from "@extremejs/utils";

it.each([1, 3, 5.0])("should return true for %d", (number) => {
  expect(isOdd(number)).toBe(true);
});

it.each([2, 4, 6.0, 1.1])("should return false for %d", (number) => {
  expect(isOdd(number)).toBe(false);
});
