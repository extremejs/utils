import { slice } from "./slice.js";

/**
 * Returns a shallow copy of an array without its first element, preserving
 * holes in the retained range. On strings, it removes the first UTF-16 code unit.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to slice.
 * @returns An array or string with the first element or code unit removed.
 * Empty and single-element inputs produce an empty result.
 * @see {@link https://lodash.com/docs/4.18.1#tail | Lodash tail} as `_.tail(array)` for dense arrays. Lodash fills holes with `undefined` and returns an array for string input.
 * @example
 * tail([0, 1, 2, 3, 4, 5]); // => [1, 2, 3, 4, 5]
 * @example
 * tail("012345"); // => "12345"
 */
export function tail<Value extends unknown[] | string>(value: Value): TailT<Value> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return slice(value, 1) as TailT<Value>;
}

/**
 * The result type of {@link tail}. For fixed tuples and string literals, it describes the suffix.
 * @group Collection
 */
export type TailT<Value extends unknown[] | string> = Value extends string

  // oxlint-disable-next-line typescript/no-unused-vars
  ? Value extends `${ infer First }${ infer Rest }`
    ? Rest
    : string

  // oxlint-disable-next-line typescript/no-unused-vars
  : Value extends [infer First]
    ? []

    // oxlint-disable-next-line typescript/no-unused-vars
    : Value extends [infer First, ...infer Rest]
      ? Rest
      : Value extends Array<infer First>
        ? First
        : [];
