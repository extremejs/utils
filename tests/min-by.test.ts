import { minBy } from "@extremejs/utils";

describe("with property as iteratee", () => {
  it("should return the minimum of the provided direct property", () => {
    expect(minBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(1);
  });

  it("should return the minimum of the provided nested property", () => {
    expect(minBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
      .toBe(1);
  });

  it("should return the minimum of the provided property while considering missing values as Infinity", () => {
    expect(minBy([{ a: { b: 8 } }, { a: {} }, { }], "a.b"))
      .toBe(8);
  });
});

describe("with function as iteratee", () => {
  it("should return the Infinity", () => {
    expect(minBy<number>([], number => number)).toBe(Infinity);
  });

  it("should return the minimum of the elements", () => {
    expect(minBy([1, 2, 3], number => number)).toBe(1);
  });

  it("should return the minimum of the provided direct property", () => {
    expect(minBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(1);
  });

  it("should return the minimum of the provided nested property", () => {
    expect(minBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
      .toBe(1);
  });
});
