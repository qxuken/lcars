import { always, not, prop } from 'ramda';
import { useCallback, useContext } from 'react';
import { useFlowTimeTopPanel } from '../../FlowtimeTopPanel';

import { FlowtimePinContext } from '../FlowtimePinContext';

type Value = boolean;
type Disabled = boolean;
type Toggle = () => void;

export function useFlowtimePin(): [Value, Disabled, Toggle] {
  const context = useContext(FlowtimePinContext);
  const { onPin } = useFlowTimeTopPanel();
  const togglePinnedWithReporter = useCallback(() => {
    context.cata(always(undefined), ({ toggle }) => toggle());
    onPin.apTo(context.map(prop('value')).map(not));
  }, [context]);

  return [context.map(prop('value')).filter(Boolean).isSome(), onPin.isNone(), togglePinnedWithReporter];
}
