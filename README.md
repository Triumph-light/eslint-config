# tl-eslint-config [![npm](https://img.shields.io/npm/v/tl-eslint-config.svg)](https://npmjs.com/package/tl-eslint-config)

A opinionated ESLint config preset for JavaScript, TypeScript, Vue,
and Prettier.

## Features

- Format with Prettier.
- Designed to work with TypeScript, Vue out-of-box.
- Sort imports, `package.json`, `tsconfig.json`...
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!

## Install

```bash
npm i -D tl-eslint-config
```

Require Node.js >= 18.18, and ESLint >= 9.5.0.

## Usage

```js
import { tl } from "tl-eslint-config";
export default tl(
  // Features: it'll detect installed dependency and enable necessary features automatically
  {
    prettier: true,
    vue: true, // auto detection
  },
  [
    /* your custom config */
  ]
).removeRules("foo/bar"); // see more in https://github.com/antfu/eslint-flat-config-utils
```

### Presets

```js
// eslint.config.js
import {
  presetJavaScript, // Ignore common files and include javascript support
  presetJsonc, // Includes basic json(c) file support and sorting json keys
  presetBasic, // Includes `presetJavaScript` and typescript support

  // Includes
  // - `presetBasic` (JS+TS) support
  // - `presetLangsExtensions` (markdown, yaml, jsonc) support
  // - Vue support
  // - UnoCSS support (`uno.config.ts` is required)
  // - Prettier support
  presetAll,
} from "tl-eslint-config";

export default presetAll;
```

See [preset.ts](./src/presets.ts) for more details.

## License

[MIT](./LICENSE) License © 2021-PRESENT [tl](https://github.com/triumph-light)
