import { identity } from "@extremejs/utils";
import { identity as lodashIdentity } from "lodash";
import { describe, expect, it } from "vitest";

describe("lodash compatibility", () => {
  it("returns the original value, including the same object reference", () => {
    const object = { name: "fred" };

    for (const value of [object, null, false, "", -0, Number.NaN]) {
      expect(identity(value)).toBe(value);
      expect(lodashIdentity(value)).toBe(value);
    }
  });

  it("uses explicit undefined for the local equivalent of an omitted argument", () => {
    // oxlint-disable-next-line typescript/no-confusing-void-expression
    expect(identity(void 0)).toBeUndefined();

    // oxlint-disable-next-line typescript/no-confusing-void-expression
    expect(lodashIdentity()).toBeUndefined();
  });
});
