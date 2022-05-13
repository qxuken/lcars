import { Maybe } from 'monet';

export interface Context {
  activityCounter: number;
  startTime: Maybe<number>;
  pauseStartTime: Maybe<number>;
  shouldIncreaseBreak: boolean;
}
