import { useContext, useMemo } from 'react';
import { Maybe } from 'monet';
import { always, prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { ActionType } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeAvailableActions(): Maybe<Array<ActionType>> {
  const service = useContext(FlowtimeServiceContext);
  const observable = useMemo(always(service.map(prop('availableActions$'))), [service]);
  const value = useObservableValue(observable);

  return value;
}
