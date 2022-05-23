import { always, not, prop } from 'ramda';
import { useCallback, useContext } from 'react';
import { useFlowTimeTopPanel } from '../../FlowtimeTopPanel';

import { FlowtimeCompactContext } from '../FlowtimeCompactContext';

type Value = boolean;
type Disabled = boolean;
type Toggle = () => void;

export function useFlowtimeCompact(): [Value, Disabled, Toggle] {
  const context = useContext(FlowtimeCompactContext);
  const { onMinimize } = useFlowTimeTopPanel();
  const toggleCompactWithReporter = useCallback(() => {
    context.cata(always(undefined), ({ toggle }) => toggle());
    onMinimize.apTo(context.map(prop('value')).map(not));
  }, [context]);

  return [context.map(prop('value')).filter(Boolean).isSome(), context.isNone(), toggleCompactWithReporter];
}
