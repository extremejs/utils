import { isEven } from "@extremejs/utils";

it.each([2, 4, 6.0])("should return true for %d", (number) => {
  expect(isEven(number)).toBe(true);
});

it.each([1, 3, 5.0, 2.2])("should return false for %d", (number) => {
  expect(isEven(number)).toBe(false);
});
