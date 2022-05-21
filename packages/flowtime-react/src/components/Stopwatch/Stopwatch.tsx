import { format, differenceInHours, differenceInMilliseconds, subHours } from 'date-fns';
import { Maybe } from 'monet';
import { Observable, map, interval } from 'rxjs';
import { useObservableValue } from '@qxuken/react-utils';
import { useMemo } from 'react';

const defaultDate: Maybe<Date> = Maybe.None();

const displayTime = (date: Date): string => {
  const now = new Date();
  const diff = differenceInMilliseconds(now, date);
  if (differenceInHours(now, date) > 0) {
    // todo: investigate why this is not working
    return format(subHours(diff, 3), 'hh:mm:ss');
  }
  return format(diff, 'mm:ss');
};

export interface IStopwatchProps {
  from?: Maybe<Date>;
}
export function Stopwatch({ from = defaultDate }: IStopwatchProps): JSX.Element {
  const countFrom: Date = useMemo(() => from.orSome(new Date()), [from]);
  const observable: Maybe<Observable<string>> = useMemo(
    () => Maybe.Some(interval(1000).pipe(map(() => displayTime(countFrom)))),
    [countFrom]
  );
  const time = useObservableValue(observable);

  const content = time.orLazy(() => displayTime(countFrom));

  return <span>{content}</span>;
}
