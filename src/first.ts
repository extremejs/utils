/**
 * Reads index `0` of a nonempty array or string. On strings, this reads one
 * UTF-16 code unit. Empty arrays are checked before any index is read.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to query.
 * @returns The first element or code unit, or `undefined` if the input is empty or the index is missing.
 * @see {@link https://lodash.com/docs/4.18.1#head | Lodash head} as `_.head(value)` (alias `_.first(value)`). For the prefix without the final element, see {@link head}.
 * @example
 * first([0, 1, 2, 3, 4, 5]); // => 0
 * @example
 * first("012345"); // => "0"
 */
export function first<Value extends unknown[] | string>(value: Value): FirstT<Value> {
  // oxlint-disable-next-line eslint/no-undefined typescript/no-unsafe-type-assertion -- Empty inputs have no endpoint.
  return (value.length === 0 ? undefined : value[0]) as FirstT<Value>;
}

/**
 * The result type of {@link first}, inferred from a tuple, array element type, or string.
 * String types retain an exact code unit when the leading unit is known.
 * A leading template placeholder such as `${number}` can span multiple code units.
 * @group Collection
 */
export type FirstT<Value extends unknown[] | string> = Value extends "" | []
  ? undefined
  : Value extends string

    // oxlint-disable-next-line typescript/no-unused-vars
    ? Value extends `${ infer First }${ infer Rest }`
      ? Record<never, never> extends Record<First, never>
        ? string | undefined
        : First
      : string | undefined
    : Value extends [infer First, ...unknown[]]
      ? First
      : Value extends Array<infer Element>
        ? Element | undefined
        : undefined;
