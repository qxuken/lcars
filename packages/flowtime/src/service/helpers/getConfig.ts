import type { PartialDeep } from 'type-fest';
import { Maybe } from 'monet';
import { pipe } from 'ramda';

import type { IConfiguration } from '../../configuration';
import { makeConfiguration } from '../../configuration';

import type { ICreateServiceProps } from '../interfaces';

export const getConfig: (props: Maybe<PartialDeep<ICreateServiceProps>>) => IConfiguration = pipe(
  (props) => props.flatMap((p) => Maybe.fromUndefined(p.config)),
  makeConfiguration
);
