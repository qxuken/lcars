import { resolve } from 'path';
import { defineConfig, UserConfig } from 'vite';
import { modifyConfig } from '@qxuken/vite-lib-config';

import packageJson from './package.json';

let entry = resolve(__dirname, 'src/main.ts');

let baseConfig: UserConfig = {};

export default defineConfig(modifyConfig(baseConfig, entry, packageJson));
