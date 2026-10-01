import { isNull } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is null or not", () => {
  expect(isNull(null)).toBe(true);

  expect(isNull(void 0)).toBe(false);
});
