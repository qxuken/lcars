import { resolve } from 'path';
import { defineConfig, UserConfig } from 'vite';
import { modifyConfig } from '@qxuken/vite-lib-config';

import packageJson from './package.json';

const entry = resolve(__dirname, 'src/main.ts');

export const baseConfig: UserConfig = {};

export default defineConfig(modifyConfig(baseConfig, entry, packageJson));
