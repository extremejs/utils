/* @license
 * Unicode patterns adapted from Lodash 4.18.1.
 * See symbol-patterns.ts for the copyright and license.
 */

import { combiningMarks, decoration, dingbats, flag, joined, surrogatePair, surrogates } from "./symbol-patterns.js";

const breaks = String.raw`\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f`
  + String.raw` \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u202f\u205f\u3000`;

const emoji = `(?:[${ dingbats }]|${ flag }|${ surrogatePair })${ decoration }${ joined }`;

// Latin letters are folded before matching, so only ASCII letters mark case transitions.
const otherLetter = `[^${ surrogates }${ breaks }${ dingbats }\\da-zA-Z]`;
const lowerLetter = `(?:[a-z]|${ otherLetter })`;
const upperLetter = `(?:[A-Z]|${ otherLetter })`;
const word = new RegExp([
  `[A-Z]?[a-z]+(?=[${ breaks }A-Z]|$)`,
  `${ upperLetter }+(?=[${ breaks }]|[A-Z]${ lowerLetter }|$)`,
  `[A-Z]?${ lowerLetter }+`,
  "[A-Z]+",
  String.raw`\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])`,
  String.raw`\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])`,
  String.raw`\d+`,
  emoji,
].join("|"), "g");
const compoundWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|\d[a-zA-Z]|[a-zA-Z]\d|[^a-zA-Z\d ]/;

const latinLetter = /[À-ÖØ-öø-ſ]/g;
const latinOverrides: Record<string, string> = {
  Æ: "Ae",
  Ð: "D",
  Ø: "O",
  Þ: "Th",
  ß: "ss",
  æ: "ae",
  ð: "d",
  ø: "o",
  þ: "th",
  Đ: "D",
  đ: "d",
  Ħ: "H",
  ħ: "h",
  ı: "i",
  Ĳ: "IJ",
  ĳ: "ij",
  ĸ: "k",
  Ŀ: "L",
  ŀ: "l",
  Ł: "L",
  ł: "l",
  ŉ: "'n",
  Ŋ: "N",
  ŋ: "n",
  Œ: "Oe",
  œ: "oe",
  Ŧ: "T",
  ŧ: "t",
  ſ: "s",
};
const foldMarks = new RegExp(`[${ combiningMarks }'’]`, "g");

export function caseWords(string: string): string[] {
  const folded = string
    .replaceAll(latinLetter, letter => latinOverrides[letter] ?? letter.normalize("NFD"))
    .replaceAll(foldMarks, "");

  return folded.match(compoundWord.test(folded) ? word : /[a-z\d]+/gi) ?? [];
}
