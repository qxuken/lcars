import type { IConfiguration } from '../configuration';
import type { StateMachine } from '../machine';
import { createService } from './createService';

export type StateMachineBuilder = (config: StateMachine) => StateMachine;

export interface ICreateServiceProps {
  config: IConfiguration;
  StateMachineBuilder: StateMachineBuilder;
}

export type Service = ReturnType<typeof createService>;

export type State = Service['state'];

export type Dispatch = Service['send'];
