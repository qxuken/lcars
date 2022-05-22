import { useMemo } from 'react';
import { Button, Animated, Filler, Panel, IFillerProps, IButtonProps } from '@qxuken/lcars-ui';
import { useFlowTimeTopPanel } from '../../services';
import { useFlowtimePin } from '../../services/FlowtimePin';

export interface ITopPanelProps {
  small?: boolean;
}
export function TopPanel({ small = false }: ITopPanelProps): JSX.Element {
  const { onMinimize, onExit } = useFlowTimeTopPanel();
  const [pinned, pinIsDisabled, pinHandle] = useFlowtimePin();
  const size: IFillerProps['size'] = useMemo(() => (small ? 'small' : undefined), [small]);
  const width: IButtonProps['width'] = useMemo(() => (small ? 'fixed4' : 'fixed5'), [small]);
  return (
    <Panel>
      <Button size="small" bgColor="color5" width={width} onClick={pinHandle} disabled={pinIsDisabled}>
        {pinned ? 'unpin' : 'pin'}
      </Button>
      <Filler size={size} />
      <Animated if={!small} />
      <Button size="small" width={width} onClick={onMinimize.orUndefined()} disabled={onMinimize.isNone()}>
        minimize
      </Button>
      <Filler size={size} />
      <Button
        size="small"
        bgColor="color5"
        width={width}
        onClick={onExit.orUndefined()}
        disabled={onExit.isNone()}
      >
        exit
      </Button>
    </Panel>
  );
}
