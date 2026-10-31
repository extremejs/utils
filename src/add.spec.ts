import { add } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should add two numbers", () => {
  expect(add(5, 2)).toBe(7);
});
