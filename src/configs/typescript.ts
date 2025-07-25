import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { GLOB_JS, GLOB_TS, GLOB_TSX } from "../globs";
import { tseslint } from "../plugins";
import type { Rules } from "../typegen";
import type { Config } from "../types";
import { restrictedSyntaxJs } from "./javascript";

export const typescriptCore = tseslint.config({
  extends: [...tseslint.configs.recommended],
  files: [GLOB_TS, GLOB_TSX],
  name: "tl/typescript",
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/method-signature-style": ["error", "property"], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true,
      },
    ],

    // handled by unused-imports/no-unused-imports
    "@typescript-eslint/no-unused-vars": "off",

    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-literal-enum-member": [
      "error",
      { allowBitwiseExpressions: true },
    ],

    "no-restricted-syntax": [
      "error",
      ...restrictedSyntaxJs,
      "TSEnumDeclaration[const=true]",
    ],
  } satisfies Rules,
}) as Config[];

export const typescript = (): Config[] => [
  ...typescriptCore,
  {
    files: ["**/*.d.ts"],
    name: "tl/typescript/dts-rules",
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "no-restricted-syntax": "off",
      "unused-imports/no-unused-vars": "off",
    },
  },
  {
    files: [GLOB_JS, "**/*.cjs"],
    name: "tl/typescript/cjs-rules",
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export const typescriptReact = (hasVite: boolean): Config[] => [
  {
    files: [GLOB_TSX],
    name: "tl/typescript/react",
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...(hasVite
        ? reactRefresh.configs.vite.rules
        : reactRefresh.configs.recommended.rules),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
