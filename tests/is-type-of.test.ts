import { isTypeOf, TYPE } from "@extremejs/utils";

it("should check if the typeof result of value is equal to the provided type", () => {
  expect(isTypeOf("foo", TYPE.STRING)).toBe(true);

  expect(isTypeOf(2, TYPE.NUMBER)).toBe(true);

  expect(isTypeOf(1, TYPE.BOOLEAN)).toBe(false);
});
