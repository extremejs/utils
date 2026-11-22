import { replace } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it, vi } from "vitest";

it("replaces the first or all literal matches", () => {
  expect(replace("Hi Fred, I'm Fred!", "Fred", "Barney"))
    .toBe("Hi Barney, I'm Fred!");

  expect(replace("Hi Fred, I'm Fred too!", "Fred", "Barney", true))
    .toBe("Hi Barney, I'm Barney too!");
});

describe("lodash compatibility", () => {
  it.each([
    ["abcde", "de", "123", "abc123"],
    ["abcde", /[bd]/g, "-", "a-c-e"],
    ["abc abc", "abc", "x", "x abc"],
    ["abc abc", /abc/, "x", "x abc"],
    ["abc", "d", "x", "abc"],
    ["", "x", "y", ""],
    ["abc", /(b)/, "[$1]", "a[b]c"],

    // oxlint-disable-next-line max-params -- The table pairs the three public arguments with their result.
  ])("replaces matches in %j with %s as the pattern", (value, pattern, replacement, expected) => {
    expect(replace(value, pattern, replacement)).toBe(expected);
    expect(lodash.replace(value, pattern, replacement)).toBe(expected);
  });

  it("passes the match, capture, UTF-16 offset, and source to the replacer", () => {
    const local = vi.fn(() => "x");
    const upstream = vi.fn(() => "x");

    expect(replace("🚀ab", /(b)/, local)).toBe("🚀ax");
    expect(lodash.replace("🚀ab", /(b)/, upstream)).toBe("🚀ax");
    expect(local).toHaveBeenCalledExactlyOnceWith("b", "b", 3, "🚀ab");
    expect(upstream).toHaveBeenCalledExactlyOnceWith("b", "b", 3, "🚀ab");
  });

  it("replaces every literal match with all or an equivalent global Lodash pattern", () => {
    expect(replace("a.a.a", ".", "!", true)).toBe("a!a!a");
    expect(lodash.replace("a.a.a", ".", "!")).toBe("a!a.a");
    expect(lodash.replace("a.a.a", /\./g, "!")).toBe("a!a!a");
    expect(replace("a.a.a", /\./g, "!", true)).toBe("a!a!a");
  });

  it("rejects a nonglobal regular expression in all mode", () => {
    expect(() => replace("a.a", /\./, "!", true)).toThrow(TypeError);
    expect(lodash.replace("a.a", /\./, "!")).toBe("a!a");
  });
});
