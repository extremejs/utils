import { first } from "./first.js";
import { lowerCase } from "./lower-case.js";
import { tail } from "./tail.js";

/**
 * It will convert the first character of the `string` to lowercase.
 * @group String
 * @since 1.0.0
 * @param string
 * @example
 * lowerFirst('Fred'); // => 'fred'
 * @example
 * lowerFirst('FRED'); // => 'fRED'
 * @example
 * lowerFirst('fred'); // => 'fred'
 */
export function lowerFirst<Value extends string>(string: Value): Uncapitalize<Value> {
  // Keep the fallback for an empty string.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion typescript/no-unnecessary-condition
  return (lowerCase(first(string) ?? "") + tail(string)) as Uncapitalize<Value>;
}
