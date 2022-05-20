import { useContext } from 'react';
import { Maybe } from 'monet';
import { prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { IContext } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeContext(): Maybe<IContext> {
  const service = useContext(FlowtimeServiceContext);
  const value = useObservableValue(service.map(prop('context$')));

  return value;
}
