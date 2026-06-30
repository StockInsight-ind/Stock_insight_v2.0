import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      globals: {
        ...globals.node,

        // ✅ Jest globals (THIS FIXES YOUR ERROR)
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },

    rules: {
      "no-unused-vars": "warn",
    },
  },
];