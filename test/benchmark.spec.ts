import { describe, expect, it } from "vitest";
import { formatBenchmarkComparison } from "./benchmark.js";

function result(name: string, mean: number): Parameters<typeof formatBenchmarkComparison>[0] {
  return {
    name,
    throughput: { mean },
  };
}

describe("benchmark comparison", () => {
  it("should omit the comparison for a solo implementation", () => {
    expect(formatBenchmarkComparison(result("@extremejs/utils", 600_000), [])).toEqual([]);
  });

  it("should show the relative speed for every alternative", () => {
    expect(formatBenchmarkComparison(result("@example/baseline", 600_000), [
      result("library-c", 900_000),
      result("lodash", 300_000),
      result("Prototyped.js", 200_000),
      result("library-d", 600_000),
    ])).toEqual([
      "Alternative    @example/baseline advantage",
      "library-c      1.5x slower",
      "lodash         2x faster",
      "Prototyped.js  3x faster",
      "library-d      tie",
    ]);
  });
});
