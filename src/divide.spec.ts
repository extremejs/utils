import { divide } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should divide two numbers", () => {
  expect(divide(5, 2)).toBe(2.5);
});
