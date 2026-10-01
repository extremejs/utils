import { endsWith } from "@extremejs/utils";

it("should check whether the string ends with the given searchString", () => {
  expect(endsWith("012345", "345")).toBe(true);

  expect(endsWith("012345", "34")).toBe(false);

  expect(endsWith("012345", "123", 4)).toBe(true);
});
