import type { PartialDeep } from 'type-fest';
import { Maybe } from 'monet';
import { identity, pipe } from 'ramda';

import type { IConfiguration } from '../configuration';
import type { IService } from '../machine';
import { makeConfiguration } from '../configuration';

import type { ICreateServiceProps, StateMachineBuilder } from './interfaces';

export const getConfig: (props: Maybe<PartialDeep<ICreateServiceProps>>) => IConfiguration = pipe(
  (props) => props.flatMap((p) => Maybe.fromUndefined(p.config)),
  makeConfiguration
);

export const getStateMachineBuilder = (props: Maybe<PartialDeep<ICreateServiceProps>>): StateMachineBuilder =>
  props.flatMap((p) => Maybe.fromUndefined(p.StateMachineBuilder)).orSome(identity);

export const isFullServices = (service: PartialDeep<IService>): service is IService =>
  typeof service.propose === 'function';
export const getServices = (
  props: Maybe<PartialDeep<ICreateServiceProps>>,
  defaultService: IService
): IService =>
  props
    .flatMap((p) => Maybe.fromUndefined(p.services))
    .filter(isFullServices)
    .orSome(defaultService);
