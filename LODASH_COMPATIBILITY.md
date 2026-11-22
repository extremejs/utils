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

### Arithmetic and aggregates

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.add(a, b)`, `_.divide(a, b)`, `_.multiply(a, b)`, `_.subtract(a, b)` | `add(a, b)`, `divide(a, b)`, `multiply(a, b)`, `subtract(a, b)` | **Covered** for two numbers. Supply both operands. Lodash also handles omitted operands and accepts nonnumeric operands. |
| `_.max(numbers)`, `_.min(numbers)` | `max(numbers)`, `min(numbers)` | **Covered** for numeric extrema. ExtremeJS skips holes, propagates `NaN`, and uses `-Infinity` for an empty maximum and `Infinity` for an empty minimum. Lodash skips `NaN` and uses `undefined` when nothing qualifies. ExtremeJS orders the two signed zeros, while Lodash keeps the first tied value. |
| `_.maxBy(values, selector)`, `_.minBy(values, selector)` | `maxBy`, `maxByFn`, `maxByProperty`, `minBy`, `minByFn`, `minByProperty` | **Partial**. The local exports compute the extreme numeric score. Selecting and returning the original winning element, with Lodash's first-wins tie behavior, needs its own capability. |
| `_.mean(numbers)` | `mean(numbers)` | **Covered**. Both divide by the full array length and return `NaN` for an empty array. A nonempty array of only holes produces zero in ExtremeJS and `NaN` in Lodash. |
| `_.meanBy(values, selector)` | `meanBy(values, selector)`, `meanByFn(values, callback)`, `meanByProperty(values, path)` | **Covered** for numeric averages by callback or property path. Both divide by the full length. ExtremeJS skips holes during summation and treats missing or nullish properties as zero. Lodash skips `undefined` results and adds `null` as a value. When every lookup in a nonempty array yields `undefined`, ExtremeJS returns zero and Lodash returns `NaN`. |
| `_.sum(numbers)` | `sum(numbers)` | **Covered**. Both return zero for an empty array and propagate `NaN`. A nonempty array of only holes yields zero in ExtremeJS and `undefined` in Lodash. |

Use the `By` exports with a callback or property path, `ByFn` with a callback, and `ByProperty` with a path. Both libraries pass a single element to callbacks. ExtremeJS requires a selector and skips sparse holes. Lodash defaults to identity and supplies `undefined` for holes. ExtremeJS uses its [`get`](src/get.ts) path syntax and reads nested values when both a dotted literal key and the matching path exist. Lodash prefers the literal key. For `maxBy*` and `minBy*`, missing and nullish properties contribute the corresponding infinity sentinel in ExtremeJS. Lodash skips them. ExtremeJS starts sums at positive zero, so Lodash can preserve negative zero where `sum`, `mean`, or `meanBy*` returns positive zero.

For a dense array with comparable numeric scores, apply the callback again to the returned Lodash element or look up the winning property to obtain its score. When both signed zeros tie, Lodash keeps the first element, while ExtremeJS prefers positive zero for a maximum and negative zero for a minimum. For example, `maxBy([{ score: 1 }, { score: 3 }], "score")` yields `3` in ExtremeJS and `{ score: 3 }` in Lodash. The extra read or callback can be observable. A callback used this way should be pure, and the two libraries' empty, sparse, and `NaN` cases still need their own handling.

### Missing math capabilities

The [Lodash Math API](https://lodash.com/docs/4.18.1#add) also includes `ceil`, `floor`, and `round`. ExtremeJS has no dedicated precision-aware rounding exports.

### Upstream scenario decisions

Each mapped export has a colocated `lodash compatibility` suite. Scenarios outside the typed input contracts are recorded here.

| Lodash 4.18.1 scenario source | Coverage and decision |
| --- | --- |
| [`add`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L1170-L1187), [`divide`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5055-L5072), [`multiply`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L16009-L16026), and [`subtract`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21397-L21414) | Covers the positive and negative numeric operand pairs. String concatenation or conversion is outside the two-number contract. |
| [Shared arithmetic scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21418-L21496) | Covers signed-zero results with two numeric operands and adds division by zero and `NaN` cases. Omitted or `undefined` operands (including single-operand signed zero), object and symbol conversion, and wrapped calls exceed the local contracts. |
| [`max`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L14566-L14595) and [`min`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L15662-L15691) | Covers numeric arrays, empty results, and the sparse, signed-zero, and `NaN` differences. Missing arguments, falsy non-arrays, and strings in the array fall outside the numeric array contract. |
| [Shared extrema scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L15695-L15772) | Covers large arrays, negative callback scores, direct keys, array indices, and infinite tied scores. Uses string array indices in both APIs to fit the public types. The date-object comparisons require comparing nonnumeric scores or returning the date itself. Chained single-element calls require wrapper support. |
| [Shared iteration scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L6856-L7133) | For `maxBy` and `minBy` callbacks, checks unary arguments, iteration across sparse arrays, and ignoring custom array properties. Implicit and explicit wrapper cases are deferred. |
| [`mean` and `meanBy`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L14599-L14654) | Covers numeric averages, empty arrays, unary callback arguments, direct keys, and string array indices. Other empty or falsy values exceed the local array contract. Added nested paths, sparse inputs, and missing and nullish property tests. |
| [`sum`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21539-L21581) | Covers numeric totals, empty arrays, and `NaN` propagation. Explicit `undefined` entries, strings, and non-array inputs fall outside `number[]`. Actual sparse holes and signed zero have separate comparisons. The `sumBy` section below covers its own cases. |
| [Lodash iteratee shorthands](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12144-L12204) | Object and property-value pair selectors produce boolean match results. They fall outside the local numeric callback and property-path contracts. |
| [Global iteratee overrides](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12560-L12595), [wrapped results](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26717-L26895), and [falsy arguments](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L27069-L27159) | ExtremeJS has no global iteratee override. Wrapper scenarios are deferred. Unsupported falsy inputs are outside the typed signatures. |

### Maintainer decisions and follow-ups

- **Extrema.** Should element selection ship as a separate API with first-wins ties? The existing `maxBy*` and `minBy*` numeric results cannot identify the winning record.
- **Numeric selector types.** As in the `sumBy` pilot, the generic `By` signatures can accept callbacks whose results are nonnumeric, and property selectors can point to nonnumeric values. Should the extrema and mean selector types be tightened together with `sumBy`? An accepted `undefined` callback result can produce `NaN`, while Lodash skips it. These are candidates for a type follow-up.

### Arithmetic and aggregate benchmarks

Run `pnpm bench` or target a colocated file such as `pnpm bench src/max-by.bench.ts`. Arithmetic benchmarks use two numbers. The array benchmarks use 32 and 2,048 dense entries, and property selectors use the same nested path. For `maxBy*` and `minBy*`, the test title identifies the extra callback or path lookup timed in the Lodash row. The benchmark helper verifies both returned scores before timing.

The fixtures exclude inputs that select different scores or require different traversal, including empty or sparse extrema, `NaN` scores, signed-zero differences, and ambiguous dotted keys. No same-result local pair exists for returning the winning record or for the missing Lodash entries.

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

## Number

The [Lodash Number API](https://lodash.com/docs/4.18.1#clamp) entries `clamp`, `inRange`, and `random` are **Missing**. `isPositive` only checks sign, with distinct results for signed zero. `isIndex` checks an integer index within a bound. Lodash's `inRange` checks a general numeric interval and can also accept fractions, so it serves a different use case.

`isEven`, `isOdd`, `isPositive`, and `isIndex` have no public Lodash counterparts or paired benchmarks. The pinned [private `isIndex` test cases](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L931-L971) inform the local tests for canonical decimal strings, fractions, negative indices, and the exclusive length bound. Calling a private Lodash module or combining public predicates would measure a different API.

### Maintainer decisions and follow-ups

- **Parity.** `isOdd(-3)` currently returns `false` because the signed remainder is `-1`. Should negative odd integers return `true`, as they do under the usual parity definition? The existing tests leave that decision open.
- **Index validation.** Should `isIndex` explicitly accept only numbers and canonical decimal strings, returning `false` for other inputs? The `unknown` parameter permits calls such as `isIndex(1n)`, which throws during remainder calculation. Coercion can also accept objects such as `[1]`. Those cases need a contract decision before adding regression expectations.

## String

The [Lodash String category](https://lodash.com/docs/4.18.1#camelCase) is mapped below by capability. The table also includes `isString` from Lodash's Lang category because ExtremeJS groups it with its string utilities. The transformations and searches take a string as input. Lodash also accepts inputs that it can coerce to strings.

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.camelCase(string)`, `_.kebabCase(string)`, `_.snakeCase(string)` | `camelCase(string)`, `kebabCase(string)`, `snakeCase(string)` | **Covered** for formatting ASCII letter and digit runs. Lodash recognizes Unicode words and emoji, deburrs Latin letters, joins contraction suffixes, and recognizes ordinals as words. |
| `_.capitalize(string)` | `capitalize(string)` | **Covered** for lowercasing the full string and capitalizing its beginning. ExtremeJS uppercases the first UTF-16 code unit, while Lodash can uppercase an astral letter at the start. |
| `_.lowerFirst(string)`, `_.upperFirst(string)` | `lowerFirst(string)`, `upperFirst(string)` | **Covered** for changing case at the start while preserving the remainder. ExtremeJS cases the first UTF-16 code unit, while Lodash can case an entire astral letter. |
| `_.toLower(string)`, `_.toUpper(string)` | `lowerCase(string)`, `upperCase(string)` | **Covered** for whole-string case conversion. Spacing and separators are preserved. |
| `_.startsWith(string, target, position)`, `_.endsWith(string, target, position)` | `startsWith(string, searchString, position)`, `endsWith(string, searchString, endPosition)` | **Covered** for case-sensitive literal matches with numeric UTF-16 offsets. The defaults are zero for the start and the string length for the end. |
| `_.repeat(string, n)` | `repeat(string, count)` | **Covered** for repetition with an explicit count. Lodash defaults to one copy and returns an empty string for negative counts. ExtremeJS requires a count and throws for negative counts after truncation. |
| `_.replace(string, pattern, replacement)` | `replace(string, searchValue, replaceValue, all)` | **Covered** for literal and regex patterns and string or callback replacements. ExtremeJS also has an `all` flag for literal replacement. To replace every occurrence of a nonempty literal in Lodash, pass an escaped global regex. |
| `_.split(string, separator, limit)` | `split(string, separator, limit)` | **Covered** for splitting on explicit text or regular expressions. When the separator is omitted, ExtremeJS splits into UTF-16 code units and Lodash returns the whole string in an array. For an explicit empty separator, Lodash preserves Unicode symbols. |
| `_.isString(value)` | `isString(value)` | **Covered** for primitive strings and same-realm boxed strings. Lodash also recognizes boxed strings from another realm. |

