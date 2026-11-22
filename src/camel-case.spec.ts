import { camelCase } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should convert the given string to camel case", () => {
  expect(camelCase("some_database_field_name")).toBe("someDatabaseFieldName");

  expect(camelCase("Some label that needs to be camelized")).toBe("someLabelThatNeedsToBeCamelized");

  expect(camelCase("some-javaScript-property")).toBe("someJavaScriptProperty");

  expect(camelCase("some-mixed_string with spaces_underscores-and-hyphens"))
    .toBe("someMixedStringWithSpacesUnderscoresAndHyphens");

  expect(camelCase("foo_bar-22")).toBe("fooBar22");

  expect(camelCase("")).toBe("");
});

describe("lodash compatibility", () => {
  it.each(["foo bar", "Foo bar", "foo Bar", "Foo Bar", "FOO BAR", "fooBar", "--foo-bar--", "__foo_bar__"])(
    "formats %j and keeps the result stable on a second pass",
    (value) => {
      const local = camelCase(value);
      const upstream = lodash.camelCase(value);

      expect(local).toBe("fooBar");
      expect(upstream).toBe("fooBar");
      expect(camelCase(local)).toBe(local);
      expect(lodash.camelCase(upstream)).toBe(upstream);
    },
  );

  it.each(["", "×÷"])("returns an empty result for %j", (value) => {
    expect(camelCase(value)).toBe("");
    expect(lodash.camelCase(value)).toBe("");
  });

  it.each([
    ["déjà vu", "dJVu", "dejaVu"],
    ["a b's c", "aBSC", "aBsC"],
    ["a b’t c", "aBTC", "aBtC"],
    ["🚀 Foo", "foo", "🚀Foo"],
    ["42nd Street", "42NdStreet", "42ndStreet"],
  ])("uses different word boundaries for %j", (value, local, upstream) => {
    expect(camelCase(value)).toBe(local);
    expect(lodash.camelCase(value)).toBe(upstream);
  });

  it.each([
    ["12 feet", "12Feet"],
    ["enable 6h format", "enable6HFormat"],
    ["enable 24H format", "enable24HFormat"],
    ["too legit 2 quit", "tooLegit2Quit"],
    ["walk 500 miles", "walk500Miles"],
    ["xhr2 request", "xhr2Request"],
    ["safe HTML", "safeHtml"],
    ["safeHTML", "safeHtml"],
    ["escape HTML entities", "escapeHtmlEntities"],
    ["escapeHTMLEntities", "escapeHtmlEntities"],
    ["XMLHttpRequest", "xmlHttpRequest"],
    ["XmlHTTPRequest", "xmlHttpRequest"],
  ])("formats numbers and acronyms in %j", (value, expected) => {
    expect(camelCase(value)).toBe(expected);
    expect(lodash.camelCase(value)).toBe(expected);
  });
});
