import isObjectLike from "./is-object-like.js";
import objectToStringTag from "./object-to-string-tag.js";

/**
 * Checks if `value` is likely an `arguments` object.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * isArguments(function() { return arguments; }());
 * // => true
 * @example
 * isArguments([1, 2, 3]);
 * // => false
 */
export default function isArguments<Value>(value: Value): Value extends IArguments ? true : false {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (isObjectLike(value) && objectToStringTag(value) === "Arguments") as any;
}
