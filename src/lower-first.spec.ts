import { lowerFirst } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should convert the first character of the string to lowercase", () => {
  expect(lowerFirst("Fred")).toBe("fred");

  expect(lowerFirst("FRED")).toBe("fRED");

  expect(lowerFirst("fred")).toBe("fred");

  expect(lowerFirst("")).toBe("");
});
