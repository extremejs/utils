import { sumBy } from "@extremejs/utils";

describe("with property as iteratee", () => {
  it("should return the sum of the provided direct property", () => {
    expect(sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(6);
  });

  it("should return the sum of the provided nested property", () => {
    expect(sumBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
      .toBe(6);
  });
});

describe("with function as iteratee", () => {
  it("should return the sum of the elements", () => {
    expect(sumBy([1, 2, 3], number => number)).toBe(6);
  });

  it("should return the sum of the provided direct property", () => {
    expect(sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(6);
  });

  it("should return the sum of the provided nested property", () => {
    expect(sumBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
      .toBe(6);
  });
});
