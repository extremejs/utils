import { ownKeys } from "@extremejs/utils";
import { keys as lodashKeys } from "lodash";
import { describe, expect, it } from "vitest";

it("should return the direct properties of the value", () => {
  expect(ownKeys({ a: 2 })).toEqual(["a"]);
});

describe("lodash compatibility", () => {
  it("matches Lodash's enumerable keys on objects without non-enumerable own string keys", () => {
    const token = Symbol("token");
    class Entry {

      public own = 1;

      public [token] = 2;

    }

    Object.assign(Entry.prototype, { inherited: 3 });
    const value = new Entry();

    expect(ownKeys(value)).toStrictEqual(["own"]);
    expect(lodashKeys(value)).toStrictEqual(["own"]);
  });

  it("includes non-enumerable names and excludes absent indices", () => {
    const value = [1];
    value[2] = 3;

    expect(ownKeys(value)).toStrictEqual(["0", "2", "length"]);
    expect(lodashKeys(value)).toStrictEqual(["0", "1", "2"]);

    const hidden = Object.defineProperty({ visible: true }, "hidden", { value: true });

    expect(ownKeys(hidden)).toStrictEqual(["visible", "hidden"]);
    expect(lodashKeys(hidden)).toStrictEqual(["visible"]);
  });
});
