import {
  format,
  differenceInHours,
  differenceInMilliseconds,
  differenceInDays,
  intervalToDuration,
  formatDuration,
} from 'date-fns';
import { Maybe } from 'monet';
import { Observable, map, interval, switchMap } from 'rxjs';
import { useObservableValue } from '@qxuken/react-utils';
import { FC, memo, useMemo } from 'react';
import { always, of, pipe } from 'ramda';

const defaultNone: Maybe<never> = Maybe.None();

const displayTime = (date: Date): string => {
  const now = new Date();
  const diff = differenceInMilliseconds(now, date);
  const hourDifference = differenceInHours(now, date);
  const daysDifference = differenceInDays(now, date);
  let result = format(diff, 'mm:ss');

  if (hourDifference > 0) {
    result = `${hourDifference}:${result}`;
  }

  if (daysDifference > 0) {
    result = pipe(
      intervalToDuration,
      formatDuration
    )({
      start: date,
      end: now,
    });
  }
  return result;
};

export interface IStopwatchProps {
  from?: Maybe<Date>;
}
export const Stopwatch: FC<IStopwatchProps> = memo(
  ({ from = defaultNone }) => {
    const countFrom: Date = useMemo(() => from.orSome(new Date()), [from]);
    const observable: Maybe<Observable<string>> = useMemo(
      () => Maybe.Some(interval(1000).pipe(switchMap(always(of(countFrom))), map(displayTime))),
      [countFrom]
    );
    const time = useObservableValue(observable, () => Maybe.Some(displayTime(countFrom)));

    const content = time.orSome('Fatal error');

    return <span>{content}</span>;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.from?.map((d) => d.getTime()).orUndefined() ===
      nextProps.from?.map((d) => d.getTime()).orUndefined()
    );
  }
);
