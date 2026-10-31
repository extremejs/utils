import { ownKeys } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return the direct properties of the value", () => {
  expect(ownKeys({ a: 2 })).toEqual(["a"]);
});
