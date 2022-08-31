import { isSet } from "@extremejs/utils";

it("should determine whether the provided value is a Set object or not", () => {
  expect(isSet(new Set)).toBe(true);

  expect(isSet(new WeakSet)).toBe(false);
});
