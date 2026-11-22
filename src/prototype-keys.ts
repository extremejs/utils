/*
 * MIT License
 *
 * Copyright (c) 2024 ExtremeJS
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { OBJECT_CONSTRUCTOR } from "./constants/index.js";
import { hasOwn } from "./has-own.js";

/**
 * Lists own enumerable string keys of a prototype object, omitting `constructor`.
 *
 * The filter also applies to other values passed directly. Values are boxed for
 * enumeration. Symbols, non-enumerable keys, and inherited keys are excluded.
 *
 * @group Object
 * @since 1.0.0
 * @param value The prototype or other value to enumerate.
 * @returns A fresh array of own enumerable string keys other than `"constructor"`.
 * @see {@link https://lodash.com/docs/4.18.1#keys | Lodash keys} as `_.keys(value)` for
 * ordinary constructor prototypes. On a plain object Lodash can include an
 * enumerable `constructor`, and on an array it can include sparse indices.
 * @example
 * class Example {}
 * Object.assign(Example.prototype, { flag: true });
 * prototypeKeys(Example.prototype); // => ["flag"]
 */
export function prototypeKeys(value: unknown): PropertyKey[] {
  const result = [];

  for (const key in OBJECT_CONSTRUCTOR(value)) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    if (hasOwn(value as never, key) && key !== "constructor") result.push(key);
  }

  return result;
}
