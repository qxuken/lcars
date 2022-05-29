import { useMemo } from 'react';
import { Button, Animated, Filler, Panel, IFillerProps, IButtonProps } from '@qxuken/lcars-ui';
import { useFlowTimeTopPanel } from '../../services';
import { useFlowtimePin } from '../../services/FlowtimePin';
import { useFlowtimeCompact } from '../../services/FlowtimeCompact';

export interface ITopPanelProps {
  small?: boolean;
}
export function TopPanel({ small = false }: ITopPanelProps): JSX.Element {
  const { onExit } = useFlowTimeTopPanel();
  const [pinned, pinIsDisabled, pinHandle] = useFlowtimePin();
  const [compact, compactIsDisabled, compactHandle] = useFlowtimeCompact();
  const size: IFillerProps['size'] = useMemo(() => (small ? 'small' : undefined), [small]);
  const width: IButtonProps['width'] = useMemo(() => (small ? 'fixed4' : 'fixed5'), [small]);
  return (
    <Panel>
      <Button size="small" bgColor="color5" width={width} onClick={pinHandle} if={!pinIsDisabled}>
        {pinned ? 'unpin' : 'pin'}
      </Button>
      <Filler size={size} />
      <Animated if={!small} />
      <Button size="small" width={width} onClick={compactHandle} disabled={compactIsDisabled}>
        {compact ? 'expand' : 'compact'}
      </Button>
      <Filler size={size} />
      <Button size="small" bgColor="color5" width={width} onClick={onExit.orUndefined()} if={onExit.isSome()}>
        exit
      </Button>
    </Panel>
  );
}
