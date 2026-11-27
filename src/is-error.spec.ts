import { isError } from "@extremejs/utils";
import { isError as lodashIsError } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, ordinaryFunctions, toArguments } from "#test";

it("should determine whether the provided value is an Error or not", () => {
  expect(isError(new Error("error"))).toBe(true);

  expect(isError(new RangeError("error"))).toBe(true);

  expect(isError(2)).toBe(false);
});

describe("lodash compatibility", () => {
  const nativeErrors = [Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError];

  class CustomError extends Error {

    public override readonly name = "CustomError";

  }

  it("recognizes native errors and Error subclasses", () => {
    for (const Ctor of [...nativeErrors, CustomError]) {
      const value = new Ctor("example");

      expect(isError(value)).toBe(true);
      expect(lodashIsError(value)).toBe(true);
    }
  });

  it("recognizes a Node.js DOMException", () => {
    const value = new DOMException("example");

    expect(isError(value)).toBe(true);
    expect(lodashIsError(value)).toBe(true);
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...ordinaryFunctions,
      [1, 2, 3],
      toArguments(1),
      new Date(0),
      { a: 1 },
      /x/,
      {
        name   : "Error",
        message: "",
      },
    ]) {
      expect(isError(value)).toBe(false);
      expect(lodashIsError(value)).toBe(false);
    }
  });

  it("recognizes native errors from another realm", () => {
    const values = foreignValues(...nativeErrors.map(Ctor => `new ${ Ctor.name }('example')`));

    for (const value of values) {
      expect(isError(value)).toBe(true);
      expect(lodashIsError(value)).toBe(true);
    }
  });

  it("requires Error inheritance for a non-plain object with error fields", () => {
    const value = {
      name   : "Failure",
      message: "example",
    };
    Object.setPrototypeOf(value, { kind: "failure" });

    expect(isError(value)).toBe(false);
    expect(lodashIsError(value)).toBe(true);
  });
});

it("checks untagged native errors on hosts without Error.isError", () => {
  const descriptor = Object.getOwnPropertyDescriptor(Error, "isError");

  if (descriptor === void 0) throw new Error("Expected Node.js to provide Error.isError");

  const [foreignError] = foreignValues("new Error('example')");
  const standIn = { [Symbol.toStringTag]: "Error" };
  Object.defineProperty(Error, "isError", { value: void 0 });

  let results: boolean[];
  try {
    results = [isError(foreignError), isError(standIn)];
  } finally {
    Object.defineProperty(Error, "isError", descriptor);
  }

  expect(results).toEqual([true, false]);
});
