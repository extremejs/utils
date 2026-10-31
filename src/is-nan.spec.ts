import { isNaN } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is NaN or not", () => {
  expect(isNaN(Number.NaN)).toBe(true);

  expect(isNaN(Number(Number.NaN))).toBe(true);

  expect(isNaN(void 0)).toBe(false);
});
