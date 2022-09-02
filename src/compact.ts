/**
 * It will filter out the falsey values from the provided `array`.
 * @group Array
 * @since 1.0.0
 * @param array
 * @example
 * compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]);
 * // => [ 1, 2, 3, 'a', 's', 34 ]
 */
export default function compact<Value>(array: Value[]): Array<CompactT<Value>> {
  return array.filter(Boolean) as Array<CompactT<Value>>;
}

/**
 *
 * @group Array
 */
export type CompactT<Value> = Value extends ""
  ? never
  : Value extends 0
    ? never
    : Value extends false
      ? never
      : Value extends null
        ? never
        : Value extends undefined
          ? never
          : Value extends typeof NaN
            ? never
            : Value;
