import { isIndex, noop } from "@extremejs/utils";

it("should check if value is a valid array-like index", () => {
  expect(isIndex(0)).toBe(true);

  expect(isIndex(10)).toBe(true);

  expect(isIndex("10")).toBe(true);

  expect(isIndex("foo")).toBe(false);

  expect(isIndex(true)).toBe(false);

  expect(isIndex(noop)).toBe(false);
});
