import { configComments } from "../plugins";
import type { Config } from "../types";

export const comments = (): Config[] => [
  {
    ...configComments.recommended,
    name: "tl/comments/recommended",
  },
  {
    name: "tl/comments",
    rules: {
      "@eslint-community/eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: true },
      ],
    },
  },
];
