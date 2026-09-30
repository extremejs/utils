import { isNull } from "@extremejs/utils";

it("should determine whether the provided value is null or not", () => {
  expect(isNull(null)).toBe(true);

  expect(isNull(void 0)).toBe(false);
});
