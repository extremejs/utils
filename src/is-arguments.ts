import { hasUntaggedBuiltinTag, nodeTypes } from "./internal/builtin-brand.js";

/**
 * Checks for an arguments object from this realm or another realm.
 *
 * Node.js uses its native brand check, including for arguments with a custom tag.
 * In hosts without that check, only arguments without a `Symbol.toStringTag`
 * property anywhere on their prototype chain are recognized.
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for recognized arguments objects.
 * @see {@link https://lodash.com/docs/4.18.1#isArguments | Lodash isArguments} as `_.isArguments(value)`.
 * @example
 * isArguments(function() { return arguments; }()); // => true
 * @example
 * isArguments([1, 2, 3]); // => false
 */
export function isArguments(value: unknown): value is IArguments {
  return nodeTypes?.isArgumentsObject(value) ?? hasUntaggedBuiltinTag(value, "[object Arguments]");
}
