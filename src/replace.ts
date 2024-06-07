/**
 * It will replace matches for the `searchValue` in the `string` with the `replaceValue`.
 * @group String
 * @since 1.0.0
 * @param string
 * @param searchValue
 * @param replaceValue
 * @param all
 * @example
 * replace("Hi Fred, I'm Fred!", "Fred", "Barney"); // => "Hi Barney, I'm Fred!"
 * @example
 * replace("Hi Fred, I'm Fred too!", "Fred", "Barney", true); // => "Hi Barney, I'm Barney too!"
 */
// eslint-disable-next-line max-params
export function replace(
  string: string,
  searchValue: RegExp | string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replaceValue: string | ((substring: string, ...args: any[]) => string),
  all = false,
): string {
  if (all) return string.replaceAll(searchValue, replaceValue as string);

  return string.replace(searchValue, replaceValue as string);
}
