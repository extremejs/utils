import { isElement } from "@extremejs/utils";
import { isElement as lodashIsElement } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne, builtInPredicatePrimitives, nonPrimitiveValues } from "#test";

class ElementLike {

  public constructor(public readonly nodeType: number | string = 1) {}

}

it("should check if value is a DOM element", () => {
  expect(isElement(new ElementLike())).toBe(false);

  expect(isElement("<body>")).toBe(false);
});

describe("lodash compatibility", () => {
  it("rejects an element-like instance", () => {
    const value = new ElementLike();

    expect(isElement(value)).toBe(false);
    expect(lodashIsElement(value)).toBe(true);
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...nonPrimitiveValues,
      "<body>",
      ...[1, boxedOne, true, [1], "1", "001"].map(nodeType => ({ nodeType })),
      new ElementLike(3),
      new ElementLike("1"),
    ]) {
      expect(isElement(value)).toBe(false);
      expect(lodashIsElement(value)).toBe(false);
    }
  });

  it("rejects a nodeType stand-in rooted at a custom null prototype", () => {
    const root = {};
    const value = { nodeType: 1 };
    Object.setPrototypeOf(root, null);
    Object.setPrototypeOf(value, root);

    expect(isElement(value)).toBe(false);
    expect(lodashIsElement(value)).toBe(true);
  });
});
