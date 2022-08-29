import { camelCase } from "@extremejs/utils";

it("should convert the given string to camel case", () => {
  expect(camelCase("some_database_field_name")).toBe("someDatabaseFieldName");

  expect(camelCase("Some label that needs to be camelized")).toBe("someLabelThatNeedsToBeCamelized");

  expect(camelCase("some-javaScript-property")).toBe("someJavaScriptProperty");

  expect(camelCase("some-mixed_string with spaces_underscores-and-hyphens"))
    .toBe("someMixedStringWithSpacesUnderscoresAndHyphens");

  expect(camelCase("foo_bar-22")).toBe("fooBar22");

  expect(camelCase("")).toBe("");
});
