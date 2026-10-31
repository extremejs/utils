import { min } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return the minimum of the elements", () => {
  expect(min([1, 2, 3])).toBe(1);
});
