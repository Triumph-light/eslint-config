import {
  FlatConfigComposer,
  type Arrayable,
  type Awaitable,
} from "eslint-flat-config-utils";
import {
  comments,
  javascript,
  prettier,
  typescript,
  typescriptReact,
} from "./configs";

import { imports } from "./configs/imports";
import { jsonc } from "./configs/jsonc";
import {
  sortImports,
  sortPackageJson,
  sortPnpmWorkspace,
  sortTsconfig,
} from "./configs/sort";
import { vue } from "./configs/vue";
import { yml } from "./configs/yml";
import { hasReact, hasVue } from "./env";
import type { ConfigNames } from "./typegen";
import type { Config, Options } from "./types";
import type { Linter } from "eslint";

export const presetJavaScript = (): Config[] => [
  ...comments(),
  ...javascript(),
  ...imports(),
];

export const presetJsonc = (): Config[] => [
  ...jsonc(),
  ...sortPackageJson(),
  ...sortTsconfig(),
  ...sortPnpmWorkspace(),
];

/** Includes yaml + `presetJsonc` support */
export const presetLangsExtensions = (): Config[] => [
  ...yml(),
  ...presetJsonc(),
];

export const presetBasic = (): Config[] => [
  ...presetJavaScript(),
  ...typescript(),
  ...sortImports(),
];

export const presetAll = (): Config[] => [
  ...presetJavaScript(),
  ...presetBasic(),
  ...presetLangsExtensions(),
  ...prettier(),
  ...vue(),
];

export function tl(
  options: Options = {},
  ...userConfigs: Awaitable<
    Arrayable<Config> | FlatConfigComposer<any, any> | Linter.Config[]
  >[]
): FlatConfigComposer<Config, ConfigNames> {
  const configs: Awaitable<Config[]>[] = [
    presetBasic(),
    presetLangsExtensions(),
  ];

  const { prettier: enablePrettier = true } = options;

  if (enablePrettier) {
    configs.push(prettier());
  }

  if (hasVue()) {
    configs.push(vue());
  }

  if (hasReact()) {
    configs.push(typescriptReact());
  }

  const composer = new FlatConfigComposer<Config, ConfigNames>(
    ...configs,
    ...(userConfigs as any),
  );

  return composer;
}
