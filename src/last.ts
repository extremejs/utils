/**
 * It will return the last element of the `value`.
 * @group Collection
 * @since 1.0.0
 * @param value
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
 *
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
