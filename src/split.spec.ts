import { split } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

it("should split string by separator", () => {
  expect(split("012345")).toEqual(["0", "1", "2", "3", "4", "5"]);

  expect(split("0,1,2,3,4,5", ",")).toEqual(["0", "1", "2", "3", "4", "5"]);

  expect(split("0,1,2,3,4,5", ",", 2)).toEqual(["0", "1"]);
});

describe("lodash compatibility", () => {
  it.each([
    ["abcde", "c", 10, ["ab", "de"]],
    ["abcde", /[bd]/, 10, ["a", "c", "e"]],
    ["abcde", "", 2, ["a", "b"]],
    ["a,b,c", /(,)/, 4, ["a", ",", "b", ","]],
    ["🚀 and 🌿", " ", 2, ["🚀", "and"]],
    ["🚀 and 🌿", " ", -1, ["🚀", "and", "🌿"]],
    ["🚀 and 🌿", " ", 0, []],

    // oxlint-disable-next-line max-params -- The table pairs the three public arguments with their result.
  ])("splits %j with separator %s and limit %s", (value, separator, limit, expected) => {
    expect(split(value, separator, limit)).toStrictEqual(expected);
    expect(lodash.split(value, separator, limit)).toStrictEqual(expected);
  });

  it("defaults to symbols while Lodash keeps an omitted-separator string intact", () => {
    expect(split("abc")).toStrictEqual(["a", "b", "c"]);
    expect(lodash.split("abc")).toStrictEqual(["abc"]);
    expect(split("")).toStrictEqual([]);
    expect(lodash.split("")).toStrictEqual([""]);
    expect(split("", "")).toStrictEqual([]);
    expect(lodash.split("", "")).toStrictEqual([]);
  });

  it("applies the separator default when undefined is passed with a limit", () => {
    // oxlint-disable-next-line eslint/no-undefined -- Supply a limit with the default separator.
    const separator = undefined;

    expect(split("🚀ab", separator, -1)).toStrictEqual(["🚀", "a", "b"]);
    expect(lodash.split("🚀ab", separator, -1)).toStrictEqual(["🚀ab"]);
    expect(split("🚀ab", separator, 0)).toStrictEqual([]);
    expect(lodash.split("🚀ab", separator, 0)).toStrictEqual([]);
  });

  it("keeps astral, joined, and decorated symbols together", () => {
    const symbols = ["🚀", "👩🏽‍💻", "🇮🇷", "e\u0301", "✌️"];
    const value = symbols.join("");

    expect(split(value)).toStrictEqual(symbols);
    expect(split(value, "")).toStrictEqual(symbols);
    expect(lodash.split(value, "")).toStrictEqual(symbols);
  });

  it.each([
    [1.9, ["🚀"]],
    [(2 ** 32) + 1, ["🚀"]],
    [Number.NaN, []],
    [Infinity, []],
  ])("converts the symbol limit %s to an unsigned 32-bit integer", (limit, expected) => {
    expect(split("🚀👩‍💻", "", limit)).toStrictEqual(expected);
    expect(lodash.split("🚀👩‍💻", "", limit)).toStrictEqual(expected);
  });

  it.each([
    ["a\u0301bc", "a\u0301"],
    ["ab👩‍💻", "a"],
  ])("keeps the first complete symbol of %j when limited to one", (value, first) => {
    expect(split(value, "", 1)).toStrictEqual([first]);
    expect(lodash.split(value, "", 1)).toStrictEqual([first]);
  });

  it("inserts undefined for an unmatched regex capture", () => {
    const separator = /(;)|(,)/;
    const expected = ["a", ";", void 0, "b"];

    expect(split("a;b", separator)).toStrictEqual(expected);
    expect(lodash.split("a;b", separator)).toStrictEqual(expected);
    expectTypeOf(split("a;b", separator)).toEqualTypeOf<Array<string | undefined>>();
  });
});

it.each([{ separator: "," }, { separator: /,/ }, { separator: void 0 }])("infers the split result from the separator type", ({ separator }) => {
  expectTypeOf<[string]>().toExtend<Parameters<typeof split>>();
  expectTypeOf(split("abc")).toEqualTypeOf<string[]>();
  expectTypeOf(split("abc", void 0, 2)).toEqualTypeOf<string[]>();
  expectTypeOf(split("a,b", ",")).toEqualTypeOf<string[]>();
  expectTypeOf(split("a,b", separator)).toEqualTypeOf<Array<string | undefined>>();
});
