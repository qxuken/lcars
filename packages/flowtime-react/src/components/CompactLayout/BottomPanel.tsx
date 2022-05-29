import { Button, Filler, Panel } from '@qxuken/lcars-ui';
import { identity } from 'ramda';
import { useMemo } from 'react';

import { useFlowtimeState, useFlowtimeTimeRecommendation } from '../../services';

function Status(): JSX.Element {
  const state = useFlowtimeState();

  const stateText = useMemo(() => {
    if (state.filter((s) => s.matches('idle')).isSome()) {
      return 'idle';
    }
    if (state.filter((s) => s.matches('focus.work')).isSome()) {
      return 'work';
    }
    if (state.filter((s) => s.matches('focus.break')).isSome()) {
      return 'break';
    }
    if (state.filter((s) => s.matches('focus.pause')).isSome()) {
      return 'pause';
    }
    return 'error';
  }, [state]);

  return (
    <Button size="small" width="fixed4" bgColor="color7" hoverable={false}>
      {stateText}
    </Button>
  );
}

// eslint-disable-next-line @rushstack/no-new-null
function TimeRecommendation(): JSX.Element | null {
  const state = useFlowtimeTimeRecommendation();
  const timeRecommendation = useMemo(() => state.chain(identity), [state]);
  if (timeRecommendation.isNone()) {
    return null;
  }
  return (
    <>
      <Filler size="small" bgColor="color7" />
      <Button
        size="small"
        bgColor="color7"
        width="min10"
        hoverable={false}
        counter={timeRecommendation.some()}
      >
        minutes goal
      </Button>
    </>
  );
}

export function BottomPanel(): JSX.Element {
  return (
    <Panel>
      <Status />
      <TimeRecommendation />
    </Panel>
  );
}
