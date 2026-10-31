import { prototypeOf } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return the Object.getPrototypeOf result of value", () => {
  expect(prototypeOf(Object.create(null))).toBeNull();
});
