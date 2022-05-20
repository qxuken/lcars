import { Maybe } from 'monet';
import type { Observable } from 'rxjs';
import { useState, useEffect } from 'react';
import { compose } from 'ramda';

export function useObservableValue<T>(observable: Maybe<Observable<T>>): Maybe<T> {
  const [value, setValue] = useState<Maybe<T>>(Maybe.None());

  useEffect(() => {
    if (observable.isNone()) {
      return;
    }
    const subscription = observable.some().subscribe(compose(setValue, Maybe.Some));
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
}
