import type { PartialDeep } from 'type-fest';
import { Maybe } from 'monet';
import { interpret } from 'xstate';

import type { IContext, IMachineServiceProp } from '../machine';
import { StateMachine } from '../machine';

import type { ICreateServiceProps } from './interfaces';
import { getConfig, getMachineService, getStateMachineBuilder } from './helpers';

const initialContext: Omit<IContext, 'config'> = {
  activities: [],
  workStartTime: Maybe.None(),
  pauseStartTime: Maybe.None(),
  breakStartTime: Maybe.None(),
};

const defaultService: IMachineServiceProp = {
  propose: () => Promise.resolve(),
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createService(p?: PartialDeep<ICreateServiceProps>) {
  const props = Maybe.fromUndefined(p);
  const context: IContext = {
    ...initialContext,
    config: getConfig(props),
  };
  const machineService = getMachineService(props, defaultService);

  const stateMachineBuilder = getStateMachineBuilder(props);
  const stateMachine = stateMachineBuilder(StateMachine(context, machineService));

  const service = interpret(stateMachine).start();

  return service;
}
