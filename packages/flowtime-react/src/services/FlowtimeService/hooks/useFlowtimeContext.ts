import { useContext, useMemo } from 'react';
import { Maybe } from 'monet';
import { always, prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { IContext } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeContext(): Maybe<IContext> {
  const service = useContext(FlowtimeServiceContext);
  const [observable, defaultValue] = useMemo(
    always([service.map(prop('context$')), service.chain(prop('context'))]),
    [service]
  );
  const value = useObservableValue(observable, defaultValue);

  return value;
}
