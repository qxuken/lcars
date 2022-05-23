import { useMemo } from 'react';
import { prop } from 'ramda';
import { Button, Panel, Content, Text, PredefinedAnimationClass } from '@qxuken/lcars-ui';
import { useFlowtimeContext, useFlowtimeState, useFlowtimeTimeRecommendation } from '../../services';
import { Stopwatch } from '../Stopwatch';

export function LayoutContent(): JSX.Element {
  const context = useFlowtimeContext();
  const activities = useMemo(
    () => context.map(prop('activities')).map(prop('length')).filter(Boolean),
    [context]
  );
  const state = useFlowtimeState();
  const timeRecommendation = useFlowtimeTimeRecommendation();

  const content = useMemo(() => {
    if (state.filter((s) => s.matches('idle')).isSome()) {
      return (
        <Panel vertical>
          <Text color="color7" className={PredefinedAnimationClass.blinkWhite}>
            System status • OK
          </Text>
          <Text size="xlarge" weight="semibold" className={PredefinedAnimationClass.blink7}>
            ready to arm
          </Text>
          <Text size="small" color="color1" className={PredefinedAnimationClass.blinkWhite}>
            recommended next: pomodoro
          </Text>
        </Panel>
      );
    }
    if (state.filter((s) => s.matches('focus.work')).isSome()) {
      return (
        <Panel vertical>
          <Text color="color7">focus</Text>
          <Text size="xlarge" weight="semibold">
            <Stopwatch key="focus" from={context.chain(prop('workStartTime'))} />
          </Text>
          <Text size="small" color="color1">
            recommended time: {timeRecommendation}
          </Text>
        </Panel>
      );
    }
    if (state.filter((s) => s.matches('focus.break')).isSome()) {
      return (
        <Panel vertical>
          <Text color="color7">Time to take a break</Text>
          <Text size="xlarge" weight="semibold">
            <Stopwatch key="break" from={context.chain(prop('breakStartTime'))} />
          </Text>
          <Text size="small" color="color1">
            recommended time: {timeRecommendation}
          </Text>
        </Panel>
      );
    }
    if (state.filter((s) => s.matches('focus.pause')).isSome()) {
      return (
        <Panel vertical>
          <Text color="color7" className={PredefinedAnimationClass.blinkWhite}>
            On Pause
          </Text>
          <Text size="xlarge" weight="semibold">
            <Stopwatch key="pause" from={context.chain(prop('pauseStartTime'))} />
          </Text>
          <Text size="small" color="color1" className={PredefinedAnimationClass.blinkWhite}>
            Remember to resume when you are ready
          </Text>
        </Panel>
      );
    }
    return (
      <Panel vertical>
        <Text color="color4" className={PredefinedAnimationClass.blinkWhite}>
          System status • Error
        </Text>
        <Text size="xlarge" weight="semibold" className={PredefinedAnimationClass.blink7}>
          Main process offline
        </Text>
        <Text size="small" color="color1" className={PredefinedAnimationClass.blinkWhite}>
          Try to restart
        </Text>
      </Panel>
    );
  }, [state]);

  return (
    <Content
      right={
        activities
          .chain(() => state)
          .filter((s) => s.matches('idle'))
          .isSome() && (
          <Panel vertical minWidth>
            <Button bgColor="color6" accentSide="right" counter={activities.some()} hoverable={false}>
              done
            </Button>
          </Panel>
        )
      }
    >
      {content}
    </Content>
  );
}
