import type { BenchFn, TestContext } from "vitest";
import pkg from "../package.json" with { type: "json" };

interface BaseLineImplementation {
  run: BenchFn;
}

interface Implementation extends BaseLineImplementation {
  name: string;
}

interface BenchmarkResult {
  name      : string;
  throughput: { mean: number; };
}

const ratioFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

function formatComparison(baseline: number, alternative: number): string {
  if (baseline === alternative) return "tie";

  const faster = baseline > alternative;
  const ratio = faster ? baseline / alternative : alternative / baseline;
  const rounded = ratioFormat.format(ratio);

  return `${ rounded === "1" ? "<1.01" : rounded }x ${ faster ? "faster" : "slower" }`;
}

export function formatBenchmarkComparison(
  baseline: BenchmarkResult,
  alternatives: readonly BenchmarkResult[],
): string[] {
  if (alternatives.length === 0) return [];

  const label = "Alternative";
  const nameWidth = Math.max(label.length, ...alternatives.map(({ name }) => name.length));

  return [
    `${ label.padEnd(nameWidth) }  ${ pkg.name } advantage`,
    ...alternatives.map(({ name, throughput }) => {
      const comparison = formatComparison(baseline.throughput.mean, throughput.mean);

      return `${ name.padEnd(nameWidth) }  ${ comparison }`;
    }),
  ];
}

export async function benchmark(
  { annotate, bench, expect }: TestContext,
  expected: unknown,
  workload: readonly [BaseLineImplementation, ...Implementation[]],
): Promise<void> {
  const [baseline, ...alternatives] = workload;

  expect(baseline).toBeDefined();

  for (const { run } of workload) expect(run()).toBe(expected);

  const reference = bench(pkg.name, baseline.run);

  if (alternatives.length === 0) {
    await reference.run();

    return;
  }

  const results = await bench.compare(reference, ...alternatives.map(({ name, run }) => bench(name, run)));

  const rows = formatBenchmarkComparison(
    results.get(pkg.name),
    alternatives.map(({ name }) => results.get(name)),
  );

  // The verbose reporter prefixes the first annotation line with seven columns.
  await annotate(rows.join("\n       "));
}
