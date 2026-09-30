import { slice } from "./slice.js";

/**
 * It will return all but the first element of the `value`.
 * @group Collection
 * @since 1.0.0
 * @param value
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
