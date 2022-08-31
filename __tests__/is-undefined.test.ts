import { isUndefined } from "@extremejs/utils";

it("should determine whether the provided value is undefined or not", () => {
  // eslint-disable-next-line no-undefined
  expect(isUndefined(undefined)).toBe(true);

  expect(isUndefined(void 0)).toBe(true);

  expect(isUndefined(null)).toBe(false);
});
