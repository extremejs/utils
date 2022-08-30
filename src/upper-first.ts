import slice from "./slice.js";
import upperCase from "./upper-case.js";

/**
 * It will convert the first character of the `string` to uppercase.
 * @since 1.0.0
 * @param string
 * @example
 * upperFirst('fred');
 * // => 'Fred'
 * @example
 * upperFirst('FRED');
 * // => 'FRED'
 * @example
 * upperFirst('frED');
 * // => 'FrED'
 */
export default function upperFirst<Value extends string>(string: Value): Capitalize<Value> {
  return (upperCase(slice(string, 0, 1)) + slice(string, 1)) as Capitalize<Value>;
}
