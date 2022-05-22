import { useMemo } from 'react';
import { Button, IButtonProps, Panel } from '@qxuken/lcars-ui';
import { useFlowtimeButton } from '../../hooks';

export interface IRightPanelProps {
  small?: boolean;
}

interface IActiveButton {
  handler?: () => void;
  label: string;
}

export function RightPanel({ small }: IRightPanelProps): JSX.Element {
  const [stopHandler, stopIsDisabled] = useFlowtimeButton('STOP');
  const [resetHandler, resetIsDisabled] = useFlowtimeButton('RESET');
  const size: IButtonProps['size'] = useMemo(() => (small ? 'small' : undefined), [small]);

  const button: IActiveButton = useMemo(() => {
    if (!stopIsDisabled) {
      return {
        handler: stopHandler,
        label: 'stop',
      };
    }
    if (!resetIsDisabled) {
      return {
        handler: resetHandler,
        label: 'reset',
      };
    }
    return {
      label: 'none',
    };
  }, [stopHandler, stopIsDisabled, resetHandler, resetIsDisabled]);

  return (
    <Panel vertical>
      <Button size={size} bgColor="color4" onClick={button.handler} disabled={!button.handler}>
        {button.label}
      </Button>
    </Panel>
  );
}
