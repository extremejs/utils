import { toPath } from "@extremejs/utils";
import { toPath as lodashToPath } from "lodash";
import { describe, expect, it } from "vitest";

it("should return the path of a value in an object representing the property", () => {
  expect(toPath("a.b[0].c[d]")).toEqual(["a", "b", "0", "c", "d"]);

  expect(toPath("a.b.0.c.d")).toEqual(["a", "b", "0", "c", "d"]);

  expect(toPath(0)).toEqual([0]);

  const symbol = Symbol();

  expect(toPath(symbol)).toEqual([symbol]);
});

describe("lodash compatibility", () => {
  it.each([
    ["a.b.c", ["a", "b", "c"]],
    ["a[0].b.c", ["a", "0", "b", "c"]],
    ["a[0][b].c", ["a", "0", "b", "c"]],
    [".a", ["", "a"]],
    ["..a", ["", "", "a"]],
    ["a..b", ["a", "", "b"]],
    ["a...b", ["a", "", "", "b"]],
    ["a.", ["a", ""]],
    ["a..", ["a", "", ""]],
  ] as const)("splits %s into the same string segments", (path, expected) => {
    expect(toPath(path)).toStrictEqual(expected);
    expect(lodashToPath(path)).toStrictEqual(expected);
  });

  it("allocates a fresh path for each call and preserves symbol identity", () => {
    expect(toPath("a.b.c")).not.toBe(toPath("a.b.c"));
    expect(lodashToPath("a.b.c")).not.toBe(lodashToPath("a.b.c"));

    const token = Symbol("token");

    expect(toPath(token)).toStrictEqual([token]);
    expect(lodashToPath(token)).toStrictEqual([token]);
  });

  it("retains numeric keys rather than stringifying them", () => {
    expect(toPath(0)).toStrictEqual([0]);
    expect(lodashToPath(0)).toStrictEqual(["0"]);
    expect(toPath(-0)).toStrictEqual([-0]);
    expect(lodashToPath(-0)).toStrictEqual(["-0"]);
  });
});
