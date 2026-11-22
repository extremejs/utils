import { type TYPE, typeOf } from "./type-of.js";

/**
 * Checks if the `typeof` result of `value` is equal to the provided `type`.
 *
 * This uses the language's categories. For example, `null` has type `object`.
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @param type The expected `typeof` result from {@link TYPE}.
 * @returns `true` if the native result equals `type`.
 * @example
 * isTypeOf(1, TYPE.NUMBER); // => true
 * isTypeOf(null, TYPE.OBJECT); // => true
 */
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- Preserve the public generic signature.
export function isTypeOf<Value>(value: Value, type: TYPE): boolean {
  return typeOf(value) === type;
}
