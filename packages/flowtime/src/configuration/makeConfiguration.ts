import type { PartialDeep } from 'type-fest';
import { Maybe } from 'monet';
import { mergeDeepRight } from 'ramda';

import type { IConfiguration } from './configuration';
import { defaultConfiguration } from './configuration';

export const makeConfiguration: (config: Maybe<PartialDeep<IConfiguration>>) => IConfiguration = (config) =>
  config.map(mergeDeepRight(defaultConfiguration)).orSome(defaultConfiguration);
