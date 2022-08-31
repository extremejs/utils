import { RecordT } from "./get.js";

/**
 * It will determine whether the provided value is a WeakSet object or not.
 * @since 1.0.0
 * @param value
 * @example
 * isWeakSet(new WeakSet);
 * // => true
 * @example
 * isWeakSet(new Set);
 * // => false
 */
export default function isWeakSet(value: unknown): value is WeakSet<RecordT> {
  // TODO: Use "node:util" for node environment.
  return value instanceof WeakSet;
}
