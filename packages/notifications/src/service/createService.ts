import type { PartialDeep } from 'type-fest';
import { Maybe } from 'monet';
import { interpret } from 'xstate';

import type { IContext } from '../machine';
import { createStateMachine } from '../machine';

import type { ICreateServiceProps } from './interfaces';
import { getConfig, getStateMachineBuilder } from './helpers';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createService(p?: PartialDeep<ICreateServiceProps>) {
  const props = Maybe.fromUndefined(p);
  const context: IContext = {
    currentNotification: Maybe.none(),
    pendingNotifications: [],
    config: getConfig(props),
  };

  const stateMachineBuilder = getStateMachineBuilder(props);
  const stateMachine = stateMachineBuilder(createStateMachine(context));

  const service = interpret(stateMachine).start();

  return service;
}
