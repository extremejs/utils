import { isMap } from "@extremejs/utils";

it("should determine whether the provided value is a Map object or not", () => {
  expect(isMap(new Map)).toBe(true);

  expect(isMap(new WeakMap)).toBe(false);
});
