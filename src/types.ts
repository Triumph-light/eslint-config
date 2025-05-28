import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";

export type TypedFlatConfigItem = Linter.Config;

export type Awaitable<T> = T | Promise<T>;

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem;
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>;

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[];

  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[];
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string;

  /**
   * Override type aware rules.
   */
  overridesTypeAware?: TypedFlatConfigItem["rules"];
}

export interface OptionsConfig {
  javascript?: OptionsOverrides;

  // typesscript?: boolean | OptionsTypescipt

  prettier?: boolean;

  jsx?: boolean;
}
