/**
 * Copies a range from an array or string with native slice semantics.
 * Array copies are shallow and preserve holes. String indices count UTF-16
 * code units.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to slice.
 * @param start The inclusive start index. Defaults to `0`. Negative indices count from the end.
 * @param end The exclusive end index. Defaults to the input length. Negative indices count from the end.
 * @returns A new array of the input's element type or a substring. The result can be shorter than the input.
 * @see {@link https://lodash.com/docs/4.18.1#slice | Lodash slice} as `_.slice(array, start, end)` for dense arrays. Lodash fills holes with `undefined` and returns an array for string input.
 * @example
 * slice([0, 1, 2, 3, 4, 5], 2); // => [2, 3, 4, 5]
 * @example
 * slice([0, 1, 2, 3, 4, 5], 2, 5); // => [2, 3, 4]
 * @example
 * slice("012345"); // => "012345"
 * @example
 * slice("012345", 2, 4); // => "23"
 */
export function slice<Value extends unknown[] | string>(value: Value, start = 0, end = value.length): SliceT<Value> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Native slice preserves the input kind.
  return value.slice(start, end) as SliceT<Value>;
}

/**
 * The result type of {@link slice}, {@link drop}, and {@link dropRight}.
 * Arrays retain their element type and strings return `string`.
 * @group Collection
 */
export type SliceT<Value extends unknown[] | string> = Value extends unknown[] ? Array<Value[number]> : string;
