import { hasOwn } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should checks if value has the specified key as its own property", () => {
  expect(hasOwn({ a: 2 }, "a")).toBe(true);
});
