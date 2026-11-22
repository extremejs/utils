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

import { type RecordT, OBJECT_CONSTRUCTOR } from "./constants/index.js";

/**
 * Checks whether a single key belongs directly to an object.
 *
 * Both enumerable and non-enumerable properties count, including symbols and
 * properties with `undefined` values. Dots and brackets in string keys are literal.
 * Checking an accessor does not invoke its getter.
 *
 * @group Object
 * @since 1.0.0
 * @param value The object to check.
 * @param key The direct property key to check.
 * @returns `true` if the key is an own property. Sparse holes and inherited keys return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#has | Lodash has} as `_.has(value, [key])` for a direct key.
 * Lodash also supports deep paths and returns `true` for indices within sparse arrays and
 * arguments objects. Its lookup can invoke getters. For a numeric `-0` key, use the
 * string `"0"` in Lodash to match native key conversion.
 * @example
 * hasOwn({ "a.b": undefined }, "a.b"); // => true
 * hasOwn({ a: { b: 2 } }, "a.b"); // => false
 */
export function hasOwn(value: RecordT, key: PropertyKey): boolean {
  return OBJECT_CONSTRUCTOR.hasOwn(value, key);
}
