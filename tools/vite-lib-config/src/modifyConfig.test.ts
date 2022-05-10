import { modifyConfig } from './modifyConfig';

describe('modifyConfig', () => {
  it('converts default config', () => {
    expect(modifyConfig({}, 'main.ts', { name: 'package-name' })).toBeDefined();
  });
});
