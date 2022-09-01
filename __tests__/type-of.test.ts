import { typeOf } from "@extremejs/utils";

it("should Returns the typeof result of value", () => {
  expect(typeOf("foo")).toBe("string");

  expect(typeOf(1)).toBe("number");
});
