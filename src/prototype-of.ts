import { OBJECT_CONSTRUCTOR } from "./constants/index.js";

/**
 * Returns the `Object.getPrototypeOf` result of `value`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * prototypeOf(Object.create(null)); // => null
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prototypeOf(value: unknown): any {
  return OBJECT_CONSTRUCTOR.getPrototypeOf(value);
}
