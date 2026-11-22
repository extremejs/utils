import type { TestBenchmark } from "vitest";
import { DefaultReporter } from "vitest/node";
import { formatBenchmarkTable } from "./benchmark.js";

export default class BenchmarkReporter extends DefaultReporter {

  protected override printBenchmarkTable(benchmarks: readonly TestBenchmark[], padding: string): void {
    for (const benchmark of benchmarks) {
      const table = formatBenchmarkTable(benchmark.name, benchmark.tasks);

      if (table.length === 0) {
        super.printBenchmarkTable([benchmark], padding);
        continue;
      }

      for (const row of table) this.log(`   ${ padding }${ row }`);
    }
  }

}
