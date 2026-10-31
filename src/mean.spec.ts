import { mean } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return the mean of the elements", () => {
  expect(mean([1, 2, 3])).toBe(2);

  expect(mean([])).toBeNaN();
});
