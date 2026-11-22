import { runInNewContext } from "node:vm";
import lodash from "lodash";
import toArguments from "./to-arguments.js";

const objectsWithoutLength: readonly unknown[] = [
  new Date(0),
  new Error("example"),
  { a: 1 },
  /x/,
];

// oxlint-disable-next-line unicorn/new-for-builtins -- Keep the boxed string for array-like and object checks.
const boxedString: unknown = Object("a");

// oxlint-disable-next-line unicorn/new-for-builtins -- Exercise boxed numbers without coercing them to primitives.
export const boxedOne: unknown = Object(1);

export const ordinaryObjects: readonly unknown[] = [toArguments(1), ...objectsWithoutLength];

export const ordinaryFunctions: readonly unknown[] = [lodash, Array.prototype.slice];

export const nonPrimitiveValues: readonly unknown[] = [...ordinaryObjects, ...ordinaryFunctions, [1, 2, 3]];

export const nonNumericValues: readonly unknown[] = [
  ...nonPrimitiveValues,
  null,
  void 0,
  false,
  true,
  "",
  " ",
  "0",
  "08",
  "2",
  "2px",
  "a",
  Symbol("x"),
  1n,
];

// oxlint-disable-next-line unicorn/new-for-builtins -- Exercise boxed primitive values.
export const boxedValues: readonly unknown[] = [Object(false), boxedOne, boxedString, Object(Symbol("x"))];

export function foreignValues(...sources: string[]): unknown[] {
  return sources.map(source => runInNewContext(source) as unknown);
}

export async function asyncFunction(): Promise<number> {
  return 1;
}

export function *generator(): Generator<number> {
  yield 1;
}

export async function *asyncGenerator(): AsyncGenerator<number> {
  yield 1;
}

export function arrayLikeObjects(): unknown[] {
  return [
    toArguments(1),
    [1, 2, 3],
    {
      0     : "a",
      length: 1,
    },
    { length: 0 },
    { length: Number.MAX_SAFE_INTEGER },
    boxedString,
    new Uint8Array(1),
    ...foreignValues("[1]", 'Object("a")', "(function () { return arguments; })(1)"),
  ];
}

export const nonArrayLikeValues: readonly unknown[] = [
  null,
  void 0,
  false,
  true,
  0,
  1,
  Number.NaN,
  Symbol("x"),
  ...objectsWithoutLength,
  ...ordinaryFunctions,
  asyncFunction,
  generator,
  { length: -1 },
  { length: 1.1 },
  { length: Number.MAX_SAFE_INTEGER + 1 },
  { length: "1" },
  { length: boxedOne },
  { length: Infinity },
];
