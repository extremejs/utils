import { isTypeOf } from "@extremejs/utils";

it("should check if the typeof result of value is equal to the provided type", () => {
  expect(isTypeOf("foo", "string")).toBe(true);

  expect(isTypeOf(2, "number")).toBe(true);

  expect(isTypeOf(1, "boolean")).toBe(false);
});
