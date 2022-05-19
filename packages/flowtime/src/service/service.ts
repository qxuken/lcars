import type { PartialDeep } from 'type-fest';
import { Maybe } from 'monet';
import { interpret } from 'xstate';

import type { IContext, IService } from '../machine';
import { StateMachine } from '../machine';

import type { ICreateServiceProps } from './interfaces';
import { getConfig, getServices, getStateMachineBuilder } from './helpers';

const initialContext: Omit<IContext, 'config'> = {
  activityCounter: 0,
  workStartTime: Maybe.None(),
  pauseStartTime: Maybe.None(),
};

const defaultService: IService = {
  propose: () => Promise.resolve(),
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createFlowtimeService(p?: PartialDeep<ICreateServiceProps>) {
  const props = Maybe.fromUndefined(p);
  const context: IContext = {
    ...initialContext,
    config: getConfig(props),
  };
  const services = getServices(props, defaultService);

  const stateMachineBuilder = getStateMachineBuilder(props);
  const stateMachine = stateMachineBuilder(StateMachine(context, services));

  const service = interpret(stateMachine).start();

  return service;
}

export type FlowtimeService = ReturnType<typeof createFlowtimeService>;
