import type { IConfiguration } from '../configuration';
import type { IMachineServiceProp, StateMachine } from '../machine';
import { createService } from './createService';

export type StateMachineBuilder = (config: StateMachine) => StateMachine;

export interface ICreateServiceProps {
  config: IConfiguration;
  services: IMachineServiceProp;
  StateMachineBuilder: StateMachineBuilder;
}

export type Service = ReturnType<typeof createService>;

export type State = Service['state'];
