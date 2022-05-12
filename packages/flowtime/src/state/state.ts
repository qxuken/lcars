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
  interruptionsDuration: Maybe.None(),
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

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'startFocus':
      return changePhase(state, Phase.Focus);
    case 'startBreak':
      return changePhase(state, Phase.Break);
    case 'pause':
      return changePhase(state, Phase.Pause);
    case 'resume':
      return changePhase(state, state.nextRecommendedPhase);
    case 'stop':
      return changePhase(state, Phase.Idle);
    case 'reset':
      return initialState;
  }
}