`LETTER_CASE_REGEX` is an ExtremeJS-specific export for matching ASCII letter and digit runs. It underlies the local word case formatters. Lodash's `words` returns a token array with a different tokenizer and an optional caller-supplied pattern.

### Missing capabilities

| Lodash capability | Missing Lodash entries |
| --- | --- |
| Rebuild a string as space-separated words in a specified case | `lowerCase`, `upperCase`, `startCase` |
| Normalize accents and extract words | `deburr`, `words` |
| HTML and regex escaping | `escape`, `unescape`, `escapeRegExp` |
| Pad and trim text, optionally with a custom character set | `pad`, `padEnd`, `padStart`, `trim`, `trimEnd`, `trimStart` |
| Parse integers and truncate text | `parseInt`, `truncate` |
| Compile templates | `template` |

The Array and Collection section covers the string overloads of `first`, `last`, `head`, `tail`, `slice`, `drop`, and `dropRight`, along with the array-to-string utility `join`.

### Upstream scenario decisions

| Lodash 4.18.1 scenario source | Coverage and decision |
| --- | --- |
| [Shared case methods](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2220-L2354) and [camelCase](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2358-L2387) | Covers ASCII separators and case transitions, a second conversion pass, numbers and acronyms in camel case, and ignoring mathematical operators. Representative accented text, emoji, straight and curly apostrophes, and ordinals show both tokenization outcomes. The full upstream deburring and contraction matrices test normalization that the ASCII tokenizer does not provide. Cycling through all case methods requires Lodash's space-separated variants. |
| [Whole-string conversion](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L23458-L23483) and [word-converting lowerCase](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L13256-L13266) and [upperCase](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L25496-L25506) | Covers the `toLower` and `toUpper` punctuation examples and Unicode conversion. The similarly named Lodash word formatters are exercised to show their different results. |
| [capitalize](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2391-L2401), [lowerFirst](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L13270-L13280), and [upperFirst](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L25510-L25520) | Covers the upstream ASCII inputs, empty strings, first-position behavior, and a cased astral letter. Capitalizing an emoji leaves it intact in both libraries. |
| [endsWith](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5413-L5472) and [startsWith and shared matching cases](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21258-L21362) | Covers positive and negative matches, optional positions, numeric clamping and truncation, empty targets, and UTF-16 indexing. Boxed and custom-coercing strings, targets, and positions, plus null, boolean, and string offsets, fall outside the declared parameter types. |
| [repeat](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L19299-L19353) | Covers explicit counts, empty input, fractional truncation, zero and NaN, and the negative-count difference. Migrating Lodash's omitted-count call requires passing `1` explicitly. Boxed and custom-coercing strings and nonnumeric counts are outside the signature. |
| [replace](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L19357-L19367) | Covers the upstream literal and global regex examples, plus substitution tokens, replacer arguments, literal replace-all, and the global-flag requirement in all mode. |
| [split](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21126-L21171) and [uncommon symbols](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L24509-L24553) | Covers string and regex delimiters, capture insertion, limits, and empty input. Explicit delimiters preserve adjacent emoji. Omitted and empty separators and limits on Unicode symbol splitting are compared separately because their results differ. The uncommon-symbol assertions for padding, trimming, truncation, sizing, array conversion, and word extraction belong to those methods. |
| [isString](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11718-L11759) | Covers primitive and boxed strings, non-string values including null and undefined, and a boxed string from a separate realm. ExtremeJS requires a value argument, so the upstream missing-value check uses explicit `undefined` locally. |
| [Shared empty inputs](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26975-L27015) and [case coercion and wrappers](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2310-L2341) | Empty strings are tested. Missing and nullish string inputs and custom string coercion are outside the transformation signatures. Wrapped mixed string and array calls and implicit or explicit chaining are deferred. The upstream `map` scenarios for `repeat` and `split` depend on Lodash's iteratee-call guard. Use a unary callback and supply the intended count or separator explicitly. |

