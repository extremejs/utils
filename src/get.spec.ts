import { get } from "@extremejs/utils";
import { get as lodashGet } from "lodash";
import { describe, expect, it } from "vitest";

it("should return value of the provided property in an object", () => {
  expect(get({ a: { b: [{ c: { d: 1 } }] } }, "a.b.0.c.d")).toBe(1);

  expect(get({ a: { b: [{ c: { d: 2 } }] } }, "a.b[0][c].d")).toBe(2);

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  expect(get({ a: { b: [{ c: { d: 3 } }] } }, "a.b.0.c.e" as never)).toBeUndefined();

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  expect(get({ a: { b: [{ c: { d: 4 } }] } }, "a.b.0.e.d" as never, null)).toBeNull();

  expect(get({ a: { b: [{ c: { d: 5 } }] } }, "a.b.5.c.d", 6)).toBe(6);
});

it("should return value of the provided property in an array", () => {
  expect(get([{ a: { b: 1 } }], "0.a.b")).toBe(1);

  expect(get([{ a: { b: 2 } }], "0[a].b")).toBe(2);

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  expect(get([{ a: { b: 3 } }], "a.b" as never)).toBeUndefined();

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  expect(get([{ a: { b: 4 } }], "1.a.b" as never, null)).toBeNull();

  expect(get([{ a: { b: 5 } }], "1.a.b", 6)).toBe(6);
});

describe("lodash compatibility", () => {
  it("reads direct, nested, indexed, inherited, and symbol keys", () => {
    class Entry {

      public own = 3;

      public get inherited(): number {
        return this.own;
      }

    }

    const token = Symbol("token");
    const value = Object.assign(new Entry(), {
      items  : [{ score: 2 }],
      [token]: 4,
    });

    expect(get(value, "items")).toBe(lodashGet(value, "items"));
    expect(get(value, "items.0.score")).toBe(lodashGet(value, "items.0.score"));
    expect(get(value, "items[0][score]")).toBe(lodashGet(value, "items[0][score]"));
    expect(get(value, "inherited")).toBe(lodashGet(value, "inherited"));
    expect(get(value, token)).toBe(lodashGet(value, token));
  });

  it("returns defaults for missing and undefined values and stops at nullish intermediates", () => {
    const value = { items: [{ score: void 0 as number | undefined }] };
    const nullish = { items: [{ score: 1 }, null] };

    expect(get(value, "items[0].score", 9)).toBe(9);
    expect(lodashGet(value, "items[0].score", 9)).toBe(9);
    expect(get(nullish, "items[1].score")).toBeUndefined();
    expect(lodashGet(nullish, "items[1].score")).toBeUndefined();
    expect(get(value, "items[4].score", 0)).toBe(0);
    expect(lodashGet(value, "items[4].score", 0)).toBe(0);
  });

  it("preserves falsy values and uses the local fallback for null", () => {
    const value = {
      score  : null,
      empty  : "",
      enabled: false,
      count  : 0,
    };

    expect(get(value, "empty")).toBe(lodashGet(value, "empty"));
    expect(get(value, "enabled")).toBe(lodashGet(value, "enabled"));
    expect(get(value, "count")).toBe(lodashGet(value, "count"));
    expect(get(value, "score")).toBeUndefined();
    expect(lodashGet(value, "score")).toBeNull();
  });

  it("parses a dotted path even when a corresponding literal key exists", () => {
    const dottedKey = "a.b";
    const value = {
      [dottedKey]: 1,
      a          : { b: 2 },
    };

    expect(get(value, "a.b")).toBe(2);
    expect(lodashGet(value, "a.b")).toBe(1);
  });

  it("reads an own property named by the empty string", () => {
    const value = { "": 3 };

    expect(get(value, "")).toBe(3);
    expect(lodashGet(value, "")).toBe(3);
  });

  it("uses native key conversion for signed zero", () => {
    const negativeZero = "-0";
    const value = {
      0             : "zero",
      [negativeZero]: "negative zero",
    };

    expect(get(value, -0)).toBe("zero");
    expect(lodashGet(value, -0)).toBe("negative zero");
    expect(get(value, 0)).toBe(lodashGet(value, 0));
  });
});
