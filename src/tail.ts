import { slice } from "./slice.js";

/**
 * Returns a shallow copy of an array without its first element, preserving
 * holes in the retained range. On strings, it removes the first UTF-16 code unit.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to slice.
 * @returns An array of the input's element type or a string with the first element or code unit removed.
 * Empty and single-element inputs produce an empty result.
 * @see {@link https://lodash.com/docs/4.18.1#tail | Lodash tail} as `_.tail(array)` for dense arrays. Lodash fills holes with `undefined` and returns an array for string input.
 * @example
 * tail([0, 1, 2, 3, 4, 5]); // => [1, 2, 3, 4, 5]
 * @example
 * tail("012345"); // => "12345"
 */
export function tail<Value extends unknown[] | string>(value: Value): TailT<Value>;
export function tail(value: unknown[] | string): unknown[] | string {
  return slice(value, 1);
}

/**
 * The result type of {@link tail}. For fixed tuples and string literals, it describes the suffix.
 * A leading template placeholder such as `${number}` can span multiple code units, so its suffix type widens.
 * @group Collection
 */
export type TailT<Value extends unknown[] | string> = Value extends ""
  ? ""
  : Value extends []
    ? []
    : Value extends string
      ? Value extends `${ infer First }${ infer Rest }`
        ? Record<never, never> extends Record<First, never>
          ? string
          : Rest
        : string
      : Value extends [unknown, ...infer Rest]
        ? Rest
        : Value extends Array<infer Element>
          ? Element[]
          : [];
