import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `Error` constructor.
 *
 * @group Error
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the local `instanceof Error` check succeeds, including for subclasses.
 * @see {@link https://lodash.com/docs/4.18.1#isError | Lodash isError} as `_.isError(value)`. Lodash recognizes foreign errors and some non-plain error-like objects. It also checks for the `DOMException` tag directly.
 * @example
 * isError(new RangeError("out of range")); // => true
 * isError({ name: "Error", message: "example" }); // => false
 */
export function isError(value: unknown): value is Error {
  return isInstanceOf(value, Error);
}
