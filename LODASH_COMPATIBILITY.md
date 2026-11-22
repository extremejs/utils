# Lodash compatibility inventory

Compatibility tests and benchmarks use the main [`lodash` package at 4.18.1](https://www.npmjs.com/package/lodash/v/4.18.1) and the [matching upstream test tag](https://github.com/lodash/lodash/tree/4.18.1/test). Update the exact dev dependency and upstream test references together.

## Math

### `_.sumBy`

**Covered** for summing numeric values selected by a callback or property path.

| Lodash invocation | ExtremeJS invocation |
| --- | --- |
| `_.sumBy(values, callback)` | `sumBy(values, callback)` or `sumByFn(values, callback)` |
| `_.sumBy(values, path)` | `sumBy(values, path)` or `sumByProperty(values, path)` |

ExtremeJS requires an explicit selector. Use an identity callback for the default Lodash call. For an array entry, use a string index such as `"0"` with ExtremeJS. Property shorthands follow ExtremeJS's [`get`](src/get.ts) path syntax. Given both a literal key `"a.b"` and a nested property at that path, ExtremeJS reads the nested property and Lodash reads the literal key.

ExtremeJS starts at positive zero and skips sparse array holes. Lodash starts with the first defined result and visits holes as `undefined`. For property selectors, ExtremeJS counts missing and nullish values as zero. Lodash skips `undefined`, returns `undefined` if all lookups in a nonempty array yield `undefined`, and includes `null` as a value.

#### Upstream scenario decisions

The `lodash compatibility` suites live in [`sum-by.spec.ts`](src/sum-by.spec.ts), [`sum-by-fn.spec.ts`](src/sum-by-fn.spec.ts), and [`sum-by-property.spec.ts`](src/sum-by-property.spec.ts).

| Upstream scenario | Pilot coverage |
| --- | --- |
| [Explicit iteratee and unary callback arguments](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21500-L21528) | Both callback entry points check the numeric result and arguments received on each call. |
| [String property and numeric array-index shorthands](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21528-L21534) | Both property entry points check direct keys, deep paths, and array indices. The index case uses `"0"` for both libraries, which also fits the Lodash type definitions. |
| Summing numbers and propagating `NaN` ([sum](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21545-L21549), [`NaN`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21569-L21573)) | The callback variants use explicit identity callbacks. The property variants sum numeric fields, including `NaN`. |
| [Empty inputs](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21551-L21561) | All three exports cover empty arrays. The other upstream inputs are outside the array contract. |
| [Skipping `undefined`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21563-L21567) | The property variants cover mixed numeric and undefined results, plus the different behavior when every lookup yields `undefined`. Callbacks are expected to return numbers. See the type follow-up below. |
| [String concatenation](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21575-L21579) | String results are outside the intended numeric contract. |
| [Overriding `_.iteratee`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12740-L12751) | The local API takes an explicit selector and has no global iteratee override. |

#### Type follow-up

The current `sumBy` type permits callbacks that return `undefined`, and both property variants can accept paths to nonnumeric values. These inputs fall outside the intended numeric contract. For example, a callback returning `undefined` after a numeric value yields `NaN` in ExtremeJS and is skipped by Lodash. Review the selector types separately before making these behaviors part of the compatibility contract.

#### Benchmarks

```sh
pnpm bench
pnpm bench benchmarks/sum-by.bench.ts
pnpm bench benchmarks/sum-by.bench.ts -t sumByFn
```

The [benchmark](benchmarks/sum-by.bench.ts) compares each mapped call form on the same 32- and 2,048-record arrays. Each pair uses the same callback or nested path and checks both results against the expected total before timing. The command builds ExtremeJS and loads its compiled JavaScript in Node, alongside the installed Lodash package.

Use [`runBenchmark`](test/benchmark.ts) to register a baseline and any alternatives with Vitest. Use the exact package names as labels. The annotation compares throughput using the standard table's `hz` column. Vitest ranks its rows by mean latency. A solo run shows the standard table alone.

The workloads use dense arrays with numeric values at every path so both libraries perform equivalent work. Sparse arrays, missing-only paths, and ambiguous dotted keys can produce different observable results and are excluded from timing.
