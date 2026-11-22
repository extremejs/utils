import type { Bench, BenchFn } from "vitest";

interface Implementation {
  name: string;
  run : BenchFn;
}

interface BenchmarkResult {
  name      : string;
  throughput: { mean: number; };
}

const throughputFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits   : 0,
  maximumSignificantDigits: 3,
  roundingPriority        : "morePrecision",
});
const ratioFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

function formatComparison(baseline: number, alternative: number): string {
  if (baseline === alternative) return "tie";

  const faster = baseline > alternative;
  const ratio = faster ? baseline / alternative : alternative / baseline;
  const rounded = ratioFormat.format(ratio);

  return `${ rounded === "1" ? "<1.01" : rounded }x ${ faster ? "faster" : "slower" }`;
}

export async function runBenchmark(
  bench: Bench,
  baseline: Implementation,
  ...alternatives: Implementation[]
): Promise<void> {
  // Vitest ranks results by latency. Keep the baseline name with the group for the reporter.
  const options = { name: baseline.name };
  const reference = bench(baseline.name, baseline.run);

  if (alternatives.length === 0) {
    await reference.run(options);
    return;
  }

  await bench.compare(reference, ...alternatives.map(({ name, run }) => bench(name, run)), options);
}

export function formatBenchmarkTable(
  baselineName: string,
  results: readonly BenchmarkResult[],
): string[] {
  const baseline = results.find(result => result.name === baselineName);

  if (!baseline) return [];

  const alternatives = results.filter(result => result !== baseline);
  const hasAlternatives = alternatives.length > 0;
  const rows: Array<[string, string, string]> = [
    ["Implementation", "ops/s", hasAlternatives ? `${ baseline.name } advantage` : ""],
    [baseline.name, throughputFormat.format(baseline.throughput.mean), hasAlternatives ? "baseline" : ""],
    ...alternatives.map(({ name, throughput }): [string, string, string] => [
      name,
      throughputFormat.format(throughput.mean),
      formatComparison(baseline.throughput.mean, throughput.mean),
    ]),
  ];
  const nameWidth = Math.max(...rows.map(([name]) => name.length));
  const throughputWidth = Math.max(...rows.map(([, throughput]) => throughput.length));

  return rows.map(([name, throughput, comparison]) => {
    const columns = [name.padEnd(nameWidth), throughput.padStart(throughputWidth), comparison];

    return columns.join("  ").trimEnd();
  });
}
