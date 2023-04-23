/**
 * It will return the first element of the `value`.
 * @group Collection
 * @since 1.0.0
 * @param value
 * @example
 * first([0, 1, 2, 3, 4, 5]);
 * // => 0
 * @example
 * first("012345");
 * // => "0"
 */
export function first<Value extends unknown[] | string>(value: Value): FirstT<Value> {
  return value[0] as FirstT<Value>;
}

/**
 *
 * @group Collection
 */
export type FirstT<Value extends unknown[] | string> = Value extends string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ? Value extends `${ infer First }${ infer Rest }`
    ? First
    : string | undefined
  : Value extends [infer First]
    ? First
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    : Value extends [infer First, ...infer Rest]
      ? First
      : Value extends Array<infer First>
        ? First
        : undefined;
