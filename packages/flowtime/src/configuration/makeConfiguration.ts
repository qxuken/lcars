import { Maybe } from 'monet';
import { mergeDeepRight } from 'ramda';
import { PartialDeep } from 'type-fest';
import { defaultConfiguration, IConfiguration } from './configuration';

export const makeConfiguration: (config: Maybe<PartialDeep<IConfiguration>>) => IConfiguration = (config) =>
  config.map(mergeDeepRight(defaultConfiguration)).orSome(defaultConfiguration);
