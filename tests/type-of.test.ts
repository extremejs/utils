import { TYPE, typeOf } from "@extremejs/utils";

it("should return the typeof result of value", () => {
  expect(typeOf("foo")).toBe("string");

  expect(typeOf(1)).toBe("number");
});

test("TYPE should have all the js types", () => {
  expect(TYPE.BIGINT).toBe(typeof 1n);

  expect(TYPE.BOOLEAN).toBe(typeof true);

  expect(TYPE.FUNCTION).toBe(typeof ((): number => 0));

  expect(TYPE.NUMBER).toBe(typeof 1);

  expect(TYPE.OBJECT).toBe(typeof {});

  expect(TYPE.STRING).toBe(typeof "");

  expect(TYPE.SYMBOL).toBe(typeof Symbol());

  // eslint-disable-next-line no-undefined
  expect(TYPE.UNDEFINED).toBe(typeof undefined);
});
