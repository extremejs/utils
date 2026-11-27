import { snakeCase } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should convert the given string to snake case", () => {
  expect(snakeCase("camelCase")).toBe("camel_case");

  expect(snakeCase("some text")).toBe("some_text");

  expect(snakeCase("some-mixed_string With spaces_underscores-and-hyphens"))
    .toBe("some_mixed_string_with_spaces_underscores_and_hyphens");

  expect(snakeCase("AllThe-small Things")).toBe("all_the_small_things");

  expect(snakeCase("IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML"))
    .toBe("i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html");

  expect(snakeCase("")).toBe("");
});

describe("lodash compatibility", () => {
  it.each(["foo bar", "Foo bar", "foo Bar", "Foo Bar", "FOO BAR", "fooBar", "--foo-bar--", "__foo_bar__"])(
    "formats %j and keeps the result stable on a second pass",
    (value) => {
      const local = snakeCase(value);
      const upstream = lodash.snakeCase(value);

      expect(local).toBe("foo_bar");
      expect(upstream).toBe("foo_bar");
      expect(snakeCase(local)).toBe(local);
      expect(lodash.snakeCase(upstream)).toBe(upstream);
    },
  );

  it.each(["", "×÷"])("returns an empty result for %j", (value) => {
    expect(snakeCase(value)).toBe("");
    expect(lodash.snakeCase(value)).toBe("");
  });

  it.each([
    ["déjà vu", "deja_vu"],
    ["a b's c", "a_bs_c"],
    ["a b’t c", "a_bt_c"],
    ["🚀 Foo", "🚀_foo"],
    ["42nd Street", "42nd_street"],
    ["XML2Parser", "xml_2_parser"],
    ["Œuvre Æsir Straße İZ", "oeuvre_aesir_strasse_iz"],
    ["Cafe\u0301 👩🏽‍💻 1stPrize", "cafe_👩🏽‍💻_1st_prize"],
    ["東京 Map", "東京_map"],
  ])("formats Unicode words and symbols in %j", (value, expected) => {
    expect(snakeCase(value)).toBe(expected);
    expect(lodash.snakeCase(value)).toBe(expected);
  });
});
