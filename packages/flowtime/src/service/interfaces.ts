import type { IConfiguration } from '../configuration';
import type { IMachineServiceProp, StateMachine } from '../machine';

export type StateMachineBuilder = (config: StateMachine) => StateMachine;

export interface ICreateServiceProps {
  config: IConfiguration;
  services: IMachineServiceProp;
  StateMachineBuilder: StateMachineBuilder;
}
