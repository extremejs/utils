import { builtinGetter, hasUntaggedBuiltinTag, tryReadBuiltin } from "./internal/builtin-brand.js";

const getExceptionName = typeof DOMException === "function"
  ? builtinGetter<string>(DOMException.prototype, "name")
  : void 0;

/**
 * Checks for a genuine native error or DOM exception across realms.
 *
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for native errors and subclasses or for a branded `DOMException`.
 * Hosts without `Error.isError` recognize untagged native errors through their built-in tag.
 * @see {@link https://lodash.com/docs/4.18.1#isError | Lodash isError} as `_.isError(value)`. Lodash can also accept error-like objects.
 * @example
 * isError(new RangeError("out of range")); // => true
 * isError({ name: "Error", message: "example" }); // => false
 */
export function isError(value: unknown): value is Error | DOMException {
  // oxlint-disable-next-line typescript/no-unnecessary-condition -- Some browsers have no Error.isError.
  return (Error.isError?.(value) ?? hasUntaggedBuiltinTag(value, "[object Error]"))
    || (getExceptionName !== void 0 && tryReadBuiltin(getExceptionName, value) !== void 0);
}
