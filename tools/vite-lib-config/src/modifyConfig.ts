import { UserConfig, UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import { PackageJsonParser } from '@qxuken/package-json-parser';
import type { PackageJson } from '@qxuken/package-json-parser';

export function modifyConfig(
  config: UserConfig,
  entry: string,
  packageJson: PackageJson
): UserConfigExport {
  let parsedPackageJson = new PackageJsonParser(packageJson);

  let plugins = config.plugins ?? [];
  plugins.push(dts());

  return {
    ...config,
    plugins,
    build: {
      lib: {
        entry,
        name: parsedPackageJson.packageName().some(),
        fileName: (format) => `main.${format}.js`,
      },
      rollupOptions: {
        external: parsedPackageJson.peerDependenciesList(),
        output: {
          globals: parsedPackageJson.peerDependenciesList().reduce((acc, x) => {
            acc[x] = x;
            return acc;
          }, {} as Record<string, string>),
        },
      },
    },
  };
}
