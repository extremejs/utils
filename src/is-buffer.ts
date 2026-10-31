/**
 * It will determine whether the provided `value` is a Buffer or not.
 * @group Buffer
 * @since 1.0.0
 * @param value
 * @example
 * isBuffer(new Buffer(2)); // => true
 * @example
 * isBuffer(new Uint8Array(2)); // => false
 */
export function isBuffer(value: unknown): value is Buffer {
  /* istanbul ignore next */
  // oxlint-disable-next-line typescript/no-unnecessary-condition
  return Buffer?.isBuffer(value) ?? false;
}
