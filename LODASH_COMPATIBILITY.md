# Lodash compatibility inventory

Compatibility tests and benchmarks use the main [`lodash` package at 4.18.1](https://www.npmjs.com/package/lodash/v/4.18.1) and the [matching upstream test tag](https://github.com/lodash/lodash/tree/4.18.1/test). Update the exact dev dependency and upstream test references together.

## Array and Collection

The pinned API reference lists the [Array and Collection methods](https://lodash.com/docs/4.18.1#chunk). The array capability is **Covered** for each call below. The ExtremeJS inputs are mutable arrays, plus strings where indicated. Lodash also accepts several array-like or nullish inputs outside these contracts.

| Lodash invocation | ExtremeJS invocation | Migration notes |
| --- | --- | --- |
| `_.chunk(array, size)` | `chunk(array, size)` | Both default to groups of one. Use positive integer sizes. The final group can be shorter. |
| `_.compact(array)` | `compact(array)` | Both keep truthy elements in order, including the strings `"0"` and `"false"`. |
| `_.concat(array, ...items)` | `concat(array, ...items)` | ExtremeJS requires a base array and uses native spreadability rules. Lodash also accepts an omitted or scalar base, flattens appended arguments objects, and spreads appended arrays even when they opt out with `Symbol.isConcatSpreadable`. |
| `_.drop(array, n)` | `drop(array, n)` | Both default to dropping one. Use a nonnegative count for equivalent calls. ExtremeJS also returns a suffix string from string input. |
| `_.dropRight(array, n)` | `dropRight(array, n)` | Both default to dropping one. Use an integer count for equivalent calls. ExtremeJS also returns a prefix string from string input. |
| `_.fill(array, value, start, end)` | `fill(array, value, start, end)` | Both write in place. ExtremeJS always returns the input array. Lodash returns a fresh array for empty input. |
| `_.head(value)`, alias `_.first(value)` | `first(value)` | Reads the first element or the first UTF-16 code unit of a string. |
| `_.initial(array)` | `head(array)` | Removes the final element. ExtremeJS also removes the final UTF-16 code unit of a string and returns a string. |
| `_.join(array, separator)` | `join(array, separator)` | ExtremeJS defaults to `""`. Lodash defaults to `","`. Pass a separator explicitly when migrating. |
| `_.last(value)` | `last(value)` | Reads the final element or the final UTF-16 code unit of a string. |
| `_.slice(array, start, end)` | `slice(array, start, end)` | Both default to the full range, with an exclusive end. ExtremeJS also returns a substring from string input. |
| `_.tail(array)` | `tail(array)` | Removes the first element. ExtremeJS also removes the first UTF-16 code unit of a string and returns a string. |

ExtremeJS preserves holes when copying arrays with `chunk`, `concat`, `drop`, `dropRight`, `head`, `slice`, and `tail`. Lodash creates explicit `undefined` entries in those positions. When given strings, Lodash's `drop`, `dropRight`, `initial`, `slice`, and `tail` return arrays of UTF-16 code units. The corresponding ExtremeJS calls return strings.

### Missing capabilities

These entries have no dedicated ExtremeJS public utility. `slice` can express individual `take` and `takeRight` calls with explicit bounds, and `first` and `last` can express the endpoint cases of `nth`. A generalized selector or predicate-based filter still needs its own API. In particular, `compact` only provides truthiness filtering.

| Lodash category and capability | Missing Lodash entries |
| --- | --- |
| Array slicing and selection | `dropRightWhile`, `dropWhile`, `nth`, `take`, `takeRight`, `takeRightWhile`, `takeWhile` |
| Array search and sorted insertion | `findIndex`, `findLastIndex`, `indexOf`, `lastIndexOf`, `sortedIndex`, `sortedIndexBy`, `sortedIndexOf`, `sortedLastIndex`, `sortedLastIndexBy`, `sortedLastIndexOf` |
| Array mutation | `pull`, `pullAll`, `pullAllBy`, `pullAllWith`, `pullAt`, `remove`, `reverse` |
| Array flattening and set operations | `difference`, `differenceBy`, `differenceWith`, `flatten`, `flattenDeep`, `flattenDepth`, `intersection`, `intersectionBy`, `intersectionWith`, `sortedUniq`, `sortedUniqBy`, `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `without`, `xor`, `xorBy`, `xorWith` |
| Array pairing and transposition | `fromPairs`, `unzip`, `unzipWith`, `zip`, `zipObject`, `zipObjectDeep`, `zipWith` |
| Collection traversal and transformation | `flatMap`, `flatMapDeep`, `flatMapDepth`, `forEach` (alias `each`), `forEachRight` (alias `eachRight`), `invokeMap`, `map`, `reduce`, `reduceRight` |
| Collection search and predicates | `every`, `filter`, `find`, `findLast`, `includes`, `reject`, `some` |
| Collection grouping, ordering, and sampling | `countBy`, `groupBy`, `keyBy`, `orderBy`, `partition`, `sample`, `sampleSize`, `shuffle`, `size`, `sortBy` |

### Upstream scenario decisions

Each mapped utility has a colocated `lodash compatibility` suite. The sources below refer to the pinned Lodash 4.18.1 tests.

| Lodash scenario source | Coverage and decision |
| --- | --- |
| [`chunk`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2536-L2594) | Covers the default size, even chunks, a remainder, and empty input. Positive integers are the documented local size. Lodash's minimum-size and fractional normalization are pending a contract decision below. |
| [`compact`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L3166-L3226) | Covers falsy removal and preserving truthy values in order. The lazy-sequence cases, including the global `_.iteratee` override, require Lodash wrappers. |
| [`concat`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L3230-L3307) | Covers a shallow copy, scalar and one-level array appends, and sparse arrays. Missing and scalar bases are outside the local base-array contract. |
| [`drop`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5076-L5160) and [`dropRight`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5164-L5248) | Covers defaults, zero, explicit counts, bounds, sparse arrays, and string outcomes. Covers fractional `drop` and negative integer `dropRight` where the results match. Negative finite `drop`, fractional `dropRight`, and `dropRight` with `NaN` need a contract decision below. |
| [`fill`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5686-L5847) | Covers defaults, mutation and return identity, positive and negative numeric bounds, fractional truncation, `NaN`, and no-op ranges. Uses an explicit `undefined` value on a sparse array because the local fill value is required. Empty input identity is tested separately. |
| [`head` and alias `first`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L8062-L8158) and [`last`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L13171-L13252) | Covers direct selection, ordinary empty arrays, use in `map`, and string indexing. The empty-array case with an indexed prototype property in `head`, and the annotated negative-key check in `last`, are tracked below. |
| [`initial`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L8297-L8369) and [`tail`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21584-L21679) | Covers dropping one endpoint, empty arrays, use in `map`, and empty and nonempty strings. Missing and other falsy non-array inputs fall outside the local input type. |
| [`join`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12839-L12873) | Covers an explicit separator. The default separator difference and empty fields are also tested. |
| [`slice`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L20485-L20649) and [shared `slice` and `toArray` scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L23486-L23536) | Covers default shallow copies, bounds, numeric truncation, sparse arrays, and string results. Generic array-likes, arguments objects, and DOM node lists exceed the local input type. |
| [Cross-method array scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26899-L26946) and [falsy arguments and array returns](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L27069-L27159) | Arguments objects as the primary input, nullish inputs, and other unsupported falsy primary inputs are outside the array or string contracts. Ordinary array results are covered in the suites. |
| [Iteratee-call guards](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5822-L5829) | The guarded `map` cases in the `chunk`, `drop`, `dropRight`, `fill`, and `slice` suites depend on Lodash recognizing a callback's extra arguments. Use a unary adapter such as `values.map(value => drop(value))` to apply the local defaults. |
| [Falsy and string index coercion in `fill`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5724-L5734) and [`slice`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L20589-L20599) | Tests exercise numeric indices and optional defaults. String, boolean, and null indices are outside the local index types. The same restriction applies to nonnumeric `size` and `n` in the `chunk` and `drop` families. |
| [Wrapped results](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26717-L26895) and the wrapper scenarios in the method suites above | Implicit and explicit chaining, lazy evaluation, and delayed callback execution are deferred to the wrapper API. |

### Maintainer decisions and follow-ups

- **Chunking and dropping.** Which policy should apply to invalid or fractional sizes and counts? On a nonempty array, `chunk(array, 0)` throws `RangeError` while Lodash returns `[]`. With size `1.5`, ExtremeJS produces uneven groups while Lodash uses size `1`. On `[1, 2, 3]`, `drop(array, -1)` returns `[3]` while Lodash leaves all three elements. For `dropRight(array, 1.6)`, ExtremeJS returns `[1]` and Lodash returns `[1, 2]`. With `NaN`, ExtremeJS returns `[]` and Lodash returns all three elements.
- **Endpoint selection.** Should length-zero arrays ignore indexed properties? A custom prototype with a `0` property is visible to `first`, and a `"-1"` property is visible to `last`. Lodash checks length before reading either index.
- **Concatenation.** Is the scalar-base overload a future port? The coverage above describes concatenation with a base array. The scalar and omitted-base call forms are candidates for a separate capability if the overload is wanted.
- **Return types.** `CompactT<number>` resolves to `never` because TypeScript types `Number.NaN` as `number`. It also retains `0n` even though the runtime filters it out. `HeadT<number[]>` and `TailT<number[]>` resolve to `number` despite the array result. The general array branches of `FirstT` and `LastT` can omit `undefined` for empty or sparse arrays. The generic return type used by `slice`, `drop`, and `dropRight` can also retain a tuple or string literal type after shortening the input. Review these signatures together as a separate type change.

### Benchmarks

Run all benchmarks with `pnpm bench`. For an individual utility, use its colocated file, for example `pnpm bench src/head.bench.ts` or `pnpm bench src/fill.bench.ts`.

Each mapped utility has a paired workload. Traversal, copying, and mutation workloads use dense arrays with 32 and 2,048 elements. `first` and `last` use one size because their work is a single indexed read. `join` passes an explicit comma separator to both implementations. `fill` includes the same fresh array copy in both timed calls and validates the resulting contents before timing.

Sparse copies, differing string result types, invalid size/count behavior, and empty-array fill identity have different observable results for the same input. They are useful compatibility cases or follow-ups and are excluded from direct timing. Lodash-only entries have no ExtremeJS workload to pair.

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
| [Explicit iteratee and unary callback arguments](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21500-L21528) | A parameterized case in [`sum-by.spec.ts`](src/sum-by.spec.ts) checks the numeric result and arguments received by both callback entry points and Lodash. |
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
pnpm bench src/sum-by.bench.ts
pnpm bench src/sum-by-fn.bench.ts
pnpm bench src/sum-by-property.bench.ts
```

The benchmarks sit alongside their implementations. [`sumBy`](src/sum-by.bench.ts) covers both selector forms, [`sumByFn`](src/sum-by-fn.bench.ts) covers callbacks, and [`sumByProperty`](src/sum-by-property.bench.ts) covers property paths. Each comparison uses the same 32- and 2,048-record inputs and checks both results against the expected total before timing. The command builds ExtremeJS and loads its compiled JavaScript in Node, alongside the installed Lodash package.

For future utilities, add a `*.bench.ts` file next to the implementation. Keep the inputs, selectors, and expected results in that file. Import the utility from `@extremejs/utils` and its counterpart from the pinned `lodash` package. Compare equivalent calls on the same input data. If a call mutates its input, give each invocation a fresh input and include equivalent setup in each workload. Document any Lodash scenarios that lack a fair comparison.

Import [`benchmark`](test/benchmark.ts) from `#test` and call `benchmark(context, expected, workload)`. The first entry supplies a `run` function for the baseline, labeled with the name in `package.json`. Each alternative supplies a `run` function and its package name as a distinct label. The helper awaits each result and checks it against `expected` with strict deep equality before timing.

Vitest reports throughput in `hz` and ranks its rows by mean latency. The annotation compares throughput against the baseline. When color is enabled, a faster baseline is shown in green, a slower baseline in red, and a tie in plain text. A solo run shows the standard table alone.

The workloads use dense arrays with numeric values at every path so both libraries perform equivalent work. Sparse arrays, missing-only paths, and ambiguous dotted keys can produce different observable results and are excluded from timing.
