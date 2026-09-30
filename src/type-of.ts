/**
 * Returns the `typeof` result of `value`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * typeOf(1); // => "number"
 */
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- Preserve the public generic signature.
export function typeOf<Value>(value: Value): TYPE {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing enum return type.
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
