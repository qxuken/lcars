import { modifyConfig } from '../src';

describe('modifyConfig', () => {
  it('converts default config', () => {
    expect(modifyConfig({}, 'main.ts', { name: 'package-name' })).toBeDefined();
  });
});
