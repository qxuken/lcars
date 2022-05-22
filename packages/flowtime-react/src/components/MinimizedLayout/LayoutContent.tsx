import { useMemo } from 'react';
import { prop } from 'ramda';
import { Box, Content, Text, PredefinedAnimationClass } from '@qxuken/lcars-ui';
import { useFlowtimeContext, useFlowtimeState } from '../../services';
import { Stopwatch } from '../Stopwatch';

export function LayoutContent(): JSX.Element {
  const context = useFlowtimeContext();
  const state = useFlowtimeState();

  const content = useMemo(() => {
    if (state.filter((s) => s.matches('idle')).isSome()) {
      return (
        <Box center>
          <Text size="xlarge" weight="semibold" className={PredefinedAnimationClass.blink7}>
            ready to arm
          </Text>
        </Box>
      );
    }
    if (state.filter((s) => s.matches('focus.work')).isSome()) {
      return (
        <Box center>
          <Text size="xlarge" weight="semibold">
            <Stopwatch key="focus" from={context.chain(prop('workStartTime'))} />
          </Text>
        </Box>
      );
    }
    if (state.filter((s) => s.matches('focus.break')).isSome()) {
      return (
        <Box center>
          <Text size="xlarge" weight="semibold">
            <Stopwatch key="break" />
          </Text>
        </Box>
      );
    }
    if (state.filter((s) => s.matches('focus.pause')).isSome()) {
      return (
        <Box center>
          <Text size="xlarge" weight="semibold">
            <Stopwatch key="pause" from={context.chain(prop('pauseStartTime'))} />
          </Text>
        </Box>
      );
    }
    return (
      <Box center>
        <Text color="color4" className={PredefinedAnimationClass.blinkWhite}>
          System status • Error
        </Text>
      </Box>
    );
  }, [state]);

  return <Content>{content}</Content>;
}
