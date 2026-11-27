import { getTypedArrayTag } from "./internal/builtin-brand.js";

/**
 * Checks whether the host's global `Buffer` recognizes a value as a Node.js buffer.
 *
 * @group Buffer
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a genuine `Uint8Array` that the host reports as a buffer.
 * Returns `false` when the host has no global `Buffer`.
 * @see {@link https://lodash.com/docs/4.18.1#isBuffer | Lodash isBuffer} as `_.isBuffer(value)`. Lodash provides a `false` fallback in hosts without a global `Buffer`.
 * @example
 * isBuffer(Buffer.alloc(2)); // => true
 * isBuffer(new Uint8Array(2)); // => false
 */
export function isBuffer(value: unknown): value is Buffer {
  return typeof Buffer !== "undefined" && Buffer.isBuffer(value) && getTypedArrayTag.call(value) === "Uint8Array";
}
