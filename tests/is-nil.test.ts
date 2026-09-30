import { isNil } from "@extremejs/utils";

it("should determine whether the provided value is null/undefined or not", () => {
  expect(isNil(null)).toBe(true);

  expect(isNil(void 0)).toBe(true);
});
