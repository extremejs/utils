import { isPrototype, noop } from "@extremejs/utils";

it("should check if value is likely a prototype object", () => {
  expect(isPrototype(Object.prototype)).toBe(true);

  expect(isPrototype([])).toBe(false);

  expect(isPrototype(noop.prototype)).toBe(true);

  // oxlint-disable-next-line typescript/no-confusing-void-expression
  expect(isPrototype(noop())).toBe(false);
});
