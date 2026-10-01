import { isLength } from "@extremejs/utils";

it("should check if value is a valid array-like length", () => {
  expect(isLength(2)).toBe(true);

  expect(isLength(Number.MIN_VALUE)).toBe(false);

  expect(isLength(Infinity)).toBe(false);

  expect(isLength("2")).toBe(false);
});
