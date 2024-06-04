import { maxBy } from "@extremejs/utils";

describe("with property as iteratee", () => {
  it("should return the maximum of the provided direct property", () => {
    expect(maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(3);
  });

  it("should return the maximum of the provided nested property", () => {
    expect(maxBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
      .toBe(3);
  });

  it("should return the maximum of the provided property while considering missing values as -Infinity", () => {
    expect(maxBy([{ a: { b: 8 } }, { a: {} }, { }], "a.b"))
      .toBe(8);
  });
});

describe("with function as iteratee", () => {
  it("should return the -Infinity", () => {
    expect(maxBy<number>([], number => number)).toBe(-Infinity);
  });

  it("should return the maximum of the elements", () => {
    expect(maxBy([1, 2, 3], number => number)).toBe(3);
  });

  it("should return the maximum of the provided direct property", () => {
    expect(maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(3);
  });

  it("should return the maximum of the provided nested property", () => {
    expect(maxBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
      .toBe(3);
  });
});
