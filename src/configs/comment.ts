import { configComments } from "../plugins";
import type { TypedFlatConfigItem } from "../types";

export const comments = (): TypedFlatConfigItem[] => [
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
