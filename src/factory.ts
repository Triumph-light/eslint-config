import { type Awaitable, FlatConfigComposer } from "eslint-flat-config-utils";
import type { OptionsConfig, TypedFlatConfigItem } from "./types";
import { prettier, typescript, comments } from "./configs";

export const presetJavaScript = (): TypedFlatConfigItem[] => [...comments()];

export const presetBasic = (): TypedFlatConfigItem[] => [
  ...presetJavaScript(),
  ...typescript(),
  // ...sortImports(),
];

export function tl(
  options: OptionsConfig & Omit<TypedFlatConfigItem, "files"> = {},
  ...userConfigs
): FlatConfigComposer {
  const configs: Awaitable<TypedFlatConfigItem[]>[] = [presetBasic()];

  const {
    jsx: enableJsx,
    // react: enableReact,
    prettier: enablePrettier = true,
  } = options;

  // const stylisticOptions = options.stylistic === false
  // ? false
  // : typeof options.stylistic === 'object'
  //   ? options.stylistic
  //   : {}

  // if (stylisticOptions && !('jsx' in stylisticOptions))
  //   stylisticOptions.jsx = enableJsx
  //   // 基础配置
  //   configs.push(

  //   )

  if (enablePrettier) {
    configs.push(prettier());
  }

  const composer = new FlatConfigComposer(...configs, ...userConfigs);

  return composer;
}
