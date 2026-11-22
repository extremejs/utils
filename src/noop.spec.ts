import { noop } from "@extremejs/utils";
import { noop as lodashNoop } from "lodash";
import { describe, expect, it } from "vitest";

describe("lodash compatibility", () => {
  it("returns undefined when called directly", () => {
    // oxlint-disable-next-line typescript/no-confusing-void-expression
    expect(noop()).toBeUndefined();

    // oxlint-disable-next-line typescript/no-confusing-void-expression
    expect(lodashNoop()).toBeUndefined();
  });

  it("returns undefined each time it is called as a callback", () => {
    const values = [1, 2];

    expect(values.map(noop)).toStrictEqual([void 0, void 0]);
    expect(values.map(lodashNoop)).toStrictEqual([void 0, void 0]);
  });
});
