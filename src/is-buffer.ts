/**
 * Checks whether the host's global `Buffer` recognizes a value as a Node.js buffer.
 *
 * @group Buffer
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the host's `Buffer.isBuffer` check succeeds. Ordinary `Uint8Array` instances return `false`.
 * @throws A `ReferenceError` if the host has no global `Buffer` binding.
 * @see {@link https://lodash.com/docs/4.18.1#isBuffer | Lodash isBuffer} as `_.isBuffer(value)`. Lodash provides a `false` fallback in hosts without a global `Buffer`.
 * @example
 * isBuffer(Buffer.alloc(2)); // => true
 * isBuffer(new Uint8Array(2)); // => false
 */
export function isBuffer(value: unknown): value is Buffer {
  /* istanbul ignore next */
  // oxlint-disable-next-line typescript/no-unnecessary-condition
  return Buffer?.isBuffer(value) ?? false;
}
