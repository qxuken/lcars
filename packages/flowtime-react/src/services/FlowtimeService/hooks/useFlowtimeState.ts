import { useContext } from 'react';
import { Maybe } from 'monet';
import { prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { State } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeState(): Maybe<State> {
  const service = useContext(FlowtimeServiceContext);
  const value = useObservableValue(service.map(prop('state$')));

  return value;
}
