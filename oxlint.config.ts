import { defineConfig } from "oxlint";
import { config } from "oxlint-config-noir";

export default defineConfig({
  extends: [config.recommended],
  rules  : {
    "import/no-relative-parent-imports"  : "off",
    "typescript/no-magic-numbers"        : "off",
    "js-plugin-unicorn/name-replacements": "off",

    // TODO: temporarily disabled due to Oxlint migration
    "@stylistic/no-extra-parens"        : "off",
    "@stylistic/no-multi-spaces"        : "off",
    "@stylistic/type-annotation-spacing": "off",

    // TODO: temporarily disabled due to Oxlint issue
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/no-array-sort"                : "off",

    // TODO: temporarily disabled due to immature implementation
    "typescript/unbound-method": "off",
  },
  overrides: [
    {
      // Preserve existing constant module paths.
      files: ["src/constants/LETTER_CASE_REGEX.ts", "src/constants/OBJECT.ts"],
      rules: { "unicorn/filename-case": "off" },
    },
  ],
});
