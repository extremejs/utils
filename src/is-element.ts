import { builtinGetter, tryReadBuiltin } from "./internal/builtin-brand.js";

const getNamespace = typeof Element === "function"
  ? builtinGetter<string | null>(Element.prototype, "namespaceURI")
  : void 0;

/**
 * Checks for a genuine DOM element, including elements from other realms.
 *
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` when the host's native `Element` accessor recognizes the value.
 * Hosts without an `Element` interface return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isElement | Lodash isElement} as `_.isElement(value)`. Lodash can accept element-like objects.
 * @example
 * isElement(document.body); // => true
 * isElement({ nodeType: 1 }); // => false
 */
export function isElement(value: unknown): value is Element {
  return getNamespace !== void 0 && tryReadBuiltin(getNamespace, value) !== void 0;
}
