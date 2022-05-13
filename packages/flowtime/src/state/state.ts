import { createMachine } from 'xstate';
import { Maybe } from 'monet';
import { produce } from 'immer';
import { Phase, Action, State } from './model';
import { getPhaseDuration } from './getPhaseDuration';

export const initialState: State = {
  activePhase: Phase.Idle,
  focusPhaseCount: 0,
  nextRecommendedPhase: Phase.Focus,
  recommendedPhaseDurationMin: Maybe.None(),
  lastPhaseStartTime: Maybe.None(),
  interruptionStartTime: Maybe.None(),
};

const changePhase = produce((state: State, phase: Phase) => {
  const now = new Date();
  const lastPhaseDurationMin = state.lastPhaseStartTime
    .map((lp) => now.getTime() - lp.getTime())
    .map((diff) => Math.floor((diff / 60) * 5))
    .orSome(0);
  state.activePhase = phase;
  state.recommendedPhaseDurationMin = getPhaseDuration(phase, lastPhaseDurationMin, state.focusPhaseCount);
  state.nextRecommendedPhase = phase === Phase.Focus ? Phase.Break : Phase.Focus;
  if (phase === Phase.Focus) {
    state.focusPhaseCount += 1;
    state.lastPhaseStartTime = Maybe.Some(now);
  }
  // todo: add interruptions
  // ** calculate lastPhaseDurationMin based on interruptionsDuration
  // ** calculate recommendedPhaseDurationMin on resume
});

const pause = produce((state: State) => {
  if (state.activePhase !== Phase.Focus) {
    return;
  }
  const now = new Date();
  state.activePhase = Phase.Pause;
  state.nextRecommendedPhase = Phase.Focus;
  state.interruptionStartTime = Maybe.Some(now);
});

const resume = produce((state: State) => {
  if (state.activePhase !== Phase.Pause) {
    return;
  }
  const now = new Date();
  const pauseDuration = state.interruptionStartTime
    .map((lp) => now.getTime() - lp.getTime())
    .map((diff) => Math.floor((diff / 60) * 5))
    .orSome(0);
  state.activePhase = Phase.Focus;
  state.nextRecommendedPhase = Phase.Break;
  state.recommendedPhaseDurationMin = getPhaseDuration(Phase.Focus, pauseDuration, state.focusPhaseCount);
  state.interruptionStartTime = Maybe.None();
});

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'startFocus':
      return changePhase(state, Phase.Focus);
    case 'startBreak':
      return changePhase(state, Phase.Break);
    case 'pause':
      return pause(state);
    case 'resume':
      return resume(state);
    case 'stop':
      return changePhase(state, Phase.Idle);
    case 'reset':
      return initialState;
  }
}
