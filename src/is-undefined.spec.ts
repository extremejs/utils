import { isUndefined } from "@extremejs/utils";

it("should determine whether the provided value is undefined or not", () => {
  expect(isUndefined(void 0)).toBe(true);

  expect(isUndefined(null)).toBe(false);
});
