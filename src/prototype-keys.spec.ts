import { prototypeKeys } from "@extremejs/utils";
import { keys as lodashKeys } from "lodash";
import { describe, expect, it } from "vitest";

describe("lodash compatibility", () => {
  it("matches Lodash's own enumerable keys on ordinary constructor prototypes", () => {
    const token = Symbol("token");
    class Entry {}

    Object.setPrototypeOf(Entry.prototype, { inherited: 1 });
    Object.assign(Entry.prototype, {
      own    : 2,
      [token]: 3,
    });
    Object.defineProperty(Entry.prototype, "constructor", { enumerable: true });
    Object.defineProperty(Entry.prototype, "hidden", { value: 4 });

    expect(prototypeKeys(Entry.prototype)).toStrictEqual(["own"]);
    expect(lodashKeys(Entry.prototype)).toStrictEqual(["own"]);
  });

  it("omits constructor on non-prototypes and does not generate sparse indices", () => {
    const value = {
      constructor: null,
      a          : 1,
    };
    const sparse = [1];
    sparse[2] = 3;

    expect(prototypeKeys(value)).toStrictEqual(["a"]);
    expect(lodashKeys(value)).toStrictEqual(["constructor", "a"]);
    expect(prototypeKeys(sparse)).toStrictEqual(["0", "2"]);
    expect(lodashKeys(sparse)).toStrictEqual(["0", "1", "2"]);
  });
});
