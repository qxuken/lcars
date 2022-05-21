import { useContext, useMemo } from 'react';
import { Maybe } from 'monet';
import { always, prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { TimeRecommendation } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeTimeRecommendation(): Maybe<TimeRecommendation> {
  const service = useContext(FlowtimeServiceContext);
  const observable = useMemo(always(service.map(prop('timeRecommendation$'))), [service]);
  const value = useObservableValue(observable);

  return value;
}
