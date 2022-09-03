import { objectToString } from "@extremejs/utils";

it("should convert value to a string using Object.prototype.toString", () => {
  expect(objectToString({})).toBe("[object Object]");

  expect(objectToString(2)).toBe("[object Number]");
});
