import { capitalize } from "@extremejs/utils";

it("should convert the first character of the string to uppercase and the remaining to lowercase", () => {
  expect(capitalize("fred")).toBe("Fred");

  expect(capitalize("FRED")).toBe("Fred");

  expect(capitalize("frED")).toBe("Fred");

  expect(capitalize("")).toBe("");
});
