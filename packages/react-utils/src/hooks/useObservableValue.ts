import { Maybe } from 'monet';
import type { Observable } from 'rxjs';
import { useState, useEffect } from 'react';
import { compose } from 'ramda';

const defaultNone: Maybe<never> = Maybe.None();

export function useObservableValue<T>(
  observable: Maybe<Observable<T>>,
  defaultValue: Maybe<T> | (() => Maybe<T>) = defaultNone
): Maybe<T> {
  const [value, setValue] = useState<Maybe<T>>(defaultValue);

  useEffect(() => {
    if (observable.isNone()) {
      return;
    }
    const subscription = observable.some().subscribe(compose(setValue, Maybe.Some));
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
}
