import { Maybe } from 'monet';
import { defaultConfiguration } from './configuration';
import { makeConfiguration } from './makeConfiguration';

describe('makeConfiguration', () => {
  it('return default configuration if no config is provided', () => {
    const config = makeConfiguration(Maybe.none());
    expect(config).toEqual(defaultConfiguration);
  });
  it('returns merged configuration if config is provided', () => {
    const testConfig = {
      notificationDelay: 500,
    };
    const config = makeConfiguration(Maybe.some(testConfig));
    expect(config).toEqual({
      ...defaultConfiguration,
      ...testConfig,
    });
  });
});
