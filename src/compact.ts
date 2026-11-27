/**
 * Returns a new array containing the truthy elements in their original order.
 * Skips holes and removes false, zero (including `0n`), empty strings, null,
 * undefined, and NaN. The input array is left unchanged.
 *
 * @group Array
 * @since 1.0.0
 * @param array The array to filter.
 * @returns The truthy elements.
 * @see {@link https://lodash.com/docs/4.18.1#compact | Lodash compact} as `_.compact(array)`.
 * @example
 * compact([0, 1, false, 2, "", 3, "a", NaN]); // => [1, 2, 3, "a"]
 */
export function compact<Value>(array: Value[]): Array<CompactT<Value>> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return array.filter(Boolean) as Array<CompactT<Value>>;
}

/**
 * The element type produced by {@link compact}. Known falsy literals are
 * excluded. Broad types such as `number` are retained.
 * @group Array
 */
export type CompactT<Value> = Exclude<Value, "" | 0 | 0n | false | null | undefined>;
