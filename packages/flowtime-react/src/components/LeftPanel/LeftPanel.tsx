import { useMemo } from 'react';
import { IButtonProps, Button, Panel } from '@qxuken/lcars-ui';

import { useFlowtimeButton } from '../../hooks';

export interface ILeftPanelProps {
  small?: boolean;
}

export function LeftPanel({ small = false }: ILeftPanelProps): JSX.Element {
  const [startHandler, startIsDisabled] = useFlowtimeButton('START');
  const [focusHandler, focusIsDisabled] = useFlowtimeButton('FOCUS');
  const [pauseHandler, pauseIsDisabled] = useFlowtimeButton('PAUSE');
  const [resumeHandler, resumeIsDisabled] = useFlowtimeButton('RESUME');
  const [breakHandler, breakIsDisabled] = useFlowtimeButton('BREAK');
  const size: IButtonProps['size'] = useMemo(() => (small ? 'small' : undefined), [small]);

  return (
    <Panel vertical>
      <Button size={size} bgColor="color5" if={!focusIsDisabled} onClick={focusHandler}>
        focus
      </Button>
      <Button size={size} bgColor="color5" if={!startIsDisabled} onClick={startHandler}>
        focus
      </Button>
      <Button size={size} bgColor="color5" if={!pauseIsDisabled} onClick={pauseHandler}>
        pause
      </Button>
      <Button size={size} bgColor="color5" if={!resumeIsDisabled} onClick={resumeHandler}>
        resume
      </Button>
      <Button size={size} bgColor="color3" disabled={breakIsDisabled} onClick={breakHandler}>
        break
      </Button>
    </Panel>
  );
}