### Maintainer decisions and follow-ups

- **Word casing.** Should word casing stay ASCII-based or gain a Unicode mode? Should contractions and ordinals retain their current token boundaries? Independently, review acronym runs followed by digits as a possible tokenizer bug. For example, `kebabCase("XML2Parser")` yields `"x-m-l-2-parser"` where Lodash yields `"xml-2-parser"`.
- **First-letter casing and splitting.** Should the string APIs keep UTF-16 code-unit behavior or work on Unicode symbols for first-letter case conversion and empty-separator splitting? Should splitting with an omitted separator retain the local behavior?
- **Repetition.** Should the explicit count and native range errors remain the repetition contract, or should an omitted count and negative counts eventually be accepted with Lodash's defaults?
- **Split and string predicate types.** An unmatched optional regex capture can put `undefined` in the split result despite its `string[]` type. For example, `split("a;b", /(;)|(,)/)` returns `["a", ";", undefined, "b"]`. The `isString` type guard also narrows boxed strings to primitive `string`. Review these signatures as separate follow-ups.

### Benchmarks

Use `pnpm bench src/split.bench.ts` for one utility or `pnpm bench` for the full suite. Every mapping has a colocated pair that validates equal results before timing. Whole-string transforms, splitting, and replacement use short and repeated inputs. Prefix and suffix checks use explicit UTF-16 positions. Repeat supplies the same count to both calls. The replacement pair uses the same global regex, with the local all flag enabled.

