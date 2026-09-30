/**
 * It will filter out the falsey values from the provided `array`.
 * @group Array
 * @since 1.0.0
 * @param array
 * @example
 * compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // => [ 1, 2, 3, 'a', 's', 34 ]
 */
export function compact<Value>(array: Value[]): Array<CompactT<Value>> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return array.filter(Boolean) as Array<CompactT<Value>>;
}

/**
 *
 * @group Array
 */
// oxlint-disable-next-line typescript/no-redundant-type-constituents -- Keep the documented falsy values in the type.
export type CompactT<Value> = Exclude<Value, typeof Number.NaN | "" | 0 | false | null | undefined>;
