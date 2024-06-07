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

import { OBJECT_PROTOTYPE, type RecordT } from "./constants/index.js";

/**
 * Checks if `value` has the specified `key` as its own property based on `Object.prototype.hasOwnProperty` result.
 * @group Object
 * @since 1.0.0
 * @param value
 * @param key
 * @example
 * hasOwn({ a: 2 }, "a"); // => true
 */
export function hasOwn(value: RecordT, key: PropertyKey): boolean {
  return OBJECT_PROTOTYPE.hasOwnProperty.call(value, key);
}
