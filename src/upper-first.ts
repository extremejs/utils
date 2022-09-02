import first from "./first.js";
import tail from "./tail.js";
import upperCase from "./upper-case.js";

/**
 * It will convert the first character of the `string` to uppercase.
 * @group String
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
  return (upperCase(first(string) ?? "") + tail(string)) as Capitalize<Value>;
}
