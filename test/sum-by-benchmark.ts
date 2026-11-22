import type { TestContext } from "vitest";
import { runBenchmark } from "./benchmark.js";

interface PointsRecord {
  metrics: { points: number; };
}

interface SumByInput {
  expected: number;
  path    : "metrics.points";
  values  : PointsRecord[];
  selectPoints(value: PointsRecord): number;
}

interface SumByWorkload {
  expected: number;
  extreme(): number;
  lodash(): number;
}

const SUM_BY_INPUT_SIZES = [32, 2048];

function selectPoints({ metrics }: PointsRecord): number {
  return metrics.points;
}

function sumByInput(size: number): SumByInput {
  return {
    expected: size * (size + 1) / 2,
    path    : "metrics.points",
    values  : Array.from({ length: size }, (_, index) => ({ metrics: { points: index + 1 } })),
    selectPoints,
  };
}

async function compareSumBy(
  context: TestContext,
  { expected, extreme, lodash }: SumByWorkload,
): Promise<void> {
  context.expect(extreme()).toBe(expected);
  context.expect(lodash()).toBe(expected);

  await runBenchmark(
    context,
    {
      name: "@extremejs/utils",
      run : extreme,
    },
    {
      name: "lodash",
      run : lodash,
    },
  );
}

export { SUM_BY_INPUT_SIZES, compareSumBy, sumByInput };
