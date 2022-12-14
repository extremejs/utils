/**
 * Returns the `typeof` result of `value`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * typeOf(1);
 * // => "number"
 */
export default function typeOf<Value>(value: Value): JSTypeT {
  return typeof value;
}

/**
 * All `typeof` results.
 * @group Other
 */
export const TYPE = {
  BIGINT   : "bigint",
  BOOLEAN  : "boolean",
  FUNCTION : "function",
  NUMBER   : "number",
  OBJECT   : "object",
  STRING   : "string",
  SYMBOL   : "symbol",
  UNDEFINED: "undefined",
} as const;

/**
 *
 * @group Other
 */
export type JSTypeT = typeof TYPE[keyof typeof TYPE];
