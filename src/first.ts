/**
 * Reads index `0` of an array or string. On strings, this reads one
 * UTF-16 code unit.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to query.
 * @returns The first element or code unit, or `undefined` for ordinary empty inputs.
 * @see {@link https://lodash.com/docs/4.18.1#head | Lodash head} as `_.head(value)` (alias `_.first(value)`). For the prefix without the final element, see {@link head}.
 * @example
 * first([0, 1, 2, 3, 4, 5]); // => 0
 * @example
 * first("012345"); // => "0"
 */
export function first<Value extends unknown[] | string>(value: Value): FirstT<Value> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return value[0] as FirstT<Value>;
}

/**
 * The result type of {@link first}, inferred from a tuple, array element type, or string.
 * @group Collection
 */
export type FirstT<Value extends unknown[] | string> = Value extends string

  // oxlint-disable-next-line typescript/no-unused-vars
  ? Value extends `${ infer First }${ infer Rest }`
    ? First
    : string | undefined
  : Value extends [infer First]
    ? First

    // oxlint-disable-next-line typescript/no-unused-vars
    : Value extends [infer First, ...infer Rest]
      ? First
      : Value extends Array<infer First>
        ? First
        : undefined;
