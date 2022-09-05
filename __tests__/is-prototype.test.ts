import { isPrototype, noop } from "@extremejs/utils";

it("should check if value is likely a prototype object", () => {
  expect(isPrototype(Object.prototype)).toBe(true);

  expect(isPrototype([])).toBe(false);

  expect(isPrototype(noop.prototype)).toBe(true);

  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  expect(isPrototype(noop())).toBe(false);
});
