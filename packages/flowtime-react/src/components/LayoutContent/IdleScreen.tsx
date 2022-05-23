import { Panel, Text, PredefinedAnimationClass, Content, Button, ITextProps } from '@qxuken/lcars-ui';
import { prop } from 'ramda';
import { useMemo } from 'react';

import { useFlowtimeContext, useFlowtimeState } from '../../services';

import { ILayoutContentProps } from './interfaces';

export function IdleScreen({ small }: ILayoutContentProps): JSX.Element {
  const context = useFlowtimeContext();
  const activities = useMemo(
    () => context.map(prop('activities')).map(prop('length')).filter(Boolean),
    [context]
  );
  const state = useFlowtimeState();
  const systemStatusSize: ITextProps['size'] = useMemo(() => (small ? 'large' : undefined), [small]);
  const shouldDisplayActivity: boolean = useMemo(
    () =>
      activities
        .chain(() => state)
        .filter((s) => s.matches('idle'))
        .isSome() && !small,
    [activities, small]
  );
  return (
    <Content
      right={
        shouldDisplayActivity && (
          <Panel vertical minWidth>
            <Button bgColor="color6" accentSide="right" counter={activities.some()} hoverable={false}>
              done
            </Button>
          </Panel>
        )
      }
    >
      <Panel vertical>
        <Text color="color7" size={systemStatusSize} className={PredefinedAnimationClass.blinkWhite}>
          System status • OK
        </Text>
        {!small && (
          <>
            <Text size="xlarge" weight="semibold" className={PredefinedAnimationClass.blink7}>
              ready to arm
            </Text>
            <Text size="small" color="color1" className={PredefinedAnimationClass.blinkWhite}>
              recommended next: pomodoro
            </Text>
          </>
        )}
      </Panel>
    </Content>
  );
}
