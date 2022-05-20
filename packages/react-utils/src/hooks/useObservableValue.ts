import { Maybe } from 'monet';
import type { Observable } from 'rxjs';
import { useState, useEffect } from 'react';
import { compose } from 'ramda';

export function useObservableValue<T>(observable: Observable<T>): Maybe<T> {
  const [value, setValue] = useState<Maybe<T>>(Maybe.None());

  useEffect(() => {
    const subscription = observable.subscribe(compose(setValue, Maybe.Some));
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
}
