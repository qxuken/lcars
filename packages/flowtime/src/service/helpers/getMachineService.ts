import type { PartialDeep } from 'type-fest';
import { Maybe } from 'monet';
import { mergeRight } from 'ramda';

import type { IMachineServiceProp } from '../../machine';

import type { ICreateServiceProps } from '../interfaces';

export const getMachineService = (
  props: Maybe<PartialDeep<ICreateServiceProps>>,
  defaultService: IMachineServiceProp
): IMachineServiceProp =>
  props
    .flatMap((p) => Maybe.fromUndefined(p.services))
    .map(mergeRight(defaultService))
    .orSome(defaultService);
