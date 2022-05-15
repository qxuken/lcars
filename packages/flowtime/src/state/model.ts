import type { EventObject } from 'xstate';
import type { Maybe } from 'monet';

export interface StartAction extends EventObject {
  type: 'START';
}

export interface StoptAction extends EventObject {
  type: 'STOP';
}

export interface ResetAction extends EventObject {
  type: 'RESET';
}

export interface PauseAction extends EventObject {
  type: 'PAUSE';
}

export interface ResumeAction extends EventObject {
  type: 'RESUME';
}

export interface FocusAction extends EventObject {
  type: 'FOCUS';
}

export interface BreakAction extends EventObject {
  type: 'BREAK';
}

export type Actions =
  | StartAction
  | StoptAction
  | ResetAction
  | PauseAction
  | ResumeAction
  | FocusAction
  | BreakAction;

export interface IContext {
  activityCounter: number;
  workStartTime: Maybe<Date>;
  pauseStartTime: Maybe<Date>;
}

export interface IServices {
  proposals: (type: 'break' | 'focus') => {};
}
