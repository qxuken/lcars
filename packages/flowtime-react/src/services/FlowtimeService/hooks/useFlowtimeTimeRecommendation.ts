import { useContext } from 'react';
import { Maybe } from 'monet';
import { prop } from 'ramda';
import { useObservableValue } from '@qxuken/react-utils';
import { TimeRecommendation } from '@qxuken/flowtime';

import { FlowtimeServiceContext } from '../FlowtimeServiceContext';

export function useFlowtimeTimeRecommendation(): Maybe<TimeRecommendation> {
  const service = useContext(FlowtimeServiceContext);
  const value = useObservableValue(service.map(prop('timeRecommendation$')));

  return value;
}
