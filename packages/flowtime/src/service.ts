/* eslint-disable @rushstack/typedef-var */
import { Maybe } from 'monet';
import { identity } from 'ramda';
import type { PartialDeep } from 'type-fest';
import { interpret } from 'xstate';
import { IConfiguration, makeConfiguration } from './configuration';
import { IContext, IService, StateMachine, IStateMachine } from './stateMachine';

const initialContext: Omit<IContext, 'config'> = {
  activityCounter: 0,
  workStartTime: Maybe.None(),
  pauseStartTime: Maybe.None(),
};

export interface ICreateServiceProps {
  service: IService;
  config: IConfiguration;
  StateMachineBuilder(machine: IStateMachine): IStateMachine;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createFlowtimeService(p?: PartialDeep<ICreateServiceProps>) {
  const props = Maybe.fromEmpty(p);
  const config = makeConfiguration(props.flatMap((p) => Maybe.fromEmpty(p.config)));
  const context = {
    ...initialContext,
    config,
  };
  const stateMachineBuilder = props.flatMap((p) => Maybe.fromEmpty(p.StateMachineBuilder)).orSome(identity);
  const stateMachine = stateMachineBuilder(StateMachine(context));
  const service = interpret(stateMachine).start();
  return service;
}
