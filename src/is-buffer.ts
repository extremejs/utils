/**
 * It will determine whether the provided `value` is a Buffer or not.
 * @since 1.0.0
 * @function isBuffer
 * @param {unknown} value
 * @returns {value is Buffer}
 * @example
 * isBuffer(new Buffer(2));
 * // => true
 * @example
 * isBuffer(new Uint8Array(2));
 * // => false
 */
/* istanbul ignore next */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const isBuffer: (value: unknown) => value is Buffer = Buffer?.isBuffer ?? ((): boolean => false);

export default isBuffer;
