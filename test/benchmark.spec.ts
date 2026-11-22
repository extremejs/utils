import { describe, expect, it } from "vitest";
import { formatBenchmarkTable } from "./benchmark.js";

function result(name: string, mean: number): Parameters<typeof formatBenchmarkTable>[1][number] {
  return {
    name,
    throughput: { mean },
  };
}

describe("benchmark table", () => {
  it("should show throughput alone for a solo implementation", () => {
    expect(formatBenchmarkTable("@extremejs/utils", [result("@extremejs/utils", 600_000)])).toEqual([
      "Implementation      ops/s",
      "@extremejs/utils  600,000",
    ]);
  });

  it("should place the baseline first and compare its throughput with every alternative", () => {
    expect(formatBenchmarkTable("@extremejs/utils", [
      result("library-c", 900_000),
      result("@extremejs/utils", 600_000),
      result("lodash", 300_000),
      result("Prototyped.js", 200_000),
      result("library-d", 600_000),
    ])).toEqual([
      "Implementation      ops/s  @extremejs/utils advantage",
      "@extremejs/utils  600,000  baseline",
      "library-c         900,000  1.5x slower",
      "lodash            300,000  2x faster",
      "Prototyped.js     200,000  3x faster",
      "library-d         600,000  tie",
    ]);
  });
});
