import { pluginAntfu, pluginImport } from "../plugins";
import type { Config } from "../types";

export const imports = (): Config[] => [
  {
    name: "tl/imports",
    plugins: {
      antfu: pluginAntfu,
      import: pluginImport as any,
    },
    rules: {
      "antfu/import-dedupe": "error",
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-default": "error",
      "import/no-self-import": "error",
      "import/no-webpack-loader-syntax": "error",
    },
  },
];
