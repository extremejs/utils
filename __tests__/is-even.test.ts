import { isEven } from "@extremejs/utils";

test("should determine whether the provided number is an even number or not", () => {
  expect(isEven(2)).toBe(true);

  expect(isEven(3)).toBe(false);
});
