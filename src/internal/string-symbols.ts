/* @license
 * Unicode patterns adapted from Lodash 4.18.1.
 * See symbol-patterns.ts for the copyright and license.
 */

import {
  bmp,
  combiningMark,
  combiningMarks,
  decoration,
  flag,
  joined,
  skinTone,
  surrogatePair,
  surrogates,
  variationSelectors,
} from "./symbol-patterns.js";

const symbolBase = `(?:${ bmp }${ combiningMark }?|${ combiningMark }|${ flag }|${ surrogatePair }|[${ surrogates }])`;
const stringSymbol = `${ skinTone }(?=${ skinTone })|${ symbolBase }${ decoration }${ joined }`;
const firstSymbol = new RegExp(`^(?:${ stringSymbol })`);
const symbols = new RegExp(stringSymbol, "g");
const hasComplexSymbol = new RegExp(`[\\u200d${ surrogates }${ combiningMarks }${ variationSelectors }]`);

type CaseMethod = "toUpperCase" | "toLowerCase";

type CaseT<Value extends string, Method extends CaseMethod>
  = Method extends "toUpperCase" ? Uppercase<Value> : Lowercase<Value>;

type CaseFirstUnitT<Value extends string, Method extends CaseMethod>
  = Method extends "toUpperCase" ? Capitalize<Value> : Uncapitalize<Value>;

// An ordinary cased second letter marks a boundary. Combining iota can belong to the first symbol.
type PossibleDecorationT<Value extends string>
  = Value extends "\u0345" ? true : Uppercase<Value> extends Lowercase<Value> ? true : false;

// Open string types can contain joiners or combining iota that extend the first symbol.
// Checking pairs of uncased units also supports compilers that infer UTF-16 units.
export type CaseFirstSymbolT<Value extends string, Method extends CaseMethod>
  = Value extends string
    ? Record<never, never> extends Record<Value, never> ? string
      : Value extends `${ infer First }${ infer Second }${ infer Rest }`
        ? PossibleDecorationT<Second> extends true
          ? Value extends `${ string }${ "\u0345" | "\u200D" }${ string }` ? string
            : Uppercase<First | Second> extends Lowercase<First | Second>
              ? `${ CaseT<`${ First }${ Second }`, Method> }${ Rest }`
              : CaseFirstUnitT<Value, Method>
          : CaseFirstUnitT<Value, Method>
        : CaseFirstUnitT<Value, Method>
    : never;

export function caseFirstSymbol<Value extends string, Method extends CaseMethod>(
  string: Value,
  method: Method,
): CaseFirstSymbolT<Value, Method> {
  const first = firstSymbol.exec(string)?.[0] ?? "";

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Matches the leading symbol case type.
  return (first[method]() + string.slice(first.length)) as CaseFirstSymbolT<Value, Method>;
}

export function splitStringSymbols(string: string, limit?: number): string[] {
  const end = limit === void 0 ? string.length : limit >>> 0;

  if (end === 0) return [];

  // Check one extra code unit in case a symbol extends past the initial prefix.
  if (!hasComplexSymbol.test(string.slice(0, end + 1))) return string.split("", end);

  if (end >= string.length) return string.match(symbols) ?? [];

  const result: string[] = [];

  for (const [symbol] of string.matchAll(symbols)) {
    result.push(symbol);

    if (result.length === end) break;
  }

  return result;
}
