import { useContext, useMemo } from 'react';
import { Maybe } from 'monet';
import { always, prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { State } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeState(): Maybe<State> {
  const service = useContext(FlowtimeServiceContext);
  const [observable, defaultValue] = useMemo(
    always([service.map(prop('state$')), service.chain(prop('state'))]),
    [service]
  );
  const value = useObservableValue(observable, defaultValue);

  return value;
}
