import { subHours } from 'date-fns';
import { useMemo } from 'react';
import { prop } from 'ramda';
import { Button, Animated, Filler, Panel, Content, Text, PredefinedAnimationClass } from '@qxuken/lcars-ui';
import { BaseLayout } from '../BaseLayout';
import { useFlowtimeContext, useFlowtimeState, useFlowtimeTimeRecommendation } from '../../../services';
import { useFlowtimeButton } from '../../../hooks';
import { Stopwatch } from '../../Stopwatch';

function TopPanel(): JSX.Element {
  return (
    <Panel>
      <Button size="small" bgColor="color5" width="fixed5" disabled>
        pin
      </Button>
      <Filler />
      <Animated />
      <Button size="small" width="fixed5" disabled>
        minimize
      </Button>
      <Filler />
      <Button size="small" bgColor="color5" width="fixed5" disabled>
        exit
      </Button>
    </Panel>
  );
}

function BottomPanel(): JSX.Element {
  return (
    <Panel>
      <Filler />
      <Animated wide />
      <Filler size="wide" bgColor="color7" />
      <Filler />
    </Panel>
  );
}

function LeftPanel(): JSX.Element {
  const [startHandler, startIsDisabled] = useFlowtimeButton('START');
  const [focusHandler, focusIsDisabled] = useFlowtimeButton('FOCUS');
  const [pauseHandler, pauseIsDisabled] = useFlowtimeButton('PAUSE');
  const [resumeHandler, resumeIsDisabled] = useFlowtimeButton('RESUME');
  const [breakHandler, breakIsDisabled] = useFlowtimeButton('BREAK');

  const firstButton: {
    handler?: () => void;
    label: string;
  } = useMemo(() => {
    if (!focusIsDisabled) {
      return {
        handler: focusHandler,
        label: 'focus',
      };
    }
    if (!startIsDisabled) {
      return {
        handler: startHandler,
        label: 'focus',
      };
    }
    if (!pauseIsDisabled) {
      return {
        handler: pauseHandler,
        label: 'pause',
      };
    }
    if (!resumeIsDisabled) {
      return {
        handler: resumeHandler,
        label: 'resume',
      };
    }
    return {
      label: 'broke',
    };
  }, [
    focusHandler,
    focusIsDisabled,
    startHandler,
    startIsDisabled,
    pauseHandler,
    pauseIsDisabled,
    resumeHandler,
    resumeIsDisabled,
  ]);

  return (
    <Panel vertical>
      <Button bgColor="color5" onClick={firstButton.handler} disabled={!firstButton.handler}>
        {firstButton.label}
      </Button>
      <Button bgColor="color3" onClick={breakHandler} disabled={breakIsDisabled}>
        break
      </Button>
    </Panel>
  );
}

function RightPanel(): JSX.Element {
  const [stopHandler, stopIsDisabled] = useFlowtimeButton('STOP');
  const [resetHandler, resetIsDisabled] = useFlowtimeButton('RESET');

  const button: {
    handler?: () => void;
    label: string;
  } = useMemo(() => {
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
      label: 'broke',
    };
  }, [stopHandler, stopIsDisabled, resetHandler, resetIsDisabled]);

  return (
    <Panel vertical>
      <Button bgColor="color4" onClick={button.handler} disabled={!button.handler}>
        {button.label}
      </Button>
    </Panel>
  );
}
function LayoutContent(): JSX.Element {
  const context = useFlowtimeContext();
  const activities = useMemo(() => context.map(prop('activityCounter')).filter(Boolean), [context]);
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
            <Stopwatch key="break" />
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
      // left={
      //   <Panel vertical minWidth>
      //     <Button bgColor="color4" accentSide="left" withAccentLine>
      //       start
      //     </Button>
      //     <Button bgColor="color6" accentSide="left" withAccentLine>
      //       reset
      //     </Button>
      //   </Panel>
      // }
      right={
        activities.isSome() && (
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

export interface IFullLayoutProps {
  className?: string;
}

export function FullLayout({ className }: IFullLayoutProps): JSX.Element {
  return (
    <BaseLayout
      className={className}
      top={<TopPanel />}
      bottom={<BottomPanel />}
      left={<LeftPanel />}
      right={<RightPanel />}
      content={<LayoutContent />}
    />
  );
}
