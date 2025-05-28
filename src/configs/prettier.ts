import { pluginPrettier, pluginPrettierRecommended } from "../plugins";
import type { TypedFlatConfigItem } from "../types";

const rules = { ...pluginPrettierRecommended.rules };
export const prettier = (): TypedFlatConfigItem[] => [
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
