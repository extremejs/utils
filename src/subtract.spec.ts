import { subtract } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should subtract two numbers", () => {
  expect(subtract(5, 2)).toBe(3);
});
