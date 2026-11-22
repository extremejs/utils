import { split } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

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

  it("defaults to code units while Lodash keeps an omitted-separator string intact", () => {
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

    expect(split("🚀ab", separator, -1)).toStrictEqual(["\uD83D", "\uDE80", "a", "b"]);
    expect(lodash.split("🚀ab", separator, -1)).toStrictEqual(["🚀ab"]);
    expect(split("🚀ab", separator, 0)).toStrictEqual([]);
    expect(lodash.split("🚀ab", separator, 0)).toStrictEqual([]);
  });

  it("splits astral and joined symbols into code units with an empty separator", () => {
    const value = "🚀👩‍💻";

    expect(split(value, "")).toStrictEqual(["\uD83D", "\uDE80", "\uD83D", "\uDC69", "‍", "\uD83D", "\uDCBB"]);
    expect(lodash.split(value, "")).toStrictEqual(["🚀", "👩‍💻"]);
    expect(split(value, "", 1)).toStrictEqual(["\uD83D"]);
    expect(lodash.split(value, "", 1)).toStrictEqual(["🚀"]);
  });
});
