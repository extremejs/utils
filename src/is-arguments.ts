import { isObjectLike } from "./is-object-like.js";
import { objectToStringTag } from "./object-to-string-tag.js";
import { OBJECT_STRING_TAG } from "./object-to-string.js";

/**
 * Checks for a non-null object with the `Arguments` string tag.
 *
 * The tag check recognizes arguments objects from other realms. A custom
 * `Symbol.toStringTag` can affect the result and may invoke a getter.
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the value is object-like and has the `Arguments` tag.
 * @see {@link https://lodash.com/docs/4.18.1#isArguments | Lodash isArguments} as `_.isArguments(value)`. Lodash also detects arguments across realms and attempts to mask custom tags.
 * @example
 * isArguments(function() { return arguments; }()); // => true
 * @example
 * isArguments([1, 2, 3]); // => false
 */
export function isArguments<Value>(value: Value): unknown extends Value
  ? boolean
  : Value extends IArguments ? true : false {
  // Preserve the conditional generic result.
  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  return (isObjectLike(value) && objectToStringTag(value) === OBJECT_STRING_TAG.ARGUMENTS) as any;
}
