import { sum } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return the sum of the elements", () => {
  expect(sum([1, 2, 3])).toBe(6);
});
