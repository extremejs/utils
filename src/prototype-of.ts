import { OBJECT_CONSTRUCTOR } from "./constants/index.js";

/**
 * Reads the immediate prototype using `Object.getPrototypeOf`.
 *
 * The native operation boxes non-nullish primitives and can invoke a proxy's
 * `getPrototypeOf` trap.
 * @group Other
 * @since 1.0.0
 * @param value The object or non-nullish primitive to inspect.
 * @returns The immediate prototype, or `null` for a value with no prototype.
 * @throws A `TypeError` for `null` or `undefined`.
 * @example
 * prototypeOf(Object.create(null)); // => null
 * prototypeOf(1); // => Number.prototype
 */
// oxlint-disable-next-line typescript/no-explicit-any
export function prototypeOf(value: unknown): any {
  return OBJECT_CONSTRUCTOR.getPrototypeOf(value);
}
