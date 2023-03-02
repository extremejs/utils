import { isDate } from "@extremejs/utils";

it("should determine whether the provided value is a Date or not", () => {
  expect(isDate((new Date))).toBe(true);

  expect(isDate(2)).toBe(false);
});
