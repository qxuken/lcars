import type { PackageJson } from 'type-fest';
import { Maybe } from 'monet';
import { PascalCase } from '@qxuken/text-utils';

export interface ParsedPackageJson extends PackageJson {
  packageName: Maybe<string>;
  peerDependenciesList: Array<string>;
}

export class PackageJsonParser {
  constructor(private readonly json: PackageJson) {}

  toJson(): ParsedPackageJson {
    return {
      ...this.json,
      packageName: this.packageName(),
      peerDependenciesList: this.peerDependenciesList(),
    };
  }

  packageName() {
    return Maybe.fromEmpty(this.json.name)
      .flatMap((s) => Maybe.fromEmpty(s.split('/').at(-1)))
      .map(PascalCase.fromKebabCase);
  }

  peerDependenciesList(): string[] {
    return Maybe.fromEmpty(this.json.peerDependencies).fold<string[]>([])(
      (peers) => Object.keys(peers)
    );
  }
}
