import { builtinGetter, tryReadBuiltin } from "./internal/builtin-brand.js";

const getByteLength = builtinGetter<number>(ArrayBuffer.prototype, "byteLength");

/**
 * Checks for a genuine `ArrayBuffer` across realms.
 *
 * @group Array
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for genuine `ArrayBuffer` values, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isArrayBuffer | Lodash isArrayBuffer} as `_.isArrayBuffer(value)`.
 * @example
 * isArrayBuffer(new ArrayBuffer(8)); // => true
 * isArrayBuffer(new Uint8Array(8)); // => false
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return tryReadBuiltin(getByteLength, value) !== void 0;
}
