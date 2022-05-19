import type { IConfiguration } from '../configuration';
import type { IService, IStateMachine } from '../machine';

export type StateMachineBuilder = (config: IStateMachine) => IStateMachine;

export interface ICreateServiceProps {
  services: IService;
  config: IConfiguration;
  StateMachineBuilder: StateMachineBuilder;
}
