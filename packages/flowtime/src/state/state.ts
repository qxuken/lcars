import { from } from 'rxjs';
import { interpret } from 'xstate';
import { stateMachine } from './stateMachine';

export const service = interpret(stateMachine).start();
export const state$ = from(service);
