import { slice } from "./slice.js";

/**
 * It will return all but the last element of the `value`.
 * @group Collection
 * @since 1.0.0
 * @param value
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
 *
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
