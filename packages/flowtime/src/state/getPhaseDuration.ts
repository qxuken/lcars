import { Maybe } from 'monet';
import { Phase } from './model';

function calculateBreakDuration(lastPhaseDurationMin: number, focusPhaseCount: number): number {
  let phaseDuration;
  if (lastPhaseDurationMin <= 25) {
    phaseDuration = 10;
  } else if (lastPhaseDurationMin <= 50) {
    phaseDuration = 15;
  } else if (lastPhaseDurationMin <= 90) {
    phaseDuration = 20;
  } else {
    phaseDuration = 35;
  }
  if (focusPhaseCount > 0 && focusPhaseCount % 4 === 0) {
    phaseDuration += 15;
  }
  return phaseDuration;
}

export function getPhaseDuration(
  phase: Phase,
  lastPhaseDurationMin: number,
  focusPhaseCount: number
): Maybe<number> {
  switch (phase) {
    case Phase.Idle:
    case Phase.Pause:
      return Maybe.None();
    case Phase.Focus:
      return Maybe.Some(25 - lastPhaseDurationMin);
    case Phase.Break:
      return Maybe.Some(calculateBreakDuration(lastPhaseDurationMin, focusPhaseCount));
  }
}
