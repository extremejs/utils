import { isPlainObject } from "@extremejs/utils";
import { isPlainObject as lodashIsPlainObject } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne, foreignValues } from "#test";

class Example {}

it("should check if value is a plain object", () => {
  expect(isPlainObject(new Example())).toBe(false);

  expect(isPlainObject([1, 2, 3])).toBe(false);

  expect(isPlainObject(() => 0)).toBe(false);

  expect(isPlainObject(Object.create(null))).toBe(true);

  expect(isPlainObject({
    x: 0,
    y: 0,
  })).toBe(true);
});

describe("lodash compatibility", () => {
  it("recognizes ordinary and null-prototype records across realms", () => {
    const nullPrototype: unknown = Object.create(null, { constructor: { value: Object } });
    const records = foreignValues("({})", "Object.create(null)");

    for (const value of [
      {},
      { a: 1 },
      { constructor: Example },
      Object.create(null) as unknown,
      nullPrototype,
      { valueOf: 0 },
      { [Symbol.toStringTag]: "Custom" },
      ...records,
    ]) {
      expect(isPlainObject(value)).toBe(true);
      expect(lodashIsPlainObject(value)).toBe(true);
    }
  });

  it("rejects arrays, class instances, functions, and primitives", () => {
    for (const value of [
      [1, 2, 3],
      new Example(),
      Error,
      Object.create({ a: 1 }) as unknown,
      boxedOne,
      null,
      void 0,
      false,
      0,
      Number.NaN,
      "",
      true,
      "a",
      Symbol("x"),
    ]) {
      expect(isPlainObject(value)).toBe(false);
      expect(lodashIsPlainObject(value)).toBe(false);
    }
  });

  it("checks the prototype chain without consulting a read-only tag", () => {
    const value = Object.defineProperty({}, Symbol.toStringTag, { value: "Custom" });

    expect(isPlainObject(value)).toBe(true);
    expect(lodashIsPlainObject(value)).toBe(false);
  });

  it("does not add an own tag to an object with an inherited tag", () => {
    const prototype = { [Symbol.toStringTag]: void 0 };
    const local = {};
    const reference = {};
    Object.setPrototypeOf(local, prototype);
    Object.setPrototypeOf(reference, prototype);

    expect(isPlainObject(local)).toBe(false);
    expect(lodashIsPlainObject(reference)).toBe(false);
    expect(Object.hasOwn(local, Symbol.toStringTag)).toBe(false);
    expect(Object.hasOwn(reference, Symbol.toStringTag)).toBe(false);
  });
});

it("rejects namespaces, arguments, and records rooted at a custom null-prototype object", () => {
  for (const value of [
    Math,
    ...foreignValues("Math", "(function () { return arguments; })()", "Object.create(Object.create(null))"),
  ]) {
    expect(isPlainObject(value)).toBe(false);
    expect(lodashIsPlainObject(value)).toBe(false);
  }
});

it("distinguishes a custom Math tag from the Math namespace", () => {
  const taggedRecord = Object.defineProperty({}, Symbol.toStringTag, {
    configurable: true,
    value       : "Math",
  });
  const [untaggedMath] = foreignValues("Reflect.deleteProperty(Math, Symbol.toStringTag); Math");

  const constants = Object.freeze({
    E : Math.E,
    PI: Math.PI,
  });

  expect(isPlainObject(constants)).toBe(true);
  expect(isPlainObject(taggedRecord)).toBe(true);
  expect(lodashIsPlainObject(taggedRecord)).toBe(false);
  expect(isPlainObject(untaggedMath)).toBe(false);
  expect(lodashIsPlainObject(untaggedMath)).toBe(true);
});
