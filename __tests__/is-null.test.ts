import { isNull } from "@extremejs/utils";

it("should determine whether the provided value is null or not", () => {
  expect(isNull(null)).toBe(true);

  // eslint-disable-next-line no-undefined
  expect(isNull(undefined)).toBe(false);

  expect(isNull(void 0)).toBe(false);
});
