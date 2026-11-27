import { runInNewContext } from "node:vm";
import { isString } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";
import { toArguments } from "#test";

it("should determine whether the provided value is a string or not", () => {
  expect(isString("foo")).toBe(true);

  expect(isString(String("foo"))).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isString(new String("foo"))).toBe(true);

  expect(isString(false)).toBe(false);

  expect(isString(3)).toBe(false);
});

describe("lodash compatibility", () => {
  // oxlint-disable-next-line unicorn/new-for-builtins -- Include a boxed string.
  it.each(["a", "", Object("a"), Object("")])("recognizes string value %j", (value: unknown) => {
    expect(isString(value)).toBe(true);
    expect(lodash.isString(value)).toBe(true);
  });

  it.each([
    null,

    // oxlint-disable-next-line eslint/no-undefined -- Exercise an explicit undefined value.
    undefined,
    false,
    0,
    Number.NaN,
    true,
    toArguments(1),
    [1, 2, 3],
    new Date(0),
    new Error("example"),
    lodash,
    Array.prototype.slice,
    {
      0     : 1,
      length: 1,
    },
    1,
    /x/,
    Symbol("x"),
  ].map((value: unknown) => [value]))("rejects non-string value %j", (value: unknown) => {
    expect(isString(value)).toBe(false);
    expect(lodash.isString(value)).toBe(false);
  });

  it("recognizes a boxed string from another realm", () => {
    const value: unknown = runInNewContext('Object("a")');

    expect(isString(value)).toBe(true);
    expect(lodash.isString(value)).toBe(true);
  });
});
