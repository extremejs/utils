import { isElement } from "@extremejs/utils";

it("should check if value is likely a DOM element", () => {
  class Element {

    public readonly nodeType = 1;

  }

  expect(isElement(new Element)).toBe(true);

  expect(isElement("<body>")).toBe(false);
});
