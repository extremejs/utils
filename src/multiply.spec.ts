import { multiply } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should multiply two numbers", () => {
  expect(multiply(5, 2)).toBe(10);
});
