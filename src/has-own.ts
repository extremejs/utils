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
import { type PropertyT, toPath } from "./to-path.js";

/**
 * Checks whether every segment of a path is an own property.
 *
 * Both enumerable and non-enumerable properties count, including symbols and
 * properties with `undefined` values. String paths use the syntax of {@link toPath}.
 * To preserve a literal dotted or bracketed check, wrap the key in a one-element
 * array. Traversal reads intermediate getters and leaves the final getter untouched.
 *
 * @group Object
 * @since 1.0.0
 * @param value The object to check.
 * @param path The key, string path, or explicit keys to check.
 * @returns `true` if every segment is an own property. Empty paths, sparse holes, and inherited keys return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#has | Lodash has} as `_.has(value, path)`.
 * Lodash prefers an existing literal key, counts in-range sparse array and arguments
 * indices, and can invoke the final getter. For a numeric `-0` key, use the
 * string `"0"` in Lodash to match native key conversion.
 * @example
 * hasOwn({ "a.b": undefined }, ["a.b"]); // => true
 * hasOwn({ a: { b: 2 } }, "a.b"); // => true
 * hasOwn({ "": 2 }, [""]); // => true
 */
export function hasOwn(value: RecordT, path: PropertyT): boolean {
  const segments = toPath(path);
  let current: unknown = value;

  for (const [index, key] of segments.entries()) {
    if (current == null || !OBJECT_CONSTRUCTOR.hasOwn(current, key)) return false;
    if (index === segments.length - 1) return true;

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Property access boxes primitives.
    current = (current as Record<PropertyKey, unknown>)[key];
  }

  return false;
}
