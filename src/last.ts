/**
 * Reads index `value.length - 1` of an array or string. On strings, this
 * reads one UTF-16 code unit.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to query.
 * @returns The final element or code unit, or `undefined` for ordinary empty inputs.
 * @see {@link https://lodash.com/docs/4.18.1#last | Lodash last} as `_.last(value)`.
 * @example
 * last([0, 1, 2, 3, 4, 5]); // => 5
 * @example
 * last("012345"); // => "5"
 */
export function last<Value extends unknown[] | string>(value: Value): LastT<Value> {
  // Preserve indexed access without calling a potentially overridden method.
  // oxlint-disable-next-line unicorn/prefer-at typescript/no-unsafe-type-assertion
  return value[value.length - 1] as LastT<Value>;
}

/**
 * The result type of {@link last}, inferred from a tuple, array element type, or string.
 * @group Collection
 */
export type LastT<Value extends unknown[] | string> = Value extends string
  ? string | undefined
  : Value extends never[]
    ? undefined
    : Value extends [infer Last]
      ? Last

      // oxlint-disable-next-line typescript/no-unused-vars
      : Value extends [...infer Head, infer Last]
        ? Last
        : Value extends Array<infer Last>
          ? Last
          : undefined;
