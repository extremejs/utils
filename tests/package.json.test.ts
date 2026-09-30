import pkg from "@extremejs/utils/package.json" with { type: "json" };

it("should export package.json", () => {
  expect(pkg.name).toBe("@extremejs/utils");
});
