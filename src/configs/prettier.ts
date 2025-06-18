import { pluginPrettier, pluginPrettierRecommended } from "../plugins";
import type { Config } from "../types";

const rules = { ...pluginPrettierRecommended.rules };
export const prettier = (): Config[] => [
  {
    name: "tl/prettier",
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...rules,
      "prettier/prettier": ["error"],
    },
  },
];
