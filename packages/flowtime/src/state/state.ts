/* eslint-disable @rushstack/typedef-var */
import { from } from 'rxjs';
import { interpret } from 'xstate';
import { stateMachine } from './stateMachine';

export const service = interpret(stateMachine).start();
export type Service = typeof service;
export const state$ = from(service);
