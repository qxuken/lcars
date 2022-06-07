import { useContext, useMemo } from 'react';
import { Maybe } from 'monet';
import { prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { ActionType } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeAvailableActions(): Maybe<Array<ActionType>> {
  const service = useContext(FlowtimeServiceContext);
  const [observable, defaultValue] = useMemo(
    () => [service.map(prop('availableActions$')), service.chain(prop('availableActions'))],
    [service]
  );
  const value = useObservableValue(observable, defaultValue);

  return value;
}
