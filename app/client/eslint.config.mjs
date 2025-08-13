import js from "@eslint/js";
import globals from "globals";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // Enforce consistent indentation of 4 spaces.
      "indent": ["error", 4],
      // Enforce spacing around infix operators (e.g., `a + b`).
      "space-infix-ops": ["error", { "int32Hint": false }],
      // Enforce the use of single quotes for strings.
      "quotes": ["error", "single"],
      // Disallow the use of `var` in favor of `let` or `const`.
      "no-var": "error",
      // Suggest using `const` for variables that are never reassigned.
      "prefer-const": "error",
      // Enforce the use of strict equality operators (`===` and `!==`).
      "eqeqeq": ["error", "always"],
      // Disallow the use of `console` methods in production code.
      // "no-console": "error",
      // Disallow assignments in conditional expressions.
      "no-cond-assign": ["error", "always"],
      // Disallow unnecessary semicolons.
      "no-extra-semi": "error",
      // Disallow comments on the same line as code.
      // "no-inline-comments": "error",
      // Disallow redundant `else` statements after a `return` in an `if`.
      "no-else-return": "error",
      // Enforce consistent use of curly braces for all control statements.
      "curly": ["error", "all"],
    },
  },
];