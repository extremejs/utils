/* @license
 * Unicode word and symbol patterns adapted from Lodash 4.18.1
 * https://github.com/lodash/lodash/blob/4.18.1/lodash.js
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Based on Underscore.js, copyright Jeremy Ashkenas,
 * DocumentCloud and Investigative Reporters & Editors <http://underscorejs.org/>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const surrogates = String.raw`\ud800-\udfff`;
const combiningMarks = String.raw`\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff`;
const dingbats = String.raw`\u2700-\u27bf`;
const variationSelectors = String.raw`\ufe0e\ufe0f`;

const combiningMark = `[${ combiningMarks }]`;
const skinTone = String.raw`\ud83c[\udffb-\udfff]`;
const flag = String.raw`(?:\ud83c[\udde6-\uddff]){2}`;
const surrogatePair = String.raw`[\ud800-\udbff][\udc00-\udfff]`;
const bmp = `[^${ surrogates }]`;
const decoration = `[${ variationSelectors }]?(?:${ combiningMark }|${ skinTone })?`;
const joined = `(?:\\u200d(?:${ bmp }|${ flag }|${ surrogatePair })${ decoration })*`;

export {
  bmp,
  combiningMark,
  combiningMarks,
  decoration,
  dingbats,
  flag,
  joined,
  skinTone,
  surrogatePair,
  surrogates,
  variationSelectors,
};
