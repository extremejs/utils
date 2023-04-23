/**
 * Returns the `typeof` result of `value`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * typeOf(1);
 * // => "number"
 */
export function typeOf<Value>(value: Value): TYPE {
  return typeof value as TYPE;
}

/**
 * All `typeof` results.
 * @group Other
 */
export enum TYPE {
  BIGINT = "bigint",
  BOOLEAN = "boolean",
  FUNCTION = "function",
  NUMBER = "number",
  OBJECT = "object",
  STRING = "string",
  SYMBOL = "symbol",
  UNDEFINED = "undefined",
}