Differing Unicode tokenization and splitting, omitted arguments with different defaults, and error paths produce different observable results. The paired timings use equivalent inputs and results. Missing methods and `LETTER_CASE_REGEX` have no public equivalent to time directly.

## Object, Path, and Iteratee

The [Lodash Object category](https://lodash.com/docs/4.18.1#assign) and the related path and shorthand utilities map by capability.

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.get(value, path, fallback)` | `get(value, path, fallback)` | **Covered** for direct keys and simple deep reads. ExtremeJS applies the fallback to both `null` and `undefined`. Lodash applies it only to `undefined`. |
| `_.property(path)` | `property(path, fallback)` | **Covered** for unary property accessors. ExtremeJS also captures an optional fallback and uses its own `get` rules. |
| `_.toPath(path)` | `toPath(path)` | **Covered** for splitting dot paths and simple brackets after a key. ExtremeJS preserves numbers and symbols. Lodash preserves symbols, stringifies numbers, and accepts segment arrays and a broader bracket grammar. |
| `_.iteratee(selector)` | `iteratee(selector, fallback)` | **Partial**. Both return functions unchanged and support string property shorthands. Implicit identity, object matching, and `[path, value]` matching still need a port. ExtremeJS accepts a fallback for property shorthands. |
| `_.has(value, [key])` | `hasOwn(value, key)` | **Partial**. A direct own key can be a string, number, or symbol, and can be non-enumerable or hold `undefined`. Deep own-path existence still needs a port. ExtremeJS treats holes as absent. Lodash counts in-range sparse array and arguments indices. Lodash distinguishes numeric `-0` from `0` and can invoke a getter during the check. |
| `_.keys(value)` | `keys(value)` | **Covered** for enumerable own string keys and dense-style array, arguments, buffer, and typed-array indices. Both omit `constructor` on ordinary constructor prototypes. Lodash additionally filters certain enumerable buffer and typed-array metadata. |
| `_.keys(value)` | `ownKeys(value)` when all own string names are enumerable on an ordinary object, or `prototypeKeys(value)` on an ordinary constructor prototype | These calls overlap on the stated inputs. `ownKeys` also includes non-enumerable names and only reports existing indices. `prototypeKeys` always omits `constructor` and only reports existing enumerable indices. Both exclude symbols and inherited keys. |

A supported ExtremeJS string path looks like `"items.0.score"` or `"items[0][score]"`. `get`, `property`, and `iteratee` parse such strings as paths and can read inherited values. Lodash prefers an existing literal key such as `"a.b"` over the matching nested path. `get` and `property` can take direct numeric or symbol keys where the signatures allow them, and use native key conversion for numeric `-0`. Use string indices with `get` on array inputs and string shortcuts with `iteratee`. Pass an explicit identity function such as `iteratee(identity)` for the default Lodash call. `hasOwn` always treats a key literally. `isPrototype` exposes the constructor-prototype test used by `keys`. Lodash has no public equivalent.

### Missing capabilities

| Lodash capability | Missing Lodash entries |
| --- | --- |
| Read multiple paths, check inherited paths, and call functions by path | `at`, `hasIn`, `invoke`, `result`, `method`, `methodOf`, `propertyOf` |
| Build standalone matching predicates | `matches`, `matchesProperty` |
| Traverse or search object properties | `findKey`, `findLastKey`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `transform` |
| Enumerate inherited keys, methods, values, or entries | `keysIn`, `functions`, `functionsIn`, `values`, `valuesIn`, `toPairs` (alias `entries`), `toPairsIn` (alias `entriesIn`) |
| Select and transform properties | `invert`, `invertBy`, `mapKeys`, `mapValues`, `omit`, `omitBy`, `pick`, `pickBy` |
| Create objects, copy properties, and merge or apply defaults | `assign`, `assignIn` (alias `extend`), `assignInWith` (alias `extendWith`), `assignWith`, `create`, `defaults`, `defaultsDeep`, `merge`, `mergeWith`, `toPlainObject` |
| Write, update, and remove values at paths | `set`, `setWith`, `unset`, `update`, `updateWith` |

Reading inherited values with `get` does not check whether a path exists when its value is `undefined`. Enumerating a prototype's own keys with `prototypeKeys` also differs from enumerating an object's inherited keys with `_.keysIn`.

### Upstream scenario decisions

| Lodash 4.18.1 scenario source | Coverage and decision |
| --- | --- |
| [Shared get and result scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L19412-L19585) | Covers direct and deep reads, symbols, numeric signed zero, inherited reads on a class instance, missing and nullish intermediates, literal-key precedence, the direct empty-string key when present, and defaults for undefined and null. Root nullish or primitive values and defaults unrelated to the selected value type exceed the local signature. The boxed-zero variants and segment arrays exceed the path type. Complex quoted or escaped paths and empty brackets exceed the simple path grammar. An empty-string key on a value without that key exceeds the inferred paths, and an empty segment array exceeds the path type. The empty-string result type is tracked below. Function invocation during traversal belongs to `result`. |
| [property](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L17989-L18127) | Covers unary direct, deep, inherited, symbol, and numeric reads, missing values, signed zero, and literal-key precedence. Root nullish values, array paths, boxed keys, and arbitrary path coercion exceed the accessor signatures. The local captured fallback is compared separately. |
| [toPath](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L23972-L24047) | Covers dot/bracket paths, fresh arrays, leading and consecutive dots, and primitive symbol preservation. Arrays and boxed symbols exceed the input type. Nested quotes, escapes, fractional bracket segments, and empty brackets need Lodash's broader grammar. Empty-string and empty-segment type behavior is tracked below. |
| [iteratee](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12117-L12300) and [custom iteratee hooks](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12303-L12595) | Covers preserving callback identity, arguments and receiver, and direct, indexed and deep string shortcuts. Preserving a function is also the relevant behavior for upstream partial application cases. Numeric and symbol shorthands exceed the current local signature. Nullish identity, object and pair matching, and the clone-on-creation scenarios for those shorthands depend on missing capabilities. Callback-position guard and global override cases depend on Lodash's internal iteratee hook and collection APIs. |
| [has and hasIn](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L7821-L8058) | Covers own, missing and inherited direct keys, shadowed `hasOwnProperty`, arguments and numeric array indices, non-enumerable symbols, literal dots, signed zero, and holes in arrays and arguments objects. An extra case compares checking a throwing getter. Single-segment paths translate to direct keys. Multi-segment paths, including nested nullish and sparse cases, require the missing deep existence capability. Nullish roots, boxed keys, and arbitrary coercion exceed the signature. Inherited existence belongs to `hasIn`. |
| [keys and keysIn](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12972-L13167) | Covers own string keys, excluding inherited, hidden, and symbol keys, sparse indices, custom keys on indexed values, arguments and boxed strings, array-likes, primitive boxing, nullish inputs, and constructor filtering. The required local argument uses explicit `undefined` for the omitted input. Inherited keys on arrays, arguments, and boxed primitives are exercised using an isolated prototype. `ownKeys` and `prototypeKeys` exercise the relevant overlap and their differences on sparse arrays, hidden names, and constructor handling. Scenarios expecting inherited keys belong to `keysIn`. |
| [Wrapped results](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26717-L26895) | Implicit and explicit chaining are deferred. |

### Maintainer decisions and follow-ups

- **Paths and reads.** Should a parsed path always win over a literal dotted key? Should a future port accept segment arrays and quoted syntax, and should lookup fallbacks continue to replace `null`? Review signed-zero coercion with the numeric path forms.
- **Path type follow-up.** `PathT<"">` is `[]`, while `toPath("")` returns `[""]`. That tuple also prevents `get` from inferring the value type for a direct empty-string key. `PathT` also drops empty components in dotted paths and omits the leading empty component that the parser produces for a bracket-first path. Separately, the public type rejects the numeric fallback in `get({ items: [{ score: 1 }, null] }, "items[1].score", 0)` even though the lookup can return it. The path type also accepts `"a[]"` when `a` has an empty-string key, but the parser leaves the empty brackets intact. Review the path tuples, inferred paths, and value inference through nullable unions.
- **Iteratee shorthands.** Should the existing shorthand extend to Lodash's matching predicates and implicit identity? Should numeric and symbol keys become typed shortcuts where direct accessors already accept them?
- **Existence and enumeration.** Should deep existence be a separate API from `hasOwn`? Should a future deep check count sparse holes as present? Should enumerable metadata filtering for buffers and typed arrays follow Lodash, and should `ownKeys` continue to mean own string names or expand to symbols?

### Benchmarks

Run `pnpm bench src/get.bench.ts` for one utility or `pnpm bench` for all. The paired workloads validate equal results before timing. They cover direct and nested reads, accessor creation plus one read, reused accessors, string path splitting, callback and property iteratees, direct own-key hits and misses, and ordinary and sparse key enumeration. The literal `hasOwn` workload includes building a single-segment path in the Lodash call. `ownKeys` uses a record whose own string names are all enumerable. `prototypeKeys` uses a constructor prototype with an enumerable constructor that both calls exclude.

Lodash has no direct equivalent for `isPrototype`, or for the full `ownKeys` and `prototypeKeys` results outside the overlaps above. The pairs also exclude differing path and coercion rules, sparse existence checks, and missing capabilities whose results cannot be compared directly.
