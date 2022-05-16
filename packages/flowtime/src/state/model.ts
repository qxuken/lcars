import type { EventObject, ServiceMap } from 'xstate';
import type { Maybe } from 'monet';

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

export type IActions =
  | IStartAction
  | IStoptAction
  | IResetAction
  | IPauseAction
  | IResumeAction
  | IFocusAction
  | IBreakAction;

export interface IContext {
  activityCounter: number;
  workStartTime: Maybe<Date>;
  pauseStartTime: Maybe<Date>;
}
