import { useFlowtimeState } from '../../services';

import { IdleScreen } from './IdleScreen';
import { ILayoutContentProps } from './interfaces';
import { WorkScreen } from './WorkScreen';
import { BreakScreen } from './BreakScreen';
import { PauseScreen } from './PauseScreen';
import { ErrorScreen } from './ErrorScreen';

export function LayoutContent({ small }: ILayoutContentProps): JSX.Element {
  const state = useFlowtimeState();

  if (state.filter((s) => s.matches('idle')).isSome()) {
    return <IdleScreen small={small} />;
  }
  if (state.filter((s) => s.matches('focus.work')).isSome()) {
    return <WorkScreen small={small} />;
  }
  if (state.filter((s) => s.matches('focus.break')).isSome()) {
    return <BreakScreen small={small} />;
  }
  if (state.filter((s) => s.matches('focus.pause')).isSome()) {
    return <PauseScreen small={small} />;
  }
  return <ErrorScreen small={small} />;
}
