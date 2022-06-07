import { useContext, useMemo } from 'react';
import { Maybe } from 'monet';
import { prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { TimeRecommendation } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeTimeRecommendation(): Maybe<TimeRecommendation> {
  const service = useContext(FlowtimeServiceContext);
  const [observable, defaultValue] = useMemo(
    () => [service.map(prop('timeRecommendation$')), service.chain(prop('timeRecommendation'))],
    [service]
  );
  const value = useObservableValue(observable, defaultValue);

  return value;
}
