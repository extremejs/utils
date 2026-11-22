import { slice } from "./slice.js";

/**
 * Returns a shallow copy of an array without its final element, preserving
 * holes in the retained range. On strings, it removes the final UTF-16 code unit.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to slice.
 * @returns An array or string with the last element or code unit removed.
 * Empty and single-element inputs produce an empty result.
 * @see {@link https://lodash.com/docs/4.18.1#initial | Lodash initial} as `_.initial(array)` for dense arrays. Lodash fills holes with `undefined` and returns an array for string input.
 * @example
 * head([0, 1, 2, 3, 4, 5]); // => [0, 1, 2, 3, 4]
 * @example
 * head("012345"); // => "01234"
 */
export function head<Value extends unknown[] | string>(value: Value): HeadT<Value> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return slice(value, 0, -1) as HeadT<Value>;
}

/**
 * The result type of {@link head}. For fixed tuples, it describes the prefix.
 * @group Collection
 */
export type HeadT<Value extends unknown[] | string> = Value extends string
  ? string

  // oxlint-disable-next-line typescript/no-unused-vars
  : Value extends [infer Last]
    ? []

    // oxlint-disable-next-line typescript/no-unused-vars
    : Value extends [...infer Head, infer Last]
      ? Head
      : Value extends Array<infer First>
        ? First
        : [];
