import { useContext, useMemo } from 'react';
import { Maybe } from 'monet';
import { prop } from 'ramda';
import { Dispatch } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeDispatch(): Maybe<Dispatch> {
  const service = useContext(FlowtimeServiceContext);
  const value = useMemo(() => service.map(prop('dispatch')), [service]);

  return value;
}
