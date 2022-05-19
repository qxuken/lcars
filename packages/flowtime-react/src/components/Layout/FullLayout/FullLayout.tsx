import { ReactNode } from 'react';
import { Button, Animated, Filler, Panel, Content, Text, PredefinedAnimationClass } from '@qxuken/lcars-ui';
import { BaseLayout } from '../BaseLayout';

function TopPanel(): JSX.Element {
  return (
    <Panel>
      <Button size="small" bgColor="color5" width="fixed5">
        pause
      </Button>
      <Filler />
      <Animated />
      <Button size="small" width="fixed5">
        pin
      </Button>
      <Filler />
      <Button size="small" bgColor="color5" width="fixed5">
        minimize
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
  return (
    <Panel vertical>
      <Button bgColor="color5">short</Button>
      <Button bgColor="color3">long</Button>
    </Panel>
  );
}

function RightPanel(): JSX.Element {
  return (
    <Panel vertical>
      <Button bgColor="color5">exit</Button>
    </Panel>
  );
}

function StandByContent(): JSX.Element {
  return (
    <Content
      left={
        <Panel vertical minWidth>
          <Button bgColor="color4" accentSide="left" withAccentLine>
            start
          </Button>
          <Button bgColor="color6" accentSide="left" withAccentLine>
            reset
          </Button>
        </Panel>
      }
      right={
        <Panel vertical minWidth>
          <Button bgColor="color6" accentSide="right" counter={10}>
            Flowtime
          </Button>
        </Panel>
      }
    >
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
    </Content>
  );
}

export interface IFullLayoutProps {
  className?: string;
  content?: ReactNode;
}

export function FullLayout({ className, content }: IFullLayoutProps): JSX.Element {
  return (
    <BaseLayout
      className={className}
      top={<TopPanel />}
      bottom={<BottomPanel />}
      left={<LeftPanel />}
      right={<RightPanel />}
      content={content ?? <StandByContent />}
    />
  );
}
