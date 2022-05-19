import type { PartialDeep } from 'type-fest';
import { Maybe } from 'monet';
import { identity } from 'ramda';

import type { ICreateServiceProps, StateMachineBuilder } from '../interfaces';

export const getStateMachineBuilder = (props: Maybe<PartialDeep<ICreateServiceProps>>): StateMachineBuilder =>
  props.flatMap((p) => Maybe.fromUndefined(p.StateMachineBuilder)).orSome(identity);
