# Lodash compatibility inventory

Compatibility tests and benchmarks use the main [`lodash` package at 4.18.1](https://www.npmjs.com/package/lodash/v/4.18.1) and the [matching upstream test tag](https://github.com/lodash/lodash/tree/4.18.1/test). Update the exact dev dependency and upstream test references together.

The [pinned API reference](https://github.com/lodash/lodash/blob/4.18.1/doc/README.md) defines the inventory scope. `lodash/fp` is outside that scope. Find aliases alongside their canonical entries. **Covered** describes the supported ExtremeJS call, **Partial** identifies a specific capability still to port, **Missing** marks a capability without an ExtremeJS utility, and **Deferred** marks wrapper work reserved for a later design.

| Inventory section | Family ticket |
| --- | --- |
| [Array and Collection](#array-and-collection) | [#283](https://github.com/extremejs/utils/issues/283) |
| [Math](#math) and [Number](#number) | [#284](https://github.com/extremejs/utils/issues/284), with the [`sumBy` pilot](#_sumby) in [#282](https://github.com/extremejs/utils/issues/282) |
| [String](#string) | [#285](https://github.com/extremejs/utils/issues/285) |
| [Object, Path, and Iteratee](#object-path-and-iteratee), including some Lang and Util entries | [#286](https://github.com/extremejs/utils/issues/286) |
| Lang [primitive and structural predicates](#primitive-and-structural-predicates) | [#287](https://github.com/extremejs/utils/issues/287) |
| Lang [built-in predicates and object introspection](#built-in-predicates-and-object-introspection) | [#288](https://github.com/extremejs/utils/issues/288) |
| [Remaining Date, Function, and Lang](#date-function-and-remaining-lang), [Util](#util), [Properties and Methods](#properties-and-methods), and [Seq](#seq) | [#289](https://github.com/extremejs/utils/issues/289) |

## Array and Collection

The pinned API reference lists the [Array and Collection methods](https://lodash.com/docs/4.18.1#chunk). The array capability is **Covered** for each call below. The ExtremeJS inputs are mutable arrays, plus strings where indicated. Lodash also accepts several array-like or nullish inputs outside these contracts.

| Lodash invocation | ExtremeJS invocation | Migration notes |
| --- | --- | --- |
| `_.chunk(array, size)` | `chunk(array, size)` | Both default to groups of one. Callers validate that the size is a positive integer. The final group can be shorter. |
| `_.compact(array)` | `compact(array)` | Both keep truthy elements in order, including the strings `"0"` and `"false"`. |
| `_.concat(array, ...items)` | `concat(array, ...items)` | ExtremeJS requires a base array and uses native spreadability rules. Lodash also accepts an omitted or scalar base, flattens appended arguments objects, and spreads appended arrays even when they opt out with `Symbol.isConcatSpreadable`. |
| `_.drop(array, n)` | `drop(array, n)` | Both default to dropping one. Callers validate that the count is a nonnegative integer. ExtremeJS also returns a suffix string from string input. |
| `_.dropRight(array, n)` | `dropRight(array, n)` | Both default to dropping one. Callers validate that the count is a nonnegative integer. ExtremeJS also returns a prefix string from string input. |
| `_.fill(array, value, start, end)` | `fill(array, value, start, end)` | Both write in place. ExtremeJS always returns the input array. Lodash returns a fresh array for empty input. |
| `_.head(value)`, alias `_.first(value)` | `first(value)` | Reads the first element or the first UTF-16 code unit of a string. An empty input or missing index yields `undefined`. |
| `_.initial(array)` | `head(array)` | Removes the final element. ExtremeJS also removes the final UTF-16 code unit of a string and returns a string. |
| `_.join(array, separator)` | `join(array, separator)` | ExtremeJS defaults to `""`. Lodash defaults to `","`. Pass a separator explicitly when migrating. |
| `_.last(value)` | `last(value)` | Reads the final element or the final UTF-16 code unit of a string. An empty input or missing index yields `undefined`. |
| `_.slice(array, start, end)` | `slice(array, start, end)` | Both default to the full range, with an exclusive end. ExtremeJS also returns a substring from string input. |
| `_.tail(array)` | `tail(array)` | Removes the first element. ExtremeJS also removes the first UTF-16 code unit of a string and returns a string. |

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
| [`chunk`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2536-L2594) | Covers the default size, even chunks, a remainder, and empty input. The local contract requires a positive integer size. |
| [`compact`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L3166-L3226) | Covers falsy removal and preserving truthy values in order. The lazy-sequence cases, including the global `_.iteratee` override, require Lodash wrappers. |
| [`concat`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L3230-L3307) | Covers a shallow copy, scalar and one-level array appends, and sparse arrays. Missing and scalar bases are outside the local base-array contract. |
| [`drop`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5076-L5160) and [`dropRight`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5164-L5248) | Covers defaults, zero, explicit nonnegative integer counts, bounds, sparse arrays, and string outcomes. |
| [`fill`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5686-L5847) | Covers defaults, mutation and return identity, positive and negative numeric bounds, fractional truncation, `NaN`, and no-op ranges. Uses an explicit `undefined` value on a sparse array because the local fill value is required. Empty input identity is tested separately. |
| [`head` and alias `first`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L8062-L8158) and [`last`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L13171-L13252) | Covers direct selection, sparse and empty arrays, empty arrays with indexed properties, use in `map`, and string indexing. |
| [`initial`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L8297-L8369) and [`tail`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21584-L21679) | Covers dropping one endpoint, empty arrays, use in `map`, and empty and nonempty strings. Missing and other falsy non-array inputs fall outside the local input type. |
| [`join`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12839-L12873) | Covers an explicit separator. The default separator difference and empty fields are also tested. |
| [`slice`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L20485-L20649) and [shared `slice` and `toArray` scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L23486-L23536) | Covers default shallow copies, bounds, numeric truncation, sparse arrays, and string results. Generic array-likes, arguments objects, and DOM node lists exceed the local input type. |
| [Cross-method array scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26899-L26946) and [falsy arguments and array returns](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L27069-L27159) | Arguments objects as the primary input, nullish inputs, and other unsupported falsy primary inputs are outside the array or string contracts. Ordinary array results are covered in the suites. |
| [Iteratee-call guards](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5822-L5829) | The guarded `map` cases in the `chunk`, `drop`, `dropRight`, `fill`, and `slice` suites depend on Lodash recognizing a callback's extra arguments. Use a unary adapter such as `values.map(value => drop(value))` to apply the local defaults. |
| [Falsy and string index coercion in `fill`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5724-L5734) and [`slice`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L20589-L20599) | Tests exercise numeric indices and optional defaults. String, boolean, and null indices are outside the local index types. The same restriction applies to nonnumeric `size` and `n` in the `chunk` and `drop` families. |
| [Wrapped results](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26717-L26895) and the wrapper scenarios in the method suites above | Implicit and explicit chaining, lazy evaluation, and delayed callback execution are deferred to the wrapper API. |

### Bugs fixed and intended divergences

| Finding | Contract and migration |
| --- | --- |
| **Bug** · Empty endpoint reads | [`first`](src/first.ts) and [`last`](src/last.ts) previously exposed inherited index `0` and property `"-1"` on length-zero arrays, respectively. Both now return `undefined` before reading the index, matching Lodash. |
| **Bug** · Endpoint result types | [`first`](src/first.ts) and [`last`](src/last.ts) now include `undefined` for general arrays. Check the result before using it on inputs that can be empty or sparse. |
| **Bug** · Compact result types | [`compact`](src/compact.ts) now retains broad `number` and excludes known falsy literals, including `0n`. |
| **Bug** · Head and tail result types | [`head`](src/head.ts) and [`tail`](src/tail.ts) now infer array results for general array inputs and retain the known prefix or suffix for fixed tuples. |
| **Bug** · Slice and drop result types | [`slice`](src/slice.ts), [`drop`](src/drop.ts), and [`dropRight`](src/drop-right.ts) now return arrays of the input element type or strings. Narrow the result separately if downstream code needs a specific tuple or string literal. |
| **Intended divergence** · Sizes and counts | [`chunk`](src/chunk.ts) requires a positive integer size. [`drop`](src/drop.ts) and [`dropRight`](src/drop-right.ts) require nonnegative integer counts. All default to one. Callers validate these preconditions. Lodash normalizes out-of-range or fractional values. ExtremeJS leaves results and errors for unsupported values unspecified. |
| **Intended divergence** · Concat base | [`concat`](src/concat.ts) requires a base array. For a Lodash call with a scalar base, wrap it in an array. For an omitted base, use `[]`. |
| **Intended divergence** · Concat spreadability | [`concat`](src/concat.ts) uses native spreadability, including arrays opting out and arguments objects staying whole by default. Lodash flattens both. Convert an arguments object to an array to flatten it explicitly. |
| **Intended divergence** · Sparse array copies | [`chunk`](src/chunk.ts), [`concat`](src/concat.ts), [`drop`](src/drop.ts), [`dropRight`](src/drop-right.ts), [`head`](src/head.ts), [`slice`](src/slice.ts), and [`tail`](src/tail.ts) preserve holes. Lodash fills those positions with explicit `undefined` values. |
| **Intended divergence** · String slicing results | [`drop`](src/drop.ts), [`dropRight`](src/drop-right.ts), [`head`](src/head.ts), [`slice`](src/slice.ts), and [`tail`](src/tail.ts) return strings from string inputs. Lodash returns an array of UTF-16 code units. |
| **Intended divergence** · Empty fill identity | [`fill`](src/fill.ts) returns the input array even when it is empty. Lodash allocates an empty result. |
| **Intended divergence** · Default join separator | [`join`](src/join.ts) defaults to the empty string. Pass `","` to match the Lodash default. |
| **Intended divergence** · Iteratee-call guards | [`chunk`](src/chunk.ts), [`drop`](src/drop.ts), [`dropRight`](src/drop-right.ts), [`fill`](src/fill.ts), and [`slice`](src/slice.ts) interpret extra arguments normally. Wrap calls in a callback that passes the intended arguments. |

### Benchmarks

Run all benchmarks with `pnpm bench`. For an individual utility, use its colocated file, for example `pnpm bench src/head.bench.ts` or `pnpm bench src/fill.bench.ts`.

Each mapped utility has a paired workload. Traversal, copying, and mutation workloads use dense arrays with 32 and 2,048 elements. `first` and `last` use one size because their work is a single indexed read. `join` passes an explicit comma separator to both implementations. `fill` includes the same fresh array copy in both timed calls and validates the resulting contents before timing.

Sparse copies, differing string result types, and empty-array fill identity are excluded from direct timing because results differ. Unsupported sizes and counts have no local contract to benchmark. Lodash-only entries have no ExtremeJS workload to pair.

## Math

### Arithmetic and aggregates

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.add(a, b)`, `_.divide(a, b)`, `_.multiply(a, b)`, `_.subtract(a, b)` | `add(a, b)`, `divide(a, b)`, `multiply(a, b)`, `subtract(a, b)` | **Covered** for two numbers. Supply both operands. Lodash also handles omitted operands and accepts nonnumeric operands. |
| `_.max(numbers)`, `_.min(numbers)` | `max(numbers)`, `min(numbers)` | **Covered** for numeric extrema. ExtremeJS skips holes, propagates `NaN`, and uses `-Infinity` for an empty maximum and `Infinity` for an empty minimum. Lodash skips `NaN` and uses `undefined` when nothing qualifies. ExtremeJS orders the two signed zeros, while Lodash keeps the first tied value. |
| `_.maxBy(values, selector)`, `_.minBy(values, selector)` | `maxElementBy(values, selector)`, `minElementBy(values, selector)` | **Covered** for numeric selectors. Both return the first original element on ties, including signed zeros, accept infinities, and skip missing, nullish and `NaN` scores. Both return `undefined` when no score qualifies. Use `maxBy*` or `minBy*` to get the score in ExtremeJS. |
| `_.mean(numbers)` | `mean(numbers)` | **Covered**. Both divide by the full array length and return `NaN` for an empty array. A nonempty array of only holes produces zero in ExtremeJS and `NaN` in Lodash. |
| `_.meanBy(values, selector)` | `meanBy(values, selector)`, `meanByFn(values, callback)`, `meanByProperty(values, path)` | **Covered** for numeric averages by callback or property path. Both divide by the full length. ExtremeJS skips holes during summation and treats missing or nullish properties as zero. Lodash skips `undefined` results and adds `null` as a value. When every lookup in a nonempty array yields `undefined`, ExtremeJS returns zero and Lodash returns `NaN`. |
| `_.sum(numbers)` | `sum(numbers)` | **Covered**. Both return zero for an empty array and propagate `NaN`. A nonempty array of only holes yields zero in ExtremeJS and `undefined` in Lodash. |

Use the `By` exports with a callback or property path, `ByFn` with a callback, and `ByProperty` with a path. Both libraries pass a single element to callbacks. ExtremeJS uses its [`get`](src/get.ts) path syntax. For example, `["items", 0, "score"]` uses an array index and `["a.b"]` selects a literal dotted key.

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

### Bugs fixed and intended divergences

| Finding | Contract and migration |
| --- | --- |
| **Bug** · Numeric selector types | [`sumBy`](src/sum-by.ts), [`meanBy`](src/mean-by.ts), [`minBy`](src/min-by.ts), [`maxBy`](src/max-by.ts), and their `ByFn` and `ByProperty` variants require callbacks returning numbers or paths to numeric properties. A property can be optional or nullable. Default a nullable callback result explicitly, for example `row => row.score ?? 0` for sums. |
| **Intended divergence** · Explicit arithmetic operands | [`add`](src/add.ts), [`divide`](src/divide.ts), [`multiply`](src/multiply.ts), and [`subtract`](src/subtract.ts) require two numbers. Lodash accepts omitted and nonnumeric operands. |
| **Intended divergence** · Explicit numeric selectors | All selector forms require a callback or path. Use `identity` for a Lodash call that omits its selector. Lodash also supports matching shorthand and nonnumeric scores. |
| **Intended divergence** · Numeric selector paths | These selectors parse dotted strings even when the entire string is a key. Lodash can prefer the literal key. Use a segment array for a literal key or an explicit traversal. In Lodash, pass `_.property(segments)` as the callback since a raw array selector is a matching shorthand. |
| **Intended divergence** · Sparse numeric arrays | ExtremeJS skips holes. Lodash's selector variants call callbacks with `undefined` for holes. The sum starts at zero in ExtremeJS even for an array of only holes, while Lodash's sum can yield `undefined`. |
| **Intended divergence** · Aggregate defaults and signed zero | ExtremeJS's sums start at positive zero, so `sum*` and `mean*` can turn a negative zero into positive zero. Missing and nullish selected properties contribute zero. Lodash starts at the first defined value, skips `undefined` and uses `null` as a value. |
| **Intended divergence** · Score extrema | `min*` and `max*` score APIs propagate `NaN`, use signed infinities for empty input or missing and nullish properties, and prefer negative zero for minima and positive zero for maxima. Lodash skips ineligible scores, uses `undefined` when none qualify, and keeps the first tied result. Use [`minElementBy`](src/min-element-by.ts) or [`maxElementBy`](src/max-element-by.ts) for first-winner semantics. |

### Arithmetic and aggregate benchmarks

Run `pnpm bench` or target a colocated file such as `pnpm bench src/max-by.bench.ts`. Arithmetic benchmarks use two numbers. The array benchmarks use 32 and 2,048 dense entries, and property selectors use the same nested path. For `maxBy*` and `minBy*`, the test title identifies the extra callback or path lookup timed in the Lodash row. The benchmark helper verifies both returned scores before timing.

[`element-by.bench.ts`](src/element-by.bench.ts) compares winning records directly with the same callbacks and unambiguous string paths. Explicit segment arrays are excluded from timing because Lodash needs a property-accessor adapter. Sparse arrays and ambiguous dotted keys can produce different winners. The score benchmarks also exclude empty extrema, `NaN`, and tied signed zeros because the existing score APIs can return different results.

### `_.sumBy`

**Covered** for summing numeric values selected by a callback or property path.

| Lodash invocation | ExtremeJS invocation |
| --- | --- |
| `_.sumBy(values, callback)` | `sumBy(values, callback)` or `sumByFn(values, callback)` |
| `_.sumBy(values, path)` | `sumBy(values, path)` or `sumByProperty(values, path)` |

ExtremeJS requires an explicit selector. Use an identity callback for the default Lodash call. For an array entry, use a string index such as `"0"` or a numeric segment such as `[0]`. Property shorthands follow ExtremeJS's [`get`](src/get.ts) path syntax. Given both a literal key `"a.b"` and a nested property at that path, ExtremeJS reads the nested property and Lodash reads the literal key.

ExtremeJS starts at positive zero and skips sparse array holes. Lodash starts with the first defined result and visits holes as `undefined`. For property selectors, ExtremeJS counts missing and nullish values as zero. Lodash skips `undefined`, returns `undefined` if all lookups in a nonempty array yield `undefined`, and includes `null` as a value.

#### Upstream scenario decisions

The `lodash compatibility` suites live in [`sum-by.spec.ts`](src/sum-by.spec.ts), [`sum-by-fn.spec.ts`](src/sum-by-fn.spec.ts), and [`sum-by-property.spec.ts`](src/sum-by-property.spec.ts).

| Upstream scenario | Pilot coverage |
| --- | --- |
| [Explicit iteratee and unary callback arguments](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21500-L21528) | A parameterized case in [`sum-by.spec.ts`](src/sum-by.spec.ts) checks the numeric result and arguments received by both callback entry points and Lodash. |
| [String property and numeric array-index shorthands](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21528-L21534) | Both property entry points check direct keys, deep paths, and array indices. The index case uses `"0"` for both libraries, which also fits the Lodash type definitions. |
| Summing numbers and propagating `NaN` ([sum](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21545-L21549), [`NaN`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21569-L21573)) | The callback variants use explicit identity callbacks. The property variants sum numeric fields, including `NaN`. |
| [Empty inputs](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21551-L21561) | All three exports cover empty arrays. The other upstream inputs are outside the array contract. |
| [Skipping `undefined`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21563-L21567) | The property variants cover mixed numeric and undefined results, plus the different behavior when every lookup yields `undefined`. Callbacks must return numbers. |
| [String concatenation](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21575-L21579) | String results are outside the intended numeric contract. |
| [Overriding `_.iteratee`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12740-L12751) | The local API takes an explicit selector and has no global iteratee override. |

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

### Bugs fixed

| Finding | Contract and migration |
| --- | --- |
| **Bug** · Negative odd integers | [`isOdd(-3)`](src/is-odd.ts) returns `true`. Fractions, infinities, and `NaN` continue to return `false`. |
| **Bug** · Index coercion | [`isIndex`](src/is-index.ts) accepts nonnegative integer numbers and canonical unsigned decimal strings below the exclusive bound. Other candidates, such as `1n`, `[1]`, and coercible objects, return `false` without conversion. Pass a number or canonical decimal string explicitly. |

## String

The [Lodash String category](https://lodash.com/docs/4.18.1#camelCase) is mapped below by capability. See [Primitive and structural predicates](#primitive-and-structural-predicates) for `isString`. The transformations and searches take a string as input. Lodash also accepts inputs that it can coerce to strings.

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.camelCase(string)`, `_.kebabCase(string)`, `_.snakeCase(string)` | `camelCase(string)`, `kebabCase(string)`, `snakeCase(string)` | **Covered** for Unicode word casing, including Latin accent folding, contractions, ordinals, emoji, and acronym runs before digits. |
| `_.capitalize(string)` | `capitalize(string)` | **Covered** for lowercasing the full string and uppercasing the first Unicode symbol. |
| `_.lowerFirst(string)`, `_.upperFirst(string)` | `lowerFirst(string)`, `upperFirst(string)` | **Covered** for changing the case of the first Unicode symbol while preserving the rest. |
| `_.toLower(string)`, `_.toUpper(string)` | `lowerCase(string)`, `upperCase(string)` | **Covered** for whole-string case conversion. Spacing and separators are preserved. |
| `_.startsWith(string, target, position)`, `_.endsWith(string, target, position)` | `startsWith(string, searchString, position)`, `endsWith(string, searchString, endPosition)` | **Covered** for case-sensitive literal matches with numeric UTF-16 offsets. The defaults are zero for the start and the string length for the end. |
| `_.repeat(string, n)` | `repeat(string, count)` | **Covered** for repetition with an explicit count. Lodash defaults to one copy and returns an empty string for negative counts. ExtremeJS requires a count and throws for negative counts after truncation. |
| `_.replace(string, pattern, replacement)` | `replace(string, searchValue, replaceValue, all)` | **Covered** for literal and regex patterns and string or callback replacements. ExtremeJS also has an `all` flag for literal replacement. To replace every occurrence of a nonempty literal in Lodash, pass an escaped global regex. |
| `_.split(string, separator, limit)` | `split(string, separator, limit)` | **Covered** for splitting on explicit text or regular expressions. An empty separator splits into Unicode symbols. In ExtremeJS, an omitted or `undefined` separator does the same. |

`LETTER_CASE_REGEX` is an ExtremeJS-specific export for matching ASCII letter and digit runs. Lodash's `words` returns a token array and accepts an optional caller-supplied pattern.

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
| [Shared case methods](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2220-L2354) and [camelCase](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2358-L2387) | Covers ASCII separators and case transitions, a second conversion pass, numbers and acronyms in camel case, and ignoring mathematical operators. Also compares Latin letter folding, joined emoji, straight and curly apostrophes, ordinals, and acronyms immediately followed by digits. Cycling through all case methods requires Lodash's space-separated variants. |
| [Whole-string conversion](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L23458-L23483) and [word-converting lowerCase](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L13256-L13266) and [upperCase](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L25496-L25506) | Covers the `toLower` and `toUpper` punctuation examples and Unicode conversion. The similarly named Lodash word formatters are exercised to show their different results. |
| [capitalize](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2391-L2401), [lowerFirst](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L13270-L13280), and [upperFirst](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L25510-L25520) | Covers the upstream ASCII inputs, empty strings, first-position behavior, and a cased astral letter. Capitalizing an emoji leaves it intact in both libraries. |
| [endsWith](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5413-L5472) and [startsWith and shared matching cases](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21258-L21362) | Covers positive and negative matches, optional positions, numeric clamping and truncation, empty targets, and UTF-16 indexing. Boxed and custom-coercing strings, targets, and positions, plus null, boolean, and string offsets, fall outside the declared parameter types. |
| [repeat](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L19299-L19353) | Covers explicit counts, empty input, fractional truncation, zero and NaN, and the differences for negative and infinite counts. Migrating Lodash's omitted-count call requires passing `1` explicitly. Boxed and custom-coercing strings and nonnumeric counts are outside the signature. |
| [replace](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L19357-L19367) | Covers the upstream literal and global regex examples, plus substitution tokens, replacer arguments, literal replace-all, and the global-flag requirement in all mode. |
| [split](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L21126-L21171) and [uncommon symbols](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L24509-L24553) | Covers string and regex delimiters, capture insertion, limits, and empty input. Covers unmatched captures and their result type, joined emoji, flags and combining marks, and unsigned limits measured in symbols. Omitted separators are tested separately because the defaults differ. The uncommon-symbol assertions for padding, trimming, truncation, sizing, array conversion, and word extraction belong to those methods. |
| [Shared empty inputs](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26975-L27015) and [case coercion and wrappers](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L2310-L2341) | Empty strings are tested. Missing and nullish string inputs and custom string coercion are outside the transformation signatures. Wrapped mixed string and array calls and implicit or explicit chaining are deferred. The upstream `map` scenarios for `repeat` and `split` depend on Lodash's iteratee-call guard. Use a unary callback and supply the intended count or separator explicitly. |

### Bugs fixed and intended divergences

| Finding | Contract and migration |
| --- | --- |
| **Bug** · Acronyms before digits | [`camelCase`](src/camel-case.ts), [`kebabCase`](src/kebab-case.ts), and [`snakeCase`](src/snake-case.ts) now keep an acronym as a single word before a digit, as in `XML2Parser`. |
| **Bug** · Astral first-letter casing | [`upperFirst`](src/upper-first.ts), [`lowerFirst`](src/lower-first.ts), and [`capitalize`](src/capitalize.ts) now case an entire leading Unicode symbol. The return type widens to `string` for open template literal types and when a zero-width joiner or combining Greek iota may affect the leading symbol. |
| **Bug** · Unicode symbol splitting | [`split`](src/split.ts) keeps joined emoji, flags, and decorated symbols together when splitting with an empty or omitted separator. Use native `String.prototype.split` with an empty separator to keep the previous code-unit behavior. |
| **Bug** · Split regex capture types | [`split`](src/split.ts) returns `Array<string \| undefined>` when a regex is possible. For example, `split("a;b", /(;)|(,)/)` returns `["a", ";", undefined, "b"]`. Narrow or filter out `undefined` before using the captures as strings. Calls with a literal string separator or the default still return `string[]`. |
| **Intended divergence** · Omitted split separator | [`split`](src/split.ts) treats omission and `undefined` as an empty separator. Lodash keeps the string in a one-element array when the separator is omitted. Pass `""` explicitly for symbol splitting in either library. |
| **Intended divergence** · Explicit repeat count | [`repeat`](src/repeat.ts) requires a count. Pass `1` when migrating from Lodash's omitted-count call. |
| **Intended divergence** · Native repeat range errors | [`repeat`](src/repeat.ts) throws `RangeError` for negative truncated counts, infinities, or results above the engine's length limit. Lodash returns an empty string for negative and infinite counts. |
| **Intended divergence** · Whole-string casing | [`lowerCase`](src/lower-case.ts) and [`upperCase`](src/upper-case.ts) preserve delimiters and align with Lodash's `toLower` and `toUpper`. Lodash's same-named methods format words and join them with spaces. |
| **Intended divergence** · String coercion and iteratee calls | The string APIs take string inputs. Lodash also coerces other values. Convert inputs explicitly and use unary callbacks such as `value => repeat(value, 1)` or `value => split(value)` to avoid passing an array index as a second argument to these APIs. |

### Unicode migration examples

| Call | Previous result | New result |
| --- | --- | --- |
| `camelCase("déjà vu")` | `"dJVu"` | `"dejaVu"` |
| `kebabCase("XML2Parser")` | `"x-m-l-2-parser"` | `"xml-2-parser"` |
| `snakeCase("it's 42nd 🚀")` | `"it_s_42_nd"` | `"its_42nd_🚀"` |
| `capitalize("𐐀BC")` | `"𐐨bc"` | `"𐐀bc"` |
| `split("👩‍💻a", "", 1)` | `["\uD83D"]` | `["👩‍💻"]` |

If you persist identifiers generated by word casing, regenerate stored keys and their references together or keep the old keys as aliases. If a caller needs UTF-16 code units, use the native `value.split("", limit)`. An empty or omitted separator in ExtremeJS now measures limits in Lodash-style symbols.

### Benchmarks

Use `pnpm bench src/split.bench.ts` for one utility or `pnpm bench` for the full suite. Every mapping has a colocated pair that validates equal results before timing. Whole-string transforms, splitting, and replacement use short and repeated inputs. Prefix and suffix checks use explicit UTF-16 positions. Repeat supplies the same count to both calls. The replacement pair uses the same global regex, with the local all flag enabled.

Word-casing workloads exercise accents, acronyms before digits, joined emoji, and ordinals. First-symbol casing starts with an astral letter. Symbol splitting passes an explicit empty separator to both libraries, with and without a limit. Omitted separators, omitted repeat counts, and repetition error paths cannot be paired because their results differ. Missing methods and `LETTER_CASE_REGEX` have no public equivalent to time directly.

## Object, Path, and Iteratee

The [Lodash Object category](https://lodash.com/docs/4.18.1#assign) and the related path and shorthand utilities map by capability.

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.get(value, path, fallback)` | `get(value, path, fallback)` | **Covered** for direct keys and simple deep reads. ExtremeJS applies the fallback to both `null` and `undefined`. Lodash applies it only to `undefined`. |
| `_.property(path)` | `property(path, fallback)` | **Covered** for unary property accessors. ExtremeJS also captures an optional fallback and uses its own `get` rules. |
| `_.toPath(path)` | `toPath(path)` | **Covered** for dot paths, simple brackets, and explicit segment arrays. ExtremeJS preserves numbers and symbols. Lodash preserves symbols, stringifies numbers, and supports a broader bracket grammar. |
| `_.iteratee(selector)` | `iteratee(selector, fallback)` | **Covered** for callbacks and property selection by string, number, or symbol. ExtremeJS also accepts explicit segment arrays for property selection and captures a fallback. |
| `_.has(value, path)` | `hasOwn(value, path)` | **Covered** for direct keys and deep own paths. ExtremeJS treats holes as absent, uses native key conversion, and stops before reading the final value. |
| `_.keys(value)` | `keys(value)` | **Covered** for enumerable own string keys and dense-style array, arguments, buffer, and typed-array indices. Both omit `constructor` on ordinary constructor prototypes. Lodash additionally filters certain enumerable buffer and typed-array metadata. |
| `_.keys(value)` | `ownKeys(value)` when all own string names are enumerable on an ordinary object, or `prototypeKeys(value)` on an ordinary constructor prototype | These calls overlap on the stated inputs. `ownKeys` also includes non-enumerable names and only reports existing indices. `prototypeKeys` always omits `constructor` and only reports existing enumerable indices. Both exclude symbols and inherited keys. |

All five path utilities accept strings such as `"items.0.score"` and `"items[0][score]"`, direct numeric or symbol keys, and explicit arrays such as `["items", 0, "score"]`. Reads can traverse inherited properties. `hasOwn` requires an own property at each step and counts present `undefined` values. `""` refers to the empty key. An empty segment array yields the read fallback or `false` from `hasOwn`.

To preserve a literal dotted or bracketed **`hasOwn`** check when upgrading, change `hasOwn(value, "a.b")` to `hasOwn(value, ["a.b"])` and `hasOwn(value, "a[b]")` to `hasOwn(value, ["a[b]"])`. The string forms now check a nested path. The array form also works for literal reads and property selectors.

`isPrototype` exposes the constructor-prototype test used by `keys`. Lodash has no public equivalent.

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
| [Shared get and result scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L19412-L19585) | Covers direct and deep reads, symbols, signed zero, inherited reads, missing and nullish intermediates, literal-key precedence, explicit segments and empty paths, and nullish defaults. Root nullish or primitive values, boxed keys, and unrelated defaults for typed properties exceed the signature. Function invocation during traversal belongs to `result`. |
| [property](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L17989-L18127) | Covers unary direct, deep, inherited, symbol, numeric, and explicit segment reads, missing values, signed zero, and literal-key precedence. Root nullish values, boxed keys, and arbitrary path coercion exceed the signature. The captured fallback is compared separately. |
| [toPath](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L23972-L24047) | Covers dot and simple bracket paths, fresh arrays, explicit segments, empty components, and primitive symbol preservation. Boxed symbols, quoted or escaped paths, fractional bracket segments, and empty brackets are outside the supported grammar. |
| [iteratee](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12117-L12300) and [custom iteratee hooks](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12303-L12595) | Covers callback identity, arguments and receiver, string, numeric, and symbol shortcuts, and the different meanings of arrays. Identity and matching use explicit functions. Callback-position guards and global overrides depend on Lodash's internal iteratee hook and collection APIs. |
| [has and hasIn](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L7821-L8058) | Covers own, missing and inherited keys throughout traversal, shadowed `hasOwnProperty`, numeric array and arguments indices, non-enumerable symbols, explicit literal keys, signed zero, sparse holes, and intermediate and final getters. Nullish roots, boxed keys, and arbitrary coercion exceed the signature. Inherited existence belongs to `hasIn`. |
| [keys and keysIn](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12972-L13167) | Covers own string keys, excluding inherited, hidden, and symbol keys, sparse indices, custom keys on indexed values, arguments and boxed strings, array-likes, primitive boxing, nullish inputs, and constructor filtering. The required local argument uses explicit `undefined` for the omitted input. Inherited keys on arrays, arguments, and boxed primitives are exercised using an isolated prototype. `ownKeys` and `prototypeKeys` exercise the relevant overlap and their differences on sparse arrays, hidden names, and constructor handling. Scenarios expecting inherited keys belong to `keysIn`. |
| [Wrapped results](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26717-L26895) | Implicit and explicit chaining are deferred. |

### Bugs and intended divergences

| Classification | Contract and migration |
| --- | --- |
| **Bug · Fixed in #303** · Path and fallback inference | [`toPath`](src/to-path.ts) includes empty components in its tuple type, including the empty key and the component before a leading bracket. [`get`](src/get.ts), [`property`](src/property.ts), and [`iteratee`](src/iteratee.ts) account for nullable branches, missing array indices, and dictionary keys that may be absent. The result includes the fallback type where the lookup can yield a nullish value. |
| **Bug · Fixed in #303** · Empty bracket path accepted by the type | [`get`](src/get.ts) no longer accepts `"a[]"` as a path to an empty key under `a`. Use `["a", ""]`. |
| **Intended divergence** · Path grammar | [`toPath`](src/to-path.ts) preserves empty dot components, including the first component before a leading bracket. `toPath("")` gives `[""]`, while Lodash gives `[]`. Pass an array for literal delimiters and for keys that would require quoted, escaped, or empty brackets in Lodash. |
| **Intended divergence** · Traversal precedence | [`get`](src/get.ts), [`property`](src/property.ts), [`iteratee`](src/iteratee.ts), and [`hasOwn`](src/has-own.ts) parse the path even if the whole string is an existing key. Lodash prefers that key. Pass a one-element array to select it. |
| **Intended divergence** · Numeric path keys | [`toPath`](src/to-path.ts) preserves numbers, including numeric `-0`. Reads and own checks use native key conversion, so both signed zeros select `"0"`. Lodash selects `"-0"` for numeric negative zero. |
| **Intended divergence** · Read fallbacks | [`get`](src/get.ts) replaces both `null` and `undefined`. [`property`](src/property.ts) and [`iteratee`](src/iteratee.ts) can capture a fallback. Lodash `get` defaults only `undefined`, and its accessors have no captured fallback. |
| **Intended divergence** · Explicit identity and matching | [`iteratee`](src/iteratee.ts) interprets arrays as paths. Use `iteratee(identity)` for identity and pass a predicate for matching. Lodash interprets arrays as match shorthands and also accepts nullish identity and object matching shorthands. |
| **Intended divergence** · Sparse own paths | [`hasOwn`](src/has-own.ts) treats holes as absent. Lodash counts in-range holes at the final array or arguments index. |
| **Intended divergence** · Final getter | [`hasOwn`](src/has-own.ts) checks the final property without reading it. Lodash reads it. Both can invoke intermediate getters. |
| **Intended divergence** · Key enumeration | [`ownKeys`](src/own-keys.ts) lists own string names including non-enumerable ones. [`keys`](src/keys.ts) retains enumerable user properties with legacy buffer or typed-array metadata names that Lodash filters. |

- **Key enumeration without Node globals.** When `Buffer` is absent, `keys("hi")` can throw a `ReferenceError` during buffer detection. Review the shared `isBuffer` predicate in the built-in predicate follow-up.

### Benchmarks

Run `pnpm bench src/get.bench.ts` for one utility or `pnpm bench` for all. Paired workloads check equal results before timing. The path workloads cover direct and nested reads, explicit segment reads and copies, creating and reusing accessors, string path splitting, callback and string property iteratees, and nested own-path checks. Both calls in the literal `hasOwn` pair build a single-segment array. `ownKeys` uses a record with all own string names enumerable. `prototypeKeys` uses a constructor prototype with an enumerable constructor that both calls exclude.

Lodash has no direct equivalent for `isPrototype` or the full `ownKeys` and `prototypeKeys` results. The paired cases exclude ambiguous literal keys, sparse existence checks, signed-zero differences, getter side effects, and mismatched fallbacks. Lodash interprets an array passed to `iteratee` as a match, so the accessor benchmark uses a string selector.

## Primitive and structural predicates

These entries cover predicate capabilities in the [Lodash Lang API](https://lodash.com/docs/4.18.1#eq). ExtremeJS requires explicit arguments. Supply `undefined` to reproduce an omitted argument where that call is relevant.

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.eq(value, other)` | `eq(value, other)` | **Covered**. Both use SameValueZero, so signed zeros compare equal and `NaN` equals itself. Objects compare by identity. |
| `_.isBoolean(value)`, `_.isNumber(value)`, `_.isString(value)`, `_.isSymbol(value)` | `isBoolean(value)`, `isNumber(value)`, `isString(value)`, `isSymbol(value)` | **Covered** for primitives and same-realm boxed values. ExtremeJS uses `instanceof` for the boxed case. Lodash also recognizes foreign wrappers. The local type guards narrow accepted boxes to their primitive types. |
| `_.isNil(value)`, `_.isNull(value)`, `_.isUndefined(value)` | `isNil(value)`, `isNull(value)`, `isUndefined(value)` | **Covered**. These match either nullish value, only `null`, and only `undefined`, respectively. |
| `_.isFinite(value)`, `_.isInteger(value)`, `_.isSafeInteger(value)`, `_.isLength(value)` | `isFinite(value)`, `isInteger(value)`, `isSafeInteger(value)`, `isLength(value)` | **Covered** for primitive numbers. Both reject boxed numbers and numeric strings. The safe-integer checks include both signed bounds. A length uses the inclusive interval from zero through `Number.MAX_SAFE_INTEGER`. |
| `_.isNaN(value)` | `isNaN(value)` | **Covered** for primitive `NaN`. Lodash also accepts boxed `NaN`. |
| `_.isFunction(value)` | `isFunction(value)` | **Covered**. ExtremeJS uses `typeof`. Lodash uses tags and can differ on async generators and values with a custom tag. |
| `_.isArray(value)` | `isArray(value)` | **Covered**. Both recognize arrays across realms. |
| `_.isArrayLike(value)`, `_.isArrayLikeObject(value)` | `isArrayLike(value)`, `isArrayLikeObject(value)` | **Covered**. Both read `length`, validate it as a length, and exclude ordinary functions. The object-only variants also exclude primitive strings. Lodash's tag-based function detection can change the result for values with custom tags. |
| `_.isObject(value)` | `isObject(value)` | **Covered** for instances of the local `Object`, including functions. Lodash also recognizes objects with null prototypes and objects and functions from another realm. |
| `_.isObjectLike(value)` | `isObjectLike(value)` | **Covered**. Both accept non-null objects, including null-prototype and cross-realm objects. Functions return `false`. |
| `_.isPlainObject(value)` | `isPlainObject(value)` | **Covered** for ordinary records and null-prototype objects, including foreign records. ExtremeJS checks the prototype chain. Lodash also uses the object tag and checks the immediate prototype's constructor when there is a prototype. |
| `_.isEmpty(value)` | `isEmpty(value)` | **Covered** for ordinary records, indexed values, and same-realm maps and sets. ExtremeJS recognizes boxed strings by length, while Lodash can fall back to their own keys. Lodash recognizes cross-realm maps and sets by size. |

| Missing Lodash entries | Capability |
| --- | --- |
| `isEqual`, `isEqualWith` | Deep equality and customizable deep equality. |
| `isMatch`, `isMatchWith` | Partial deep matching against a source object, optionally with a custom comparator. |
| `conformsTo` | Matching properties against a source object of predicates. |
| `isNative` | Identifying native functions. |

The ExtremeJS-only numeric predicates `isEven`, `isOdd`, `isPositive`, and `isIndex` are documented in [Number](#number). [Object, Path, and Iteratee](#object-path-and-iteratee) covers `isPrototype`.

### Upstream scenario decisions

| Lodash 4.18.1 scenario source | Coverage and decision |
| --- | --- |
| [`eq`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L5476-L5495) | Covers signed zero, `NaN`, equality without coercion, and reference identity. The zero- and one-argument cases use two explicit `undefined` operands for the local signature. |
| [`isBoolean`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L9155-L9203), [`isNumber`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11293-L11340), [`isString`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11718-L11764), and [`isSymbol`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11768-L11817) | Covers primitive and boxed values, falsy and nonmatching inputs, and both outcomes for boxes from another realm. Numeric strings and BigInts exercise the number predicate's type boundary. |
| [`isNil`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11184-L11239), [`isNull`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11243-L11289), and [`isUndefined`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11889-L11942) | Covers the nullish truth tables, falsy and non-nullish values, and the accepted primitives from another realm. |
| [`isFinite`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L10580-L10632), [integer predicates](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L10727-L10783), [`isLength`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L10787-L10809), and [`isNaN`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11033-L11081) | Covers fractions, large integers, safe-integer and length limits, both signed zeros, infinities, numeric strings, and boxes. Tests primitive `NaN` across realms and asserts both outcomes for boxed `NaN`. |
| [`isArray`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L8998-L9041) and [`isArrayLike`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L9098-L9151) | Covers arrays, arguments, length-only and indexed records, strings, cross-realm inputs, and nonmatching values. The pinned suite has no separate `isArrayLikeObject` module. Its cases adapt the same length and realm scenarios using the non-null object requirement. The tag cases show both outcomes for each array-like API. |
| [`isFunction`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L10636-L10723) | Covers regular, async and generator functions, view and proxy constructors, foreign functions, and other values. Async generators and a function with a read-only custom tag show both outcomes. The browser-only DOM node list is outside the Node test environment. |
| [`isObject`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11344-L11411) and [`isObjectLike`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11415-L11460) | Covers built-ins, functions, null-prototype objects, boxed values, primitives, and foreign objects. DOM elements from the current realm and a browser iframe require a browser. |
| [`isPlainObject`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11464-L11599) | Covers ordinary and null-prototype records, unusual properties, class instances, custom prototypes, foreign records, and tag handling, including preservation of an inherited tag. The DOM-element case needs a browser. The upstream `Math` and arguments expectations are tracked below pending a contract decision. |
| [`isEmpty`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L9381-L9529) | Covers primitives, empty and populated collections, buffer and typed array lengths, arguments, prototype keys, splice collections, and invalid lengths. The tests use a record with `splice` for the jQuery-like protocol and compare an augmented boxed string separately. The populated foreign-map and foreign-set cases are pending a contract decision below. |
| [Shared type checks](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12067-L12113) | The prototype-only stand-ins are compared for Array and Function. Boolean, Number, and String need a branding decision below before testing stand-in acceptance as a guarantee. The legacy IE host object scenario requires its original host environment. |
| [Wrapped results](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26771-L26895) and the wrapper cases in the method suites | Implicit and explicit chaining are deferred. |

### Maintainer decisions and follow-ups

- **Boxed primitives.** Should the four guards recognize genuine wrappers across realms and narrow boxed inputs to their object types? ExtremeJS accepts prototype-only stand-ins for Boolean, Number, and String. Lodash rejects those stand-ins. Consider whether wrapper branding should replace prototype checks and whether `isNaN` should keep its primitive-only scope.
- **Array-like and function types.** `isArrayLikeObject` infers `false` for an `unknown` input, even if the runtime value is an array. It can also infer `true` for a primitive string or for an object with a negative numeric length, both of which return `false`. `isArrayLike` has the same issue with an invalid numeric length. `isFunction` also narrows classes to the callable `FunctionT` even though invoking a class without `new` throws. Review the guard signatures separately.
- **Structural object checks.** Should `isObject` remain a same-realm instance check? `isPlainObject` currently accepts `Math`, arguments objects, and an object inheriting directly from a custom null-prototype root. The pinned Lodash suite expects `false` for `Math` and arguments objects. Decide whether plainness should require an object tag and the usual root prototype.
- **Emptiness.** A populated foreign map or set can appear empty because the local predicates use same-realm constructors. Should traversal by size include foreign collections? An array-like record that falls through to `isBuffer` can also throw a `ReferenceError` in a host without a global `Buffer`. The underlying buffer detection is tracked with the built-in predicates in [#288](https://github.com/extremejs/utils/issues/288).

### Benchmarks

Run `pnpm bench src/is-empty.bench.ts` for one predicate or `pnpm bench` for all. Each mapping has a colocated pair with an expected result checked before timing. Inputs are constructed before timing and include primitive values, functions, and structural values. The emptiness cases cover an empty record and a populated map so that both key lookup and size checks are exercised.

Cases with divergent results, including foreign boxes and collections, custom tags, and boxed `NaN`, are excluded from the paired timings. Missing capabilities and the ExtremeJS-only predicates described above have no direct public API pair.

## Built-in predicates and object introspection

These predicate mappings cover the built-in checks in the [Lodash Lang API](https://lodash.com/docs/4.18.1#isArguments). The realm comparisons use Node.js with the pinned Lodash package. A realm has its own global objects and built-in constructors.

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.isArguments(value)` | `isArguments(value)` | **Covered** for strict and non-strict arguments objects, including across realms. ExtremeJS reads the `Arguments` tag directly. Lodash attempts to mask custom tags. |
| `_.isArrayBuffer(value)` | `isArrayBuffer(value)` | **Covered** for local `ArrayBuffer` instances. Both reject array buffer views and `SharedArrayBuffer`. Lodash also recognizes foreign array buffers. |
| `_.isBuffer(value)` | `isBuffer(value)` | **Partial**. Both recognize Node.js buffers and reject ordinary typed arrays. Hosts without a global `Buffer` need the fallback that Lodash provides. See the follow-up below. |
| `_.isDate(value)` | `isDate(value)` | **Covered** for local dates, including invalid dates. Lodash also recognizes foreign dates. |
| `_.isElement(value)` | `isElement(value)` | **Covered**. Both look for `nodeType === 1` and exclude plain objects according to their own plain-object predicate. Element-like class instances can pass. A custom null-prototype root can make the plain-object checks disagree. |
| `_.isError(value)` | `isError(value)` | **Covered** for local `Error` instances and subclasses, including `DOMException` in Node.js. Lodash also recognizes foreign errors and some non-plain error-like objects. It checks for the `DOMException` tag independently of inheritance. |
| `_.isRegExp(value)` | `isRegExp(value)` | **Covered** for local regular expressions. Lodash also recognizes foreign regular expressions. |
| `_.isMap(value)`, `_.isSet(value)` | `isMap(value)`, `isSet(value)` | **Covered** for local maps and sets. Lodash recognizes foreign collections as well. |
| `_.isWeakMap(value)`, `_.isWeakSet(value)` | `isWeakMap(value)`, `isWeakSet(value)` | **Covered** for local weak collections. Lodash recognizes foreign weak collections as well. |
| `_.isTypedArray(value)` | `isTypedArray(value)` | **Covered** for ordinary numeric and BigInt typed arrays, including across realms and Node.js buffers. ExtremeJS inspects `length` and the tag. Lodash uses a native check in Node.js. |
| `_.toString(value)` | | **Missing**. Lodash converts values to strings, including `""` for nullish values and `"-0"` for negative zero. ExtremeJS `objectToString` and `objectToStringTag` report object tags. |

Lodash has no public equivalent for `typeOf` and `isTypeOf` (native `typeof`), `isInstanceOf` (native `instanceof`), `prototypeOf` (native `Object.getPrototypeOf`), or `objectToString` and `objectToStringTag` (native `Object.prototype.toString` and its tag). See [Object, Path, and Iteratee](#object-path-and-iteratee) for `isPrototype`.

### Upstream scenario decisions

| Lodash 4.18.1 scenario source | Coverage and decision |
| --- | --- |
| [`isArguments`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L8950-L8995) | Covers strict and non-strict arguments, foreign arguments, and rejection of arrays and arguments-like records with `callee` and `length`. |
| [`isArrayBuffer`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L9045-L9095) | Covers local buffers, other storage and view types, and both outcomes for foreign array buffers. |
| [`isBuffer`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L9207-L9258) | Covers Node.js buffers, typed arrays, and array buffers. Lodash's separate build with no `Buffer` returns `false`. The local missing-global case is a bug candidate and is recorded below without making the thrown error a compatibility assertion. |
| [`isDate`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L9260-L9305) and [`isRegExp`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11603-L11649) | Covers local dates, regex literals, constructed regexes, nonmatching inputs, and both outcomes for foreign dates and regexes. Prototype-only stand-ins are tracked below. |
| [`isElement`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L9307-L9379) | Covers a non-plain element-like instance, ordinary records with the upstream `nodeType` variants, and nonmatching instances. A case with a custom null-prototype root asserts both plain-object rules. The `document.body` and iframe cases require a browser DOM, which the Node.js suite lacks. |
| [`isError`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L10509-L10577) | Covers the upstream native error types, a custom subclass, plain error-like records, and both outcomes for foreign errors. Additional cases cover a Node.js `DOMException` and a non-plain object with error fields. |
| [`isMap`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L10813-L10876), [`isSet`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11651-L11716), [`isWeakMap`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11946-L12011), and [`isWeakSet`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12013-L12065) | Covers each local collection, the corresponding strong or weak negative case, records with non-function constructors where upstream checks them, and both outcomes for foreign collections. |
| [`isTypedArray`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L11821-L11887) | Covers every upstream typed array locally and across realms, plus Float16, BigInt arrays, Node.js buffers, and rejection of other views. The supported Node versions supply the constructors, so there are no constructor-unavailable cases in the suite. |
| [Shared type checks](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L12067-L12113) | Date and RegExp stand-ins with only the corresponding prototype are pending a branding decision. The legacy XML host-object case requires Internet Explorer. |
| [`toString`](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L24089-L24162) | The nullish, signed zero, symbol, and array conversion cases have no local equivalent. The wrapped-value case belongs to deferred chaining. |

For each predicate, the common rejection fixtures cover nonmatching values and use explicit `undefined` for the upstream omitted argument case. The introspection specs exercise the native operations directly through ExtremeJS's public exports.

### Maintainer decisions

- **Constructor checks.** Should array buffers, dates, regular expressions, errors, and collections recognize genuine instances from other realms? `Object.create(Date.prototype)` and `Object.create(RegExp.prototype)` pass the current ExtremeJS checks, while Lodash rejects these upstream stand-ins. Consider whether those checks should require a native brand. For errors, decide whether to include DOM exceptions across hosts and non-plain error-like objects.
- **Tag and element checks.** Should arguments and typed arrays require a native brand when `Symbol.toStringTag` or `length` can change their result? Should `isElement` keep the `nodeType` heuristic for class instances or require an actual DOM element? This also depends on the [plain-object decision](#primitive-and-structural-predicates).
- **Return types.** Should `objectToString` and `objectToStringTag` describe host and custom tags in their return types? Should weak-collection guards account for supported symbol keys or values? Review how `isInstanceOf` should narrow functions that provide `Symbol.hasInstance`.

### Suspected bugs and follow-ups

- **Buffer availability.** `Buffer?.isBuffer(value)` can throw `ReferenceError` when the global binding is absent. This also affects callers such as `keys` and `isEmpty`. Verify the intended fallback in a host without `Buffer` when fixing this.
- **Tag-based type results.** `isArguments({ [Symbol.toStringTag]: "Arguments" })` and `isTypedArray({ length: 1, [Symbol.toStringTag]: "Uint8Array" })` return `true` at runtime, while their conditional types report `false` for those inputs. An own tag can also hide a genuine instance. Custom tag strings can reach the introspection helpers even when their signatures only list `OBJECT_STRING_TAG` values.

### Benchmarks

Run `pnpm bench src/is-typed-array.bench.ts` for one predicate or `pnpm bench` for all. Each of the 12 mapped predicates has a pair that checks the expected boolean before timing. Inputs are created before timing. The Node.js `isElement` pair uses an element-like class instance, so its timing applies to the shared heuristic on that fixture.

Comparisons exclude inputs with differing results, missing `Buffer` globals, and browser DOM fixtures. Lodash has no corresponding public introspection workload or local string-conversion pair.

## Date, Function, and remaining Lang

| Lodash category and capability | Missing Lodash entries |
| --- | --- |
| Date timestamp in milliseconds (available natively as `Date.now()`) | `now` |
| Function call counts and rate limiting | `after`, `before`, `debounce`, `once`, `throttle` |
| Function scheduling and result caching | `defer`, `delay`, `memoize` |
| Function binding, currying, and partial application | `bind`, `bindKey`, `curry`, `curryRight`, `partial`, `partialRight`, `wrap` |
| Function argument limits, order, and shape | `ary`, `flip`, `overArgs`, `rearg`, `rest`, `spread`, `unary` |
| Function predicate negation | `negate` |
| Lang array casting and conversion | `castArray`, `toArray` |
| Lang shallow and deep copying, with optional customizers | `clone`, `cloneDeep`, `cloneDeepWith`, `cloneWith` |
| Lang relational comparisons | `gt`, `gte`, `lt`, `lte` |
| Lang numeric conversion, truncation, and clamping | `toFinite`, `toInteger`, `toLength`, `toNumber`, `toSafeInteger` |

`wrap` partially applies a value to a function. Its backlog entry is independent of the [deferred sequence wrappers](#seq). See the [object family](#object-path-and-iteratee) for Lang's `toPlainObject` and the [built-in family](#built-in-predicates-and-object-introspection) for Lang's `toString`.

## Util

| Lodash invocation | ExtremeJS invocation | Coverage and migration notes |
| --- | --- | --- |
| `_.identity(value)` | `identity(value)` | **Covered**. Both return the supplied value unchanged, including the original object reference. Pass `undefined` explicitly to reproduce Lodash's zero-argument call. |
| `_.noop()` | `noop()` | **Covered**. Both do nothing and return `undefined` at runtime. ExtremeJS types the return as `void` and accepts zero arguments in a direct call. It can also serve as a callback where the caller supplies arguments. |

| Lodash capability | Missing Lodash entries |
| --- | --- |
| Catch errors, bind object methods, and choose defaults for nullish or `NaN` values | `attempt`, `bindAll`, `defaultTo` |
| Build fixed-result callbacks and argument selectors | `constant`, `nthArg`, `stubArray`, `stubFalse`, `stubObject`, `stubString`, `stubTrue` |
| Compose functions and predicates | `cond`, `conforms`, `flow`, `flowRight`, `over`, `overEvery`, `overSome` |
| Build numeric sequences, repeat callbacks, and generate IDs | `range`, `rangeRight`, `times`, `uniqueId` |
| Extend objects with methods, restore the prior global `_`, and create isolated Lodash instances | `mixin`, `noConflict`, `runInContext` |

[Object, Path, and Iteratee](#object-path-and-iteratee) owns Util's `iteratee`, `matches`, `matchesProperty`, `method`, `methodOf`, `property`, `propertyOf`, and `toPath`. See [Seq](#seq) for the deferred chaining behavior of `mixin`.

### Upstream scenario decisions

| Lodash 4.18.1 scenario source | Coverage and decision |
| --- | --- |
| [`identity` spec](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L8159-L8168) | Checks the original object reference. The local suite also covers primitive values and compares explicit `undefined` with the Lodash zero-argument form. |
| [`noop` API example](https://github.com/lodash/lodash/blob/4.18.1/doc/README.md#_noop) | The upstream example calls `noop` twice via `times`. The local suite calls both callbacks through native `map` and checks both `undefined` results. It also checks the direct zero-argument calls. |

### Benchmark exceptions

`identity` returns its argument and `noop` has an empty body. A standalone pair would largely measure call overhead or whether the engine inlines and removes the call. Putting either in a loop or a collection operation would primarily time the chosen caller. Both utilities use compatibility tests as evidence for the shared behavior.

## Properties and Methods

| Missing Lodash entries | Capability |
| --- | --- |
| `_.VERSION` | Read the version from the library object. ExtremeJS exposes its version through the exported `@extremejs/utils/package.json`. |
| `_.templateSettings`, `_.templateSettings.escape`, `_.templateSettings.evaluate`, `_.templateSettings.imports`, `_.templateSettings.interpolate`, `_.templateSettings.variable`, `_.templateSettings.imports._` | Configure the compiler's delimiters, data binding, and imported values. These belong with the missing `template` capability in [String](#string). |

## Seq

The [Lodash Seq API](https://github.com/lodash/lodash/blob/4.18.1/doc/README.md#seq) is **Deferred** in full.

| Lodash capability | Deferred entries |
| --- | --- |
| Wrap a value and start an implicit or explicit sequence | `_`, `_.chain`, `_.prototype.chain` |
| Intercept or transform the current value | `_.tap`, `_.thru` |
| Read paths, reverse wrapped arrays, or reuse a sequence with a new input | `_.prototype.at`, `_.prototype.reverse`, `_.prototype.plant` |
| Iterate over wrapped values | `_.prototype[Symbol.iterator]`, `_.prototype.next` |
| Execute queued actions and extract the result | `_.prototype.commit`, `_.prototype.value` (aliases `_.prototype.toJSON` and `_.prototype.valueOf`) |

Deferral also covers implicit unwrapping, lazy evaluation, wrapper forms of standalone utilities, and chainable methods registered through `_.mixin`. The documented native array wrapper methods are `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`. The native string wrapper methods are `replace` and `split`. Standalone methods retain the status assigned in their own sections. The pinned [wrapper scenarios](https://github.com/lodash/lodash/blob/4.18.1/test/test.js#L26168-L26895) remain references for that future work.
