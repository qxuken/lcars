import { useContext } from 'react';
import { Maybe } from 'monet';
import { prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { ActionType } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeAvailableActions(): Maybe<Array<ActionType>> {
  const service = useContext(FlowtimeServiceContext);
  const value = useObservableValue(service.map(prop('availableActions$')));

  return value;
}
