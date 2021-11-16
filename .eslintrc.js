module.exports = {
  extends: [
    /* Airbnb JavaScript Style Guide */
    "airbnb-base",
    "airbnb-typescript/base",

    /* Prettier */
    "prettier",

    /* Misc. */
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    "sort-destructure-keys",
    "sort-keys-fix",
    "tsdoc",
    "typescript-sort-keys",
  ],
  rules: {
    // Disable the rules that doesn't provide much value in TypeScript:
    "consistent-return": "off",

    // Group the imports in a more structured way:
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
      },
    ],

    // Order everything that can be ordered in a definite way:
    "@typescript-eslint/member-ordering": ["error", { typeLiterals: "never" }],
    "sort-destructure-keys/sort-destructure-keys": [
      "error",
      { caseSensitive: false },
    ],
    "sort-keys-fix/sort-keys-fix": [
      "error",
      "asc",
      { caseSensitive: false, natural: true },
    ],
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",

    // Ignores variable references if the declaration is in an upper scope
    // (still reports if it's in the same scope as the declaration). Also
    // ignores hoisted function declarations:
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, variables: false },
    ],

    // Validate that TSDoc comments conform to the specification:
    "tsdoc/syntax": "error",

    // Disallow using `expect`` outside of the block where it makes sense:
    "jest/no-standalone-expect": [
      "error",
      {
        additionalTestBlockFunctions: [
          "afterAll",
          "afterEach",
          "beforeAll",
          "beforeEach",
        ],
      },
    ],
  },
};
