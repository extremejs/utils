import { meanBy } from "@extremejs/utils";

describe("with property as iteratee", () => {
  it("should return the NaN", () => {
    expect(meanBy<{ a: number }>([], "a")).toBeNaN();
  });

  it("should return the mean of the provided direct property", () => {
    expect(meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a")).toBe(2);
  });

  it("should return the mean of the provided nested property", () => {
    expect(meanBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], "a.b"))
      .toBe(2);
  });
});

describe("with function as iteratee", () => {
  it("should return the NaN", () => {
    expect(meanBy<number>([], number => number)).toBeNaN();
  });

  it("should return the mean of the elements", () => {
    expect(meanBy([1, 2, 3], number => number)).toBe(2);
  });

  it("should return the mean of the provided direct property", () => {
    expect(meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a)).toBe(2);
  });

  it("should return the mean of the provided nested property", () => {
    expect(meanBy([{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 3 } }], ({ a }) => a.b))
      .toBe(2);
  });
});
