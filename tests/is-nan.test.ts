import { isNaN } from "@extremejs/utils";

it("should determine whether the provided value is NaN or not", () => {
  expect(isNaN(NaN)).toBe(true);

  expect(isNaN(Number(NaN))).toBe(true);

  // eslint-disable-next-line no-undefined
  expect(isNaN(undefined)).toBe(false);
});
