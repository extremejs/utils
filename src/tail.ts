import slice from "./slice.js";

/**
 * It will return all but the first element of the `value`.
 * @since 1.0.0
 * @param value
 * @example
 * tail([0, 1, 2, 3, 4, 5]);
 * // => [1, 2, 3, 4, 5]
 * @example
 * tail("012345");
 * // => "12345"
 */
export default function tail<Value extends unknown[] | string>(value: Value): TailT<Value> {
  return slice(value, 1) as TailT<Value>;
}

export type TailT<Value extends unknown[] | string> = Value extends string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ? Value extends `${ infer First }${ infer Rest }`
    ? Rest
    : string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  : Value extends [infer First]
    ? []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    : Value extends [infer First, ...infer Rest]
      ? Rest
      : Value extends Array<infer First>
        ? First
        : [];
