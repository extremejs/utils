/**
 * Creates a new array by appending values and the elements of spreadable
 * inputs to a base array. Arrays are spread one level by default. This follows
 * native array concatenation, including sparse holes and
 * `Symbol.isConcatSpreadable`. Lodash expands appended arrays even when they
 * opt out of spreading. It also accepts a scalar base, expands appended
 * arguments objects, and fills holes in spread arrays with `undefined`.
 *
 * @group Array
 * @since 1.0.0
 * @param array The required base array.
 * @param items Values or arrays to append, in order.
 * @returns A shallow result. With no items, returns a shallow copy of a plain base array.
 * @see {@link https://lodash.com/docs/4.18.1#concat | Lodash concat} as `_.concat(array, ...items)` for ordinary dense arrays and scalar values.
 * @example
 * concat<number | number[]>([1, 2], 3, [4], [[5]]); // => [1, 2, 3, 4, [5]]
 */
export function concat<Value>(array: Value[], ...items: Array<ConcatArray<Value> | Value>): Value[] {
  // oxlint-disable-next-line unicorn/prefer-spread -- Preserve concat flattening and sparse array behavior.
  return array.concat(...items);
}
