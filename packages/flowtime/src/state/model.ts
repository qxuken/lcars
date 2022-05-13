import { Maybe } from 'monet';

export enum Phase {
  Idle,
  Focus,
  Break,
  Pause,
}

export interface Interruption {
  duration: Maybe<Date>;
  startTime: Maybe<Date>;
}

export interface State {
  focusPhaseCount: number;
  nextRecommendedPhase: Phase;
  recommendedPhaseDurationMin: Maybe<number>;
  lastPhaseStartTime: Maybe<Date>;
  interruptionStartTime: Maybe<Date>;
}

export interface StartFocusAction {
  type: 'startFocus';
}

export interface StartBreakAction {
  type: 'startBreak';
}

export interface PauseAction {
  type: 'pause';
}

export interface ResumeAction {
  type: 'resume';
}

export interface StopAction {
  type: 'stop';
}

export interface ResetAction {
  type: 'reset';
}

export type Action =
  | StartFocusAction
  | StartBreakAction
  | PauseAction
  | ResumeAction
  | StopAction
  | ResetAction;
