/**
 * Reads index `value.length - 1` of a nonempty array or string. On strings,
 * this reads one UTF-16 code unit. Empty arrays are checked before any index is read.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to query.
 * @returns The final element or code unit, or `undefined` if the input is empty or the index is missing.
 * @see {@link https://lodash.com/docs/4.18.1#last | Lodash last} as `_.last(value)`.
 * @example
 * last([0, 1, 2, 3, 4, 5]); // => 5
 * @example
 * last("012345"); // => "5"
 */
export function last<Value extends unknown[] | string>(value: Value): LastT<Value> {
  const length = value.length;

  // Preserve indexed access without calling a potentially overridden method.
  // oxlint-disable-next-line eslint/no-undefined typescript/no-unsafe-type-assertion
  return (length === 0 ? undefined : value[length - 1]) as LastT<Value>;
}

/**
 * The result type of {@link last}, inferred from a tuple, array element type, or string.
 * @group Collection
 */
export type LastT<Value extends unknown[] | string> = Value extends "" | []
  ? undefined
  : Value extends string
    ? string | undefined
    : Value extends [...unknown[], infer Last]
      ? Last
      : Value extends Array<infer Element>
        ? Element | undefined
        : undefined;
