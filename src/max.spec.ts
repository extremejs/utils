import { max } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return the maximum of the elements", () => {
  expect(max([1, 2, 3])).toBe(3);
});
