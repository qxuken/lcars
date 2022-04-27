import { PackageJsonParser } from '../src';

describe('PackageJsonParser', () => {
  it('name with prefix', () => {
    let parsedPackageJson = new PackageJsonParser({
      name: '@qxuken/package-name',
    });
    expect(parsedPackageJson.packageName().some()).toEqual('PackageName');
  });
  it('name without prefix', () => {
    let parsedPackageJson = new PackageJsonParser({
      name: 'package-name',
    });
    expect(parsedPackageJson.packageName().some()).toEqual('PackageName');
  });
  it('packageName is none', () => {
    let parsedPackageJson = new PackageJsonParser({});
    expect(parsedPackageJson.packageName().isNone()).toBeTruthy();
  });
  it('get peers deps list', () => {
    let parsedPackageJson = new PackageJsonParser({
      peerDependencies: {
        react: '18',
      },
    });
    expect(parsedPackageJson.peerDependenciesList()).toEqual(['react']);
  });
  it('empty peers deps list', () => {
    let parsedPackageJson = new PackageJsonParser({});
    expect(parsedPackageJson.peerDependenciesList()).toEqual([]);
  });
});
