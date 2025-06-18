import {
  FlatConfigComposer,
  type Arrayable,
  type Awaitable,
} from "eslint-flat-config-utils";
import { comments, javascript, prettier, typescript } from "./configs";

import { imports } from "./configs/imports";
import {
  sortImports,
  sortPackageJson,
  sortPnpmWorkspace,
  sortTsconfig,
} from "./configs/sort";
import { vue } from "./configs/vue";
import { hasVue } from "./env";
import type { ConfigNames } from "./typegen";
import type { Config, Options } from "./types";
import type { Linter } from "eslint";

export const presetJavaScript = (): Config[] => [
  ...comments(),
  ...javascript(),
  ...imports(),
];

export const presetJson = (): Config[] => [
  ...sortPackageJson(),
  ...sortTsconfig(),
  ...sortPnpmWorkspace(),
];

export const presetBasic = (): Config[] => [
  ...presetJavaScript(),
  ...typescript(),
  ...sortImports(),
];

export const presetAll = (): Config[] => [
  ...presetJavaScript(),
  ...presetBasic(),
  ...presetJson(),
  ...prettier(),
  ...vue(),
];

export function tl(
  options: Options = {},
  ...userConfigs: Awaitable<
    Arrayable<Config> | FlatConfigComposer<any, any> | Linter.Config[]
  >[]
): FlatConfigComposer<Config, ConfigNames> {
  const configs: Awaitable<Config[]>[] = [presetBasic(), presetJson()];

  const { prettier: enablePrettier = true, vue: enableVue = hasVue() } =
    options;

  if (enablePrettier) {
    configs.push(prettier());
  }

  if (enableVue) {
    configs.push(vue());
  }

  const composer = new FlatConfigComposer<Config, ConfigNames>(
    ...configs,
    ...(userConfigs as any),
  );

  return composer;
}
