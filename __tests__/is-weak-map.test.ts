import { isWeakMap } from "@extremejs/utils";

it("should determine whether the provided value is a WeakMap object or not", () => {
  expect(isWeakMap(new WeakMap)).toBe(true);

  expect(isWeakMap(new Map)).toBe(false);
});
