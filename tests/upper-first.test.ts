import { upperFirst } from "@extremejs/utils";

it("should convert the first character of the string to uppercase", () => {
  expect(upperFirst("fred")).toBe("Fred");

  expect(upperFirst("FRED")).toBe("FRED");

  expect(upperFirst("frED")).toBe("FrED");

  expect(upperFirst("")).toBe("");
});
