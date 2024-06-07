import { lowerCase } from "./lower-case.js";
import { upperFirst } from "./upper-first.js";

/**
 * It will convert the first character of the `string` to uppercase and the remaining to lowercase.
 * @group String
 * @since 1.0.0
 * @param string
 * @example
 * capitalize('fred'); // => 'Fred'
 * @example
 * capitalize('FRED'); // => 'Fred'
 * @example
 * capitalize('frED'); // => 'Fred'
 */
export function capitalize<Value extends string>(string: Value): Capitalize<Lowercase<Value>> {
  return upperFirst(lowerCase(string));
}
