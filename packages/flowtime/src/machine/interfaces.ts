import type { EventObject } from 'xstate';
import type { Maybe } from 'monet';

import type { IConfiguration } from '../configuration';

export interface IStartAction extends EventObject {
  type: 'START';
}

export interface IStoptAction extends EventObject {
  type: 'STOP';
}

export interface IResetAction extends EventObject {
  type: 'RESET';
}

export interface IPauseAction extends EventObject {
  type: 'PAUSE';
}

export interface IResumeAction extends EventObject {
  type: 'RESUME';
}

export interface IFocusAction extends EventObject {
  type: 'FOCUS';
}

export interface IBreakAction extends EventObject {
  type: 'BREAK';
}

export type Action =
  | IStartAction
  | IStoptAction
  | IResetAction
  | IPauseAction
  | IResumeAction
  | IFocusAction
  | IBreakAction;

export type ActionType = Action['type'];

export const ActionTypes: Array<ActionType> = ['START', 'STOP', 'RESET', 'PAUSE', 'RESUME', 'FOCUS', 'BREAK'];

export interface IContext {
  activityCounter: number;
  workStartTime: Maybe<Date>;
  pauseStartTime: Maybe<Date>;
  config: IConfiguration;
}

export interface IMachineServiceProp {
  propose(type: 'break' | 'stop'): Promise<void> | void;
}

export interface IMeta {
  recommendationType: Maybe<string>;
  recommendationModifier: Maybe<string>;
}
