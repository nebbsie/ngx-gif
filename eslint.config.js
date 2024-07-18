// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config({
  files: ["**/*.ts"],
  plugins: {},
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...angular.configs.tsRecommended,
  ],
  processor: angular.processInlineTemplates,
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
});
