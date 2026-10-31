import { identity } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return the first argument it receives", () => {
  const foo = { bar: "baz" };

  expect(identity(foo)).toBe(foo);
});
