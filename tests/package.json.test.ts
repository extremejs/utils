import { name } from "@extremejs/utils/package.json";

it("should export package.json", () => {
  expect(name).toBe("@extremejs/utils");
});
